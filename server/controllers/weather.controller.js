// import Weather from '../models/weather';
// import Traffic from '../models/traffic';
import sanitizeHtml from 'sanitize-html';
import * as schedule from 'node-schedule';
const onesignal = require('simple-onesignal');
import connection from './mysqldb';
import winston from 'winston';
const log = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Set up OneSignal
// const ONE_SIGNAL = {
//   app_id: 'cf096ee6-4bb3-48bc-b7f7-c3cbf11b8c6d',
//   rest_api_key: 'NDhjZTYxYzItODkyNi00MmE5LTgyM2EtZGQ5ZDNiYmE1ZmFj',
// };

const ONE_SIGNAL = {
  app_id: '95e5d98e-bd41-4b70-b69c-d7eca26b01af',
  rest_api_key: 'NjNmMWM1YzctZDc5Ni00NTJjLWE4NjQtMDdiMzRhNjFkZWE3',
};

onesignal.configure(ONE_SIGNAL.app_id, ONE_SIGNAL.rest_api_key);

function addWeatherData(req, res) {
  if (!req.currently || req.currently === undefined) {
    res.status(403).end();
    log.info('----------------- error weather in db ------------');
  }

  // const newData = new Weather(req.currently);

  // // Let's sanitize inputs
  // newData.summary = sanitizeHtml(newData.summary);
  // newData.temperature = sanitizeHtml(newData.temperature);

  // newData.save((err, saved) => {
  //   if (err) {
  //     res.status(500).send(err);
  //   }
  //   // res.json();
  //   log.info({ weather: saved });
  // });
  let temperature = (req.currently.temperature - 32) * 5 / 9;
  if (temperature !== undefined) {
    temperature = temperature.toFixed(0);
  }
  let sql = 'insert into weather (summary, temperature) values("' + String(req.currently.summary) + '", "' + String(temperature) + '")';
  log.info('weather insert sql', sql);
  connection.query(sql, function(err, results, fields) {
    if (err) {
      log.info(JSON.stringify(err));
    }
    log.info('weather info inserted');
  });
}

function sendPushMessage(msg) {
  const data = {
    app_id: ONE_SIGNAL.app_id,
    included_segments: ['All'],
    contents: {
      en: msg,
    },
    headings: {
      en: 'CauseWay Live',
    },
    big_picture: 'https://s6.postimg.org/x79g410ap/winner.jpg',
    small_icon: 'https://s6.postimg.org/sseqc2qpt/ic_launcher.png',
    large_icon: 'https://s6.postimg.org/sseqc2qpt/ic_launcher.png'
  };

  const url = 'https://onesignal.com/api/v1/notifications';
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: 'Basic NjNmMWM1YzctZDc5Ni00NTJjLWE4NjQtMDdiMzRhNjFkZWE3',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(response => log.info(response))
  .catch(err => log.isInfo(JSON.stringify(err)));

  // onesignal.sendMessage(msg, function(err, resp) {
  //   if(err) {
  //       // Handle error
  //   } else {
  //       // Handle success!
  //   }
  // });
}

/**
 * Get weather info
 * @param req
 * @param res
 * @returns void
 */
export function getWeather(req, res) {
  // Weather.findOne().sort('-dateAdded').exec((err, weather) => {
  //   if (err) {
  //     res.status(500).send(err);
  //   }
  //   res.json({ weather });
  //   if (weather.summary.toString().toLowerCase().includes('cloud')) {
  //     setTimeout(function() { sendPushMessage("It's rannining"); }, 5000);
  //   }
  // });
  connection.query('select * from weather order by dateAdded desc limit 1', function(error, results, fields) {
    if (error) {
      log.info(JSON.stringify(error));
    }
    if (results.length > 0) {
      res.json({ weather: results });
        // if (results.length > 0 && results[0].summary.toString().toLowerCase().includes('rain')) {
        //   setTimeout(function() { sendPushMessage("It's rainining"); }, 5000);
        // }
    }
  });
}

export function scheduleOnWeather() {
  schedule.scheduleJob('*/5 * * * *', function() {
    log.info('fetch weather data in every 5 mins \n');
    fetch('https://api.darksky.net/forecast/b3fa3ecdf4e7167c9fee494ee87b2de0/1.452768,103.769179')
      .then(result => result.json())
      .then(result => addWeatherData(result))
      .catch(err => console.error(err));
  });
}


function addTrafficInfo(req, src, dst, res) {
  if (!req.routes || req.routes === undefined) {
    res.status(403).end();
    log.info('----------------- error traffic in db ------------');
  }

  log.info('----------------- save traffic info in db every 5 min ------------');
  const temp = req.routes[0].legs[0];

  // const newData = new Traffic(temp);

  // // Let's sanitize inputs
  // newData.src = sanitizeHtml(src);
  // newData.dst = sanitizeHtml(dst);

  // newData.duration = sanitizeHtml(temp.duration.text);
  // const durationValue = sanitizeHtml(temp.duration.value);
  // newData.est = sanitizeHtml(temp.duration_in_traffic.text);
  // const estValue = sanitizeHtml(temp.duration_in_traffic.value);

  // if (estValue - durationValue <= 10 * 60) {
  //   newData.status = 'Normal Traffic';
  // } else {
  //   newData.status = 'Heavy Traffic';
  // }

  // newData.save((err, saved) => {
  //   if (err) {
  //     res.status(500).send(err);
  //   }
  //   // res.json();
  //   log.info({ traffic: saved });
  // });

  // const durationValue = sanitizeHtml(temp.duration.value);
  const estValue = sanitizeHtml(temp.duration_in_traffic.value);
  const _src = sanitizeHtml(src);
  const _dst = sanitizeHtml(dst);
  const duration = sanitizeHtml(temp.duration.text);
  const est = sanitizeHtml(temp.duration_in_traffic.text);

  let status = 'Heavy Traffic';
  if (estValue < 10 * 60) {
    status = 'Light Traffic';
  } else if (estValue <= 20 * 60) {
    status = 'Normal Traffic';
  }

  const location = {
    SG: 'Singapore',
    MY: 'Malaysia',
  };

  let notification = '';

  if (estValue >= 45 * 60) {
    notification = 'Heavy traffic from ' + location[src] + ' to ' + location[dst] + ', EST 45 mins+ ';
    // Send push
    // setTimeout(() => { sendPushMessage('Heavy traffic from ' + location[src] + ' to ' + location[dst] + ', EST 45 mins+ '); }, 3000);
  }

  const sql = 'insert into traffic (src, dst, duration, est, notification, status) values("' +
    String(_src) + '", "' + String(_dst) + '", "' + String(duration) + '", "' +
    String(est) + '", "' + String(notification) + '", "' + String(status) + '")';
  log.info('traffic insert sql', sql);
  connection.query(sql, (err, results, fields) => {
    if (err) {
      log.info(JSON.stringify(err));
    }
    log.info('weather info inserted');
  });
}

export function scheduleOnTrafficFromSGtoMY() {
  schedule.scheduleJob('*/5 * * * *', () => {
    fetch('https://maps.googleapis.com/maps/api/directions/json?origin=place_id:ChIJcax8Ev0S2jER7fTRxrPHz2w&destination=place_id:ChIJ4-MEgNwS2jERPDLDNgWnENA&key=AIzaSyDOn9pwR-eP2cBeqMji7ERWNeRlbaw0srg&departure_time=now')
      .then(result => result.json())
      .then(result => addTrafficInfo(result, 'SG', 'MY'))
      .catch(err => console.error(err));
  });
}

export function scheduleOnTrafficFromMYtoSG() {
  schedule.scheduleJob('*/5 * * * *', () => {
    fetch('https://maps.googleapis.com/maps/api/directions/json?origin=place_id:ChIJ4-MEgNwS2jERPDLDNgWnENA&destination=place_id:ChIJcax8Ev0S2jER7fTRxrPHz2w&key=AIzaSyDOn9pwR-eP2cBeqMji7ERWNeRlbaw0srg&departure_time=now')
      .then(result => result.json())
      .then(result => addTrafficInfo(result, 'MY', 'SG'))
      .catch(err => console.error(err));
  });
}

export function scheduleOnClearTables() {
  schedule.scheduleJob('3 * *', () => {
    connection.query('delete from camera; delete from traffic', (err, results, fields) => {
      if (err) {
        log.info(JSON.stringify(err));
      }
      log.info('++ clear the tables for camera and traffic +++');
    });
  });
}
/**
 * Get weather info
 * @param req
 * @param res
 * @returns void
 */
export function getTraffic(req, res) {
  const sql = 'select * from traffic where src="' + req.params.src + '" and dst="' + req.params.dst + '" order by dateAdded desc limit 1'
  log.info('traffic get, ', sql);
  connection.query(sql, (error, results, fields) => {
    if (error) {
      log.info(JSON.stringify(error));
    }
    log.info('--- gettraffic -- ', results);
    if (results.length > 0) {
      // if (results[0].status.toString().toLowerCase().includes('traffic')) {
      //   setTimeout(() => { sendPushMessage('There is a traffic jam on the road'); }, 0);
      // }
      res.json({ traffic: results[0] });
    }
  });
}

export function scheduleOnOnSignal() {
  schedule.scheduleJob('12 * * *', () => {
    // Send signal every 12 hours if there is raining.
    // connection.query('select * from weather order by dateAdded desc limit 1', function(error, results, fields) {
    //   if (error) {
    //     log.info(JSON.stringify(error));
    //   }
    //   if (results.length > 0) {
    //     if (results[0].summary.toString().toLowerCase().includes('rain')) {
    //       setTimeout(() => { sendPushMessage("It's rainining"); }, 4000);
    //     }
    //   }
    // });

    // Send signal every 12 hours if there is heavy traffic.
    connection.query('select * from traffic order by dateAdded desc limit 1', function(error, results, fields) {
      if (error) {
        log.info(JSON.stringify(error));
      }
      if (results.length > 0) {
        if (results[0].notification !== '') {
          setTimeout(() => { sendPushMessage(results[0].notification); }, 7000);
        }
      }
    });
  });
}

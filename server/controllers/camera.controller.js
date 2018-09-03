// import Camera from '../models/camera';
// import sanitizeHtml from 'sanitize-html';
import * as schedule from 'node-schedule';
import connection from './mysqldb';

export function getMap(req, res) {
  return res.send({ frame: '<iframe  width="100%"  height="800"  frameBorder="0"  src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyCYc3U2zpF5V8DiAsY9PSSq0SF_CeRbdkA&zoom=15&origin=Woodlands+Checkpoint,+21+Woodlands+Crossing,+738203&destination=Sultan+Iskandar+Complex+Customs,+Jalan+Jim+Quee,+Bukit+Chagar,+80300+Johor+Bahru,+Johor,+Malaysia/@1.4520892,103.7609916" allowFullScreen />' });
}

/**
 * Get all Cameras with Mongo
 * @param req
 * @param res
 * @returns void
 */
// export function getCameras(req, res) {
//   Camera.findOne().sort('-dateAdded').exec((err, camera) => {
//     if (err) {
//       res.status(500).send(err);
//     }
//     res.json({ camera });
//   });
// }

/**
 * Get all Cameras with MySQL
 * @param req
 * @param res
 * @returns void
 */
export function getCameras(req, res) {
  // Camera.findOne().sort('-dateAdded').exec((err, camera) => {
  //   if (err) {
  //     res.status(500).send(err);
  //   }
  //   res.json({ camera });
  // });

  connection.query('select * from camera order by dateAdded desc limit 1', function(error, results, fields) {
    if (error) {
      throw error;
    }
    if (results.length > 0) {
      res.json({ camera: results });
    }
  });
}

function addCamera(req, res) {
  if (!req || req.items === undefined) {
    res.status(403).end();
    console.log('----------------- error camera in db ------------');
  }

  console.log('----------------- save camera info in db every 5 min ------------', req);
  let images = [];
  let temp = req.items[0].cameras;
  for (let camera in temp) {
    camera = temp[camera];
    if (camera.camera_id === '2701' || camera.camera_id === '2702') {
      images.push(camera.image);
    }
  }
 
  // const newData = new Camera();

  // // Let's sanitize inputs
  // newData.image1 = sanitizeHtml(images[0]);
  // newData.image2 = sanitizeHtml(images[1]);

  // newData.save((err, saved) => {
  //   if (err) {
  //     res.status(500).send(err);
  //   }
  //   // res.json();
  //   console.log({ camera: saved });
  // });

  let sql = 'insert into camera (image1, image2) values("' + String(images[0]) + '", "' + String(images[1]) + '")';
  connection.query(sql, function(err, results, fields) {
    if (err) {
      throw err;
    }
    console.log('camera inserted');
  });
}

export function scheduleOnCamera() {
  schedule.scheduleJob('*/5 * * * *', function() {
    fetch('https://api.data.gov.sg/v1/transport/traffic-images')
      .then(result => result.json())
      .then(result => addCamera(result))
      .catch(err => console.error(err));
  });
}

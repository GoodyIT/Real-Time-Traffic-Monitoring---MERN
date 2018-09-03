import callApi, {API_URL} from '../../util/apiCaller';

import {
  LOAD_RATE,
  LOAD_RATE_SUCCESS,
  LOAD_RATE_ERROR,
  RX_RATE_URL,
  LOAD_LIVE_CAM_SUCCESS,
  LOAD_WEATHER_SUCCESS,
  LOAD_MAP_IFRAME_SUCCESS,
  LOAD_TRAFFIC_INFO_SUCCESS,
 } from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRate() {
  return {
    type: LOAD_RATE,
  };
}

/**
 * Dispated when loading latest foreign exchange rate
 */

export function rateLoaded(rate) {
  return {
    type: LOAD_RATE_SUCCESS,
    rate,
  };
}

/**
 * Dispatched when loading the rate fails
 */
export function rateLoadingError(error) {
  return {
    type: LOAD_RATE_ERROR,
    error,
  };
}

/**
 * Distached when loading live traffic data
 */

export function cameraLoaded(camera) {
  return {
    type: LOAD_LIVE_CAM_SUCCESS,
    camera,
  };
}

/**
 * Distached when loading weather data
 */

export function weatherLoaded(weather) {
  return {
    type: LOAD_WEATHER_SUCCESS,
    weather,
  };
}

/**
 * Distached when loading iframe map
 */

export function mapIFrameLoaded(map) {
  return {
    type: LOAD_MAP_IFRAME_SUCCESS,
    map,
  };
}

/**
 * Distached when loading iframe map
 */

export function trafficInfoLoaded(traffic) {
  return {
    type: LOAD_TRAFFIC_INFO_SUCCESS,
    traffic,
  };
}

export function onLoadRate() {
  return (dispatch) => {
    return callApi(RX_RATE_URL).then(res => {
      dispatch(rateLoaded(res.rates));
    });
  };
}

export function onLoadLiveCam() {
  return (dispatch) => {
    const url = API_URL + '/camera';
    return callApi(url).then((res, err) => {
      dispatch(cameraLoaded(res));
    });
  };
}


export function onLoadWeather() {
  return (dispatch) => {
    const url = API_URL + '/weather';
    return callApi(url).then((res, err) => {
      dispatch(weatherLoaded(res));
    });
  };
}

export function onLoadMapIFrame() {
  return (dispatch) => {
    const url = API_URL + '/map';
    return callApi(url).then((res, err) => {
      dispatch(mapIFrameLoaded(res));
    });
  };
}


export function onLoadTrafficInfo(src, dst) {
  return (dispatch) => {
    const url = API_URL + '/traffic/' + src + '/' + dst;
    return callApi(url).then((res, err) => {
      dispatch(trafficInfoLoaded(res));
    });
  };
}

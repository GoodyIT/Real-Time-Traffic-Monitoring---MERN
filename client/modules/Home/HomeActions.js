import callApi from '../../util/apiCaller';

import { LOAD_RATE, LOAD_RATE_SUCCESS, LOAD_RATE_ERROR, RX_RATE_URL } from './constants';

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

export function onLoadRate() {
  return (dispatch) => {
    return callApi(RX_RATE_URL).then(res => {
      dispatch(rateLoaded(res.rates));
    });
  };
}

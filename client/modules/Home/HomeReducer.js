import {
  LOAD_RATE_SUCCESS,
  LOAD_RATE,
  LOAD_RATE_ERROR,
  LOAD_LIVE_CAM_SUCCESS,
  LOAD_WEATHER_SUCCESS,
  LOAD_MAP_IFRAME_SUCCESS,
  LOAD_TRAFFIC_INFO_SUCCESS,
} from './constants';

// The initial state of the App
const initialState = {
  loading_rate: false,
  loading_camera: false,
  loading_weather: false,
  loading_map: false,
  loading_traffic: false,
  error_rate: false,
  rate: false,
  camera: false,
  weather: false,
  map: false,
  traffic: false,
};

function HomeReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_RATE:
      return {
        ...state,
        loading_rate: true,
        error_rate: false,
        rate: false,
      };
    case LOAD_RATE_SUCCESS:
      return {
        ...state,
        loading_rate: false,
        rate: action.rate,
      };
    case LOAD_RATE_ERROR:
      return {
        ...state,
        loading_rate: false,
        error_rate: action.error,
      };
    case LOAD_LIVE_CAM_SUCCESS:
      return {
        ...state,
        loading_camera: false,
        camera: action.camera,
      };
    case LOAD_WEATHER_SUCCESS:
      return {
        ...state,
        loading_weather: false,
        weather: action.weather,
      };
    case LOAD_MAP_IFRAME_SUCCESS:
      return {
        ...state,
        loading_map: false,
        map: action.map,
      };
    case LOAD_TRAFFIC_INFO_SUCCESS:
      return {
        ...state,
        loading_traffic: false,
        traffic: action.traffic,
      };
    default:
      return state;
  }
}

export default HomeReducer;

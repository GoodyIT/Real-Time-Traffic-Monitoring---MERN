import {
  LOAD_RATE_SUCCESS,
  LOAD_RATE,
  LOAD_RATE_ERROR,
} from './constants';

// The initial state of the App
const initialState = {
  loading_rate: false,
  error_rate: false,
  rate: false,
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
    default:
      return state;
  }
}

export default HomeReducer;

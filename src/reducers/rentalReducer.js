import {
  CALCULATE_RENTAL,
  FETCH_RENTAL,
  RETURN_VIDEO,
  SETTLE_RENTAL
} from '../actions/types';

export default (state = null, action) => {
  switch(action.type) {
    case CALCULATE_RENTAL:
      return action.payload;
    case FETCH_RENTAL:
      return action.payload;
    case RETURN_VIDEO:
      return action.payload;
    case SETTLE_RENTAL:
      return action.payload;
    default:
      return state;
  }
}
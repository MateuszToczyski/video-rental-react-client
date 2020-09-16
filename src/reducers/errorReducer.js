import {
  CATCH_ERROR,
  DISMISS_ERROR
} from '../actions/types';

export default (state = null, action) => {
  switch(action.type) {
    case CATCH_ERROR:
      return action.payload;
    case DISMISS_ERROR:
      return null;
    default:
      return state;
  }
}
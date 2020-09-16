import {
  FETCH_COPY
} from '../actions/types';

export default (state = null, action) => {
  switch(action.type) {
    case FETCH_COPY:
      return action.payload;
    default:
      return state;
  }
}
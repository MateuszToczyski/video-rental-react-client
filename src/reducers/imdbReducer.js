import {
  FETCH_IMDB_VIDEO
} from '../actions/types';

export default (state = null, action) => {
  switch(action.type) {
    case FETCH_IMDB_VIDEO:
      return action.payload;
    default:
      return state;
  }
}
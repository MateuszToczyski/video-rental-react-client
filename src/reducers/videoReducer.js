import _ from 'lodash';
import {
  FETCH_VIDEOS,
  FETCH_VIDEO,
  CREATE_VIDEO,
  UPDATE_VIDEO,
  DELETE_VIDEO,
  CREATE_COPY,
  DELETE_COPY
} from '../actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    case FETCH_VIDEOS:
      return { ..._.mapKeys(action.payload, 'id') };
    case FETCH_VIDEO:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_VIDEO:
      return { ...state, [action.payload.id]: action.payload };
    case UPDATE_VIDEO:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_VIDEO:
      return _.omit(state, action.payload);
    case CREATE_COPY:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_COPY:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
}
import _ from 'lodash';
import {
  FETCH_GROUPS,
  FETCH_GROUP,
  CREATE_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP
} from '../actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    case FETCH_GROUPS:
      return { ..._.mapKeys(action.payload, 'id') };
    case FETCH_GROUP:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_GROUP:
      return { ...state, [action.payload.id]: action.payload };
    case UPDATE_GROUP:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_GROUP:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
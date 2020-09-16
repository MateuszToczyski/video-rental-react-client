import _ from 'lodash';
import {
  FETCH_CUSTOMERS,
  FETCH_CUSTOMER,
  CREATE_CUSTOMER,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
  RENT_VIDEO
} from '../actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    case FETCH_CUSTOMERS:
      return { ..._.mapKeys(action.payload, 'id') };
    case FETCH_CUSTOMER:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_CUSTOMER:
      return { ...state, [action.payload.id]: action.payload };
    case UPDATE_CUSTOMER:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_CUSTOMER:
      return _.omit(state, action.payload);
    case RENT_VIDEO:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
}
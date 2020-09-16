import { combineReducers } from 'redux';
import customerReducer from './customerReducer';
import groupReducer from './groupReducer';
import categoryReducer from './categoryReducer';
import videoReducer from './videoReducer';
import imdbReducer from './imdbReducer';
import copyReducer from './copyReducer';
import rentalReducer from './rentalReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  customers: customerReducer,
  groups: groupReducer,
  categories: categoryReducer,
  videos: videoReducer,
  imdbVideo: imdbReducer,
  copy: copyReducer,
  rental: rentalReducer,
  error: errorReducer
});
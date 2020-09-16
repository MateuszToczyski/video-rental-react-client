import axios from 'axios';
import { catchError } from '../actions/errorActions';
import store from '../store';

const baseApi = axios.create({
  baseURL: 'http://localhost:8080'
});

baseApi.interceptors.response.use(null, error => {
  if(error.response) {
    store.dispatch(catchError(error.response.data.message));
  } else {
    store.dispatch(catchError("An error occured, check console for details"));
  }
  throw error;
});

export default baseApi;
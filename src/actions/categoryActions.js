import baseApi from '../apis/baseApi';
import history from '../history';
import {
    CREATE_CATEGORY,
    FETCH_CATEGORIES,
    FETCH_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY
} from './types';

const endpoint = '/categories';

export const createCategory = (formValues, forced) => async (dispatch) => {
  const response = await baseApi.post(endpoint, { ...formValues });
  dispatch({ type: CREATE_CATEGORY, payload: response.data });
  if(forced) {
    history.push('/videos/new');
  } else {
    history.push(endpoint);
  }
};

export const fetchCategories = () => async dispatch => {
  const response = await baseApi.get(endpoint);
  dispatch({ type: FETCH_CATEGORIES, payload: response.data });
}

export const fetchCategory = id => async dispatch => {
  const response = await baseApi.get(`${endpoint}/${id}`);
  dispatch({ type: FETCH_CATEGORY, payload: response.data });
}

export const updateCategory = (id, formValues) => async dispatch => {
  const response = await baseApi.put(`${endpoint}/${id}`, formValues);
  dispatch({ type: UPDATE_CATEGORY, payload: response.data });
  history.push(endpoint);
}

export const deleteCategory = id => async dispatch => {
  await baseApi.delete(`${endpoint}/${id}`);
  history.push(endpoint);
  dispatch({ type: DELETE_CATEGORY, payload: id });
}
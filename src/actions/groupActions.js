import baseApi from '../apis/baseApi';
import history from '../history';
import {
    CREATE_GROUP,
    FETCH_GROUPS,
    FETCH_GROUP,
    UPDATE_GROUP,
    DELETE_GROUP
} from './types';

const endpoint = '/groups';

export const createGroup = (formValues, forced) => async (dispatch) => {
  const response = await baseApi.post(endpoint, { ...formValues });
  dispatch({ type: CREATE_GROUP, payload: response.data });
  if(forced) {
    history.push('/customers/new');
  } else {
    history.push(endpoint);
  }
};

export const fetchGroups = () => async dispatch => {
  const response = await baseApi.get(endpoint);
  dispatch({ type: FETCH_GROUPS, payload: response.data });
}

export const fetchGroup = id => async dispatch => {
  const response = await baseApi.get(`${endpoint}/${id}`);
  dispatch({ type: FETCH_GROUP, payload: response.data });
}

export const updateGroup = (id, formValues) => async dispatch => {
  const response = await baseApi.put(`${endpoint}/${id}`, formValues);
  dispatch({ type: UPDATE_GROUP, payload: response.data });
  history.push(endpoint);
}

export const deleteGroup = id => async dispatch => {
  await baseApi.delete(`${endpoint}/${id}`);
  history.push(endpoint);
  dispatch({ type: DELETE_GROUP, payload: id });
}
import baseApi from '../apis/baseApi';
import history from '../history';
import {
    CREATE_VIDEO,
    FETCH_VIDEOS,
    FETCH_VIDEO,
    UPDATE_VIDEO,
    DELETE_VIDEO,
    FETCH_IMDB_VIDEO,
    CLEAR_IMDB_VIDEO,

    CREATE_COPY,
    FETCH_COPY,
    DELETE_COPY,

    CATCH_ERROR,
    DISMISS_ERROR
} from './types';

const endpoint = '/videos';

export const createVideo = formValues => async dispatch => {
  const response = await baseApi.post(endpoint, { ...formValues });
  dispatch({ type: CREATE_VIDEO, payload: response.data });
  history.push(endpoint);
};

export const fetchVideos = () => async dispatch => {
  const response = await baseApi.get(endpoint);
  dispatch({ type: FETCH_VIDEOS, payload: response.data });
}

export const fetchVideo = id => async dispatch => {
  const response = await baseApi.get(`${endpoint}/${id}`);
  dispatch({ type: FETCH_VIDEO, payload: response.data });
}

export const updateVideo = (id, formValues) => async dispatch => {
  const response = await baseApi.put(`${endpoint}/${id}`, formValues);
  dispatch({ type: UPDATE_VIDEO, payload: response.data });
  history.push(endpoint);
}

export const deleteVideo = id => async dispatch => {
  await baseApi.delete(`${endpoint}/${id}`);
  history.push(endpoint);
  dispatch({ type: DELETE_VIDEO, payload: id });
}

export const createCopy = videoId => async dispatch => {
  const response = await baseApi.post(`${endpoint}/${videoId}/copies`);
  dispatch({ type: CREATE_COPY, payload: response.data });
}

export const fetchCopy = (videoId, copyId) => async dispatch => {
  const response = await baseApi.get(`${endpoint}/copies/${copyId}`);
  dispatch({ type: FETCH_COPY, payload: response.data });
}

export const deleteCopy = (videoId, copyId) => async dispatch => {
  const response = await baseApi.delete(`${endpoint}/copies/${copyId}`);
  dispatch({ type: DELETE_COPY, payload: response.data });
  history.push(`${endpoint}/${videoId}`);
};

export const fetchImdbVideo = id => async dispatch => {
  const response = await baseApi.get(`${endpoint}/omdb/${id}`);
  if(!response || !response.data.title) {
    dispatch({ type: CATCH_ERROR, payload: 'No results for this title!' })
  } else {
    dispatch({ type: DISMISS_ERROR })
    dispatch({ type: FETCH_IMDB_VIDEO, payload: response.data })
  }
}

export const clearImdbVideo = () => ({
  type: FETCH_IMDB_VIDEO, payload: { title: '', year: '', director: '' }
})
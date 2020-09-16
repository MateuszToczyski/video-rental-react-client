import baseApi from '../apis/baseApi';
import history from '../history';
import {
    CREATE_CUSTOMER,
    FETCH_CUSTOMERS,
    FETCH_CUSTOMER,
    UPDATE_CUSTOMER,
    DELETE_CUSTOMER,
    CALCULATE_RENTAL,
    FETCH_RENTAL,
    RENT_VIDEO,
    RETURN_VIDEO,
    SETTLE_RENTAL
} from './types';

const endpoint = '/customers';

export const createCustomer = formValues => async (dispatch) => {
  const response = await baseApi.post(endpoint, { ...formValues });
  dispatch({ type: CREATE_CUSTOMER, payload: response.data });
  history.push(endpoint);
};

export const fetchCustomers = () => async dispatch => {
  const response = await baseApi.get(endpoint);
  dispatch({ type: FETCH_CUSTOMERS, payload: response.data });
}

export const fetchCustomer = id => async dispatch => {
  const response = await baseApi.get(`${endpoint}/${id}`);
  dispatch({ type: FETCH_CUSTOMER, payload: response.data });
}

export const updateCustomer = (id, formValues) => async dispatch => {
  const response = await baseApi.put(`${endpoint}/${id}`, formValues);
  dispatch({ type: UPDATE_CUSTOMER, payload: response.data });
  history.push(endpoint);
}

export const deleteCustomer = id => async dispatch => {
  await baseApi.delete(`${endpoint}/${id}`);
  history.push(endpoint);
  dispatch({ type: DELETE_CUSTOMER, payload: id });
}

export const calculateRental = (customerId, copyId) => async dispatch => {
  const response = await baseApi.get(`${endpoint}/${customerId}/calculateRental/${copyId}`);
  dispatch({ type: CALCULATE_RENTAL, payload:response.data });
}

export const fetchRental = rentalId => async dispatch => {
  const response = await baseApi.get(`${endpoint}/rentals/${rentalId}`);
  dispatch({ type: FETCH_RENTAL, payload:response.data });
}

export const rentVideo = (customerId, copyId) => async dispatch => {
  const response = await baseApi.post(`${endpoint}/${customerId}/rent/${copyId}`);
  dispatch({ type: RENT_VIDEO, payload:response.data });
  history.push(`${endpoint}/${customerId}`);
}

export const returnVideo = (customerId, rentalId) => async dispatch => {
  const response = await baseApi.put(`${endpoint}/rentals/${rentalId}/return`);
  dispatch({ type: RETURN_VIDEO, payload:response.data });
}

export const settleRental = (customerId, rentalId)=> async dispatch => {
  const response = await baseApi.put(`${endpoint}/rentals/${rentalId}/settle`);
  dispatch({ type: SETTLE_RENTAL, payload:response.data });
}
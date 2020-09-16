import {
  CATCH_ERROR,
  DISMISS_ERROR
} from './types';

export const catchError = message => ({
  type: CATCH_ERROR,
  payload: message
})

export const dismissError = () => ({
  type: DISMISS_ERROR
})
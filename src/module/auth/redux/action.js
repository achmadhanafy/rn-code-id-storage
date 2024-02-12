import {CONST_AUTH_REDUX} from './util';

export const setAuth = payload => ({
  type: CONST_AUTH_REDUX.SET_AUTH,
  payload,
});

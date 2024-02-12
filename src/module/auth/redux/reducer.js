import {CONST_AUTH_REDUX} from './util';
import store from './store';

const authReducer = (state = store, action) => {
  const {payload, type} = action;
  // switch (action.type) {
  //   case [CONST_AUTH_REDUX.SET_AUTH]:
  //     return {...state, token: payload?.token, email: payload?.email};
  //   default:
  //     return state;
  // }
  const actions = {
    [CONST_AUTH_REDUX.SET_AUTH]: () => ({
      ...state,
      token: payload?.token,
      email: payload?.email,
    }),

    DEFAULT: () => state,
  };

  return (actions[type] || actions.DEFAULT)();
};

export default authReducer;

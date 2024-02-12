import {AuthLogin} from '@code-module-auth/screen';
import {SCREEN_AUTH} from './constant';

export const STACK_AUTH = [
  {
    name: SCREEN_AUTH.AuthLogin,
    component: AuthLogin,
  },
];

import todosApi from '@code-module-auth/api/todo';
import {createApiMiddlewares, createApiReducers} from 'rn-codeid-storage';

const allApi = [todosApi];

export const apiReducers = createApiReducers(allApi);
export const apiMiddleware = createApiMiddlewares(allApi);

import api from '@code-api/axios';
import {createApi} from '@reduxjs/toolkit/query/react';
import {createBaseQuery} from 'rn-codeid-storage';

const endpoint = '/todos/1';

export const todosApi = createApi({
  reducerPath: 'todosService',
  baseQuery: createBaseQuery(api),
  tagTypes: ['Todos'],
  endpoints: builder => ({
    getTodos: builder.query({
      query: payload => ({
        url: endpoint,
        method: 'GET',
        params: payload,
      }),
    }),
  }),
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
});

export default todosApi;

export const {useGetTodosQuery} = todosApi;

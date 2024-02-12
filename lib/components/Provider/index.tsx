import store from '@code-store/index';
import initStore, {
  OtherMiddleware,
  PersistKey,
  Store,
  WhiteList,
} from '../../store';
import React, {PropsWithChildren} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';

type ProviderType = PropsWithChildren<{
  title: string;
  persistKey?: PersistKey;
  store?: Store;
  otherMiddleware?: OtherMiddleware;
  whitelist?: WhiteList;
}>;

const {store: getStore, persistor} = initStore({
  persistKey: '729f9c4d-6ffc-4693-842f-b901f8df049a',
  store: store,
  otherMiddleware: false,
  whitelist: ['auth'],
});

function CodeProvider(props: ProviderType) {
  const {persistKey, store, otherMiddleware, children, whitelist} = props;
  // const {store: getStore, persistor} = initStore({
  //   persistKey,
  //   store,
  //   otherMiddleware,
  //   whitelist,
  // });

  return (
    <Provider store={getStore}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export default CodeProvider;

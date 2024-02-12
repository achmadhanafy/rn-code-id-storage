import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import useEncryption from '../hooks/useEncryption';
import {combineReducers} from 'redux';
import createTransform from 'redux-persist/es/createTransform';

export type PersistKey = string;
export type Store = object;
export type OtherMiddleware = any;
export type WhiteList = string[];

type InitStoreConfig = {
  persistKey?: PersistKey;
  store?: Store;
  otherMiddleware?: OtherMiddleware;
  whitelist?: WhiteList;
};

function initStore(config: InitStoreConfig = {}) {
  const {persistKey, store, otherMiddleware, whitelist} = config;

  const encryptor = createTransform(
    inboundState => {
      const {encrypt} = useEncryption();
      if (!inboundState) {
        return inboundState;
      }

      const cryptedText = encrypt(JSON.stringify(inboundState), persistKey);

      return cryptedText;
    },
    outboundState => {
      const {decrypt} = useEncryption();
      if (!outboundState) {
        return outboundState;
      }
      const decrypted = JSON.parse(decrypt(outboundState, persistKey));

      return decrypted;
    },
  );

  const storage = createSensitiveStorage({
    keychainService: 'persistKeychain',
    sharedPreferencesName: 'persistPrefs',
  });

  const persistConfig = {
    key: 'auth',
    storage: storage,
    transforms: [encryptor],
    whitelist,
  };

  const reducers = combineReducers({
    ...store,
  });

  const persistedReducer = persistReducer(persistConfig, reducers);

  const createStore = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => {
      let middlewares;
      if (otherMiddleware) {
        middlewares = getDefaultMiddleware({
          serializableCheck: false,
          immutableCheck: false,
        }).concat(otherMiddleware);
      } else {
        middlewares = getDefaultMiddleware({
          serializableCheck: false,
          immutableCheck: false,
        });
      }

      if (__DEV__) {
        const createDebugger = require('redux-flipper').default;
        middlewares.push(createDebugger());
      }

      return middlewares;
    },
  });

  const persistor = persistStore(createStore);

  return {store: createStore, persistor};
}

export default initStore;

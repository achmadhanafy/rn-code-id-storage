import {configureStore} from '@reduxjs/toolkit';
import {createTransform, persistReducer} from 'redux-persist';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import useEncryption from '../hooks/useEncryption';
import persistStore from 'redux-persist/es/persistStore';

const encryptor = persistKey =>
  createTransform(
    (inboundState, key) => {
      const {encrypt} = useEncryption();
      if (!inboundState) {
        return inboundState;
      }

      const cryptedText = encrypt(JSON.stringify(inboundState), persistKey);

      return cryptedText;
    },
    (outboundState, key) => {
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

const persistConfig = persistKey => ({
  key: 'root',
  storage: storage,
  transforms: [encryptor(persistKey)],
  whitelist: [
    'theme',
    'auth',
    'cart',
    'user',
    'guestAddress',
    'update',
    'guestGarage',
    'appleCredential',
    'pushNotification',
  ],
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = otherMiddleware =>
  configureStore({
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

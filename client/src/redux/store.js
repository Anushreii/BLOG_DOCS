import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // ✅ Correct import

// ✅ Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
});

// ✅ Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// ✅ Correctly create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Configure store using persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Prevents redux-persist issues
    }),
});

// ✅ Create persistor
export const persistor = persistStore(store);

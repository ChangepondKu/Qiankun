import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage for persistence
import { combineReducers } from 'redux';
import sessionStorage from 'redux-persist/es/storage/session';

// Initial state
const initialState = {
  user: {},
  isLoggedIn: false,
  token: '',
  exp_hr: '',
  sidebarVisibility: false,
};

// Reducer for app state
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER_DATA':
      return { ...state, user: action.payload };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload?.user,
        token: action.payload?.token,
        exp_hr: action.payload?.exp_hr,
      };
    case 'LOGOUT_USER':
      return initialState;
    case 'UPDATE_SIDEBAR_VISIBILITY':
      return { ...state, sidebarVisibility: action.payload?.sidebarVisibility }
    default:
      return state;
  }
};

// Combine reducers (useful for scaling)
const combinedReducer = combineReducers({
  app: rootReducer,
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['app'], // Persist only the app state
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, combinedReducer);

// Configure store with middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Allow non-serializable actions for Redux Persist
    }),
});

// Create persistor
const persistor = persistStore(store);

export { store, persistor };

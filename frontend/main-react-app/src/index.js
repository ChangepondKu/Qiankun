import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { addGlobalUncaughtErrorHandler, registerMicroApps } from 'qiankun';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ErrorBoundary from './errorBoundary/ErrorBoundary';

reportWebVitals();

// Qiankun micro-app registration
registerMicroApps([
  {
    name: 'micro-app-1',
    entry: '//localhost:3001',
    container: '#micro-app-1-container',
    activeRule: '/app1',
    props: { store },
  },
  {
    name: 'micro-app-2',
    entry: '//localhost:3002',
    container: '#micro-app-2-container',
    activeRule: '/app2',
    props: { store },
  },
  {
    name: 'micro-app-3',
    entry: '//localhost:3003',
    container: '#micro-app-3-container', // Corrected container ID
    activeRule: '/app3',
    props: { store },
    loader: (loading) => {
      console.log(`Micro-app-3 is ${loading ? 'loading...' : 'loaded'}`);
    },
  },
  {
    name: 'navbar-app',
    entry: '//localhost:3004',
    container: '#navbar-container',
    activeRule: () => true, // Navbar is always active
    props: { store },
    loader: (loading) => {
      console.log(`Navbar app is ${loading ? 'loading...' : 'loaded'}`);
    },
  },
  {
    name: 'footer-app',
    entry: '//localhost:3005',
    container: '#footer-container',
    activeRule: () => true, // Footer is always active
    props: { store },
    loader: (loading) => {
      console.log(`Footer app is ${loading ? 'loading...' : 'loaded'}`);
    },
  },
]);

// Qiankun uncaught error handler
addGlobalUncaughtErrorHandler((event) => {
  if (event?.message?.includes('Failed to fetch')) {
    console.error('Failed to load micro-app:', event.message);
  }
});

// React app initialization
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);

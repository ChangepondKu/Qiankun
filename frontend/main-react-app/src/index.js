import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerMicroApps} from 'qiankun';
import actions from './state';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// Qiankun registration
registerMicroApps([
  {
    name: 'micro-app-1',
    entry: '//localhost:3001', // Ensure this points to your first micro-app
    container: '#micro-app-1-container',
    activeRule: '/app1',
    props: { store }
  },
  {
    name: 'micro-app-2',
    entry: '//localhost:3002', // Ensure this points to your second micro-app
    container: '#micro-app-2-container',
    activeRule: '/app2',
    props: { store }
  },
  {
    name: 'micro-app-3',
    entry: '//localhost:3003',
    container: '#micro-app-1-container',
    activeRule: '/app3',
    props: { store }
  },
  {
    name: 'navbar-app',
    entry: '//localhost:3004',
    container: '#navbar-container',
    activeRule: (location) => true,
    props: { store },
    loader: (loading) => {
      console.log(`Footer app is ${loading ? 'loading' : 'loaded'}`);
    },
  },
  // {
  //   name: 'footer-app',
  //   entry: '//localhost:3005',
  //   container: '#footer-container',
  //   activeRule: (location) => true,
  //   props: { store },
  //   loader: (loading) => {
  //     console.log(`Footer app is ${loading ? 'loading' : 'loaded'}`);
  //   },
  // }
]);
// the below code is responsible for fetching the micro-apps this code is moved to app.js
// for to get the micro-apps after the login success

// setDefaultMountApp('/app1');
// //error handling in case one of the micro-frontends fails to load
// start({
//   sandbox: { strictStyleIsolation: true },
//   prefetch: 'all',
//   singular: false, // Load one micro-app at a time for better isolation
// });






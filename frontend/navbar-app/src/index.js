import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import fallbackStore from './components/dummyStore/fallbackStore';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

let root = null;

// Lifecycle: Bootstrap
export async function bootstrap() {
  console.log('navbar-app bootstraped');
}

// Lifecycle: Mount
export async function mount(props) {
  console.log('navbar-app mounted');
  const { container, store } = props;

  // console.log(actions.getGlobalState,'>>>>navbar inde.js state');

  // Attach to the root of Qiankun's container if available
  const rootElement = container
    ? container.querySelector('#root') // If Qiankun container is available
    : document.getElementById('root'); // Fallback for standalone mode

  // Initialize React Root
  root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

// Lifecycle: Unmount
export async function unmount(props) {
  console.log('navbar-app unmounted');
  const { container } = props;

  // Unmount React from the container
  if (root) {
    root.unmount();
    root = null;
  }

  // Optionally clear the DOM element
  const rootElement = container
    ? container.querySelector('#root')
    : document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = '';
  }
}

// Standalone Mode Support
if (!window.__POWERED_BY_QIANKUN__) {
  console.log('Running in standalone mode');
  const rootElement = document.getElementById('root');
  const localRoot = ReactDOM.createRoot(rootElement);
  localRoot.render(
    <React.StrictMode>
      <Provider store={fallbackStore}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}
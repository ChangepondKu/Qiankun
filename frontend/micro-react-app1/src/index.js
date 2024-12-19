import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensure Bootstrap JS is included
import { Provider } from 'react-redux';
import { fallbackStore } from './components/fallbackStore.js/fallbackStore';
import { validateUser } from './components/api/apiRepository';
import { userCredentail } from './components/config/apiConfig';

let root = null;

// Lifecycle: Bootstrap
export async function bootstrap() {
  console.log('micro-app-1 bootstraped');
}

// Lifecycle: Mount
export async function mount(props) {
  console.log('micro-app-1 mounted');
  const { container, store } = props;

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
  console.log('micro-app-1 unmounted');
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
   // Mock credentials and API call
   let response = null;
   try {
     response = await validateUser(userCredentail);
   } catch (error) {
     console.error("API validation failed:", error);
     response = null; // Default fallback
   }
  localRoot.render(
    <React.StrictMode>
      <Provider store={fallbackStore}>
        <App user={response}/>
      </Provider>
    </React.StrictMode>
  );
}
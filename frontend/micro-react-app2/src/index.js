import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { validateUser } from './components/api/apiRepository';
import { fallbackStore } from './components/fallbackStore/fallbackStore';
import { userCredentail } from './components/config/apiConfig';

let root = null;

// Lifecycle: Bootstrap
export async function bootstrap() {
  console.log('micro-app-2 bootstraped');
}

// Lifecycle: Mount
export async function mount(props) {
  console.log('micro-app-2 mounted');

  const { container, store } = props;
  const finalStore = store || fallbackStore; // Use fallback store if needed

  const rootElement = container
    ? container.querySelector('#root')
    : document.getElementById('root');

  root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={finalStore}>
      <App />
    </Provider>
  );
}

// Lifecycle: Unmount
export async function unmount(props) {
  console.log('micro-app-2 unmounted');
  if (root) {
    root.unmount();
    root = null;
  }
}

// Standalone Mode Support
if (!window.__POWERED_BY_QIANKUN__) {
  console.log('Running in standalone mode');
  (async () => {
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
          <App user={response} />
        </Provider>
      </React.StrictMode>
    );
  })();
}

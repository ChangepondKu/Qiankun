import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

let root = null;

// Lifecycle: Bootstrap
export async function bootstrap() {
  try {
    console.log('micro-app-3 bootstrapped');
  } catch (error) {
    console.error('Bootstrap error:', error);
  }
}

// Lifecycle: Mount
export async function mount(props) {
  try {
    console.log('micro-app-3 mounted');
    const { container } = props;

    // Attach to the root of Qiankun's container if available
    const rootElement = container
      ? container.querySelector('#root') // If Qiankun container is available
      : document.getElementById('root'); // Fallback for standalone mode

    // Initialize React Root
    root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Mount error:', error);
  }
}

// Lifecycle: Unmount
export async function unmount(props) {
  try {
    console.log('micro-app-3 unmounted');
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
  } catch (error) {
    console.error('Unmount error:', error);
  }
}

// Standalone Mode Support
if (!window.__POWERED_BY_QIANKUN__) {
  try {
    console.log('Running in standalone mode');
    const rootElement = document.getElementById('root');
    const localRoot = ReactDOM.createRoot(rootElement);
    localRoot.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Standalone mode error:', error);
  }
}

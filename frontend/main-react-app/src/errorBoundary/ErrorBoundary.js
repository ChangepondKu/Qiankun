import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error);
    // You could log the error to an error monitoring service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong while loading the application.</h1>
          <p>Please try again later or contact support.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

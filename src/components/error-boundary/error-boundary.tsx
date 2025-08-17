import React, { Component } from 'react';

import type { ErrorBoundaryProps, ErrorBoundaryState } from '../../types/types';

class ErrorBoundary extends Component<
  React.PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    throwError: false,
  };

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    console.log('getDerivedStateFromError:', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleThrow = () => {
    this.setState({ throwError: true });
  };

  handleRetry = () => {
    this.setState({ hasError: false, throwError: false });
  };

  render() {
    const { hasError, throwError } = this.state;

    const errorButton = null;

    const retryButton = (
      <button
        onClick={this.handleRetry}
        className="absolute bottom-4 right-4 p-2 dark:text-[var(--color-black)] px-4 py-2 bg-[var(--color-gray-300)] rounded hover:bg-[var(--color-gray-400)] hover:text-[var(--color-white)] transition-all duration-300 cursor-pointer"
      >
        Try again
      </button>
    );

    if (hasError) {
      return (
        <div className="p-4 min-h-screen flex flex-col justify-between relative">
          <div className="my-4 p-4 text-[var(--color-red-600)] font-bold text-xl text-center">
            Non-successful response.
          </div>
          <div className="flex gap-4">
            {errorButton} {retryButton}
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col min-h-screen relative">
        <div className="flex-grow">{this.props.children}</div>
        {errorButton}
        <ErrorThrower shouldThrow={throwError} />
      </div>
    );
  }
}

export default ErrorBoundary;

class ErrorThrower extends Component<{ shouldThrow: boolean }> {
  render() {
    if (this.props.shouldThrow) {
      throw new Error('Test error!');
    }
    return null;
  }
}

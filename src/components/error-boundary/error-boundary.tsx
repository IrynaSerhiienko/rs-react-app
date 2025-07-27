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

  render() {
    const { hasError } = this.state;

    const errorButton = (
      <button
        onClick={this.handleThrow}
        className="mt-4 p-2 bg-red-500 text-white rounded self-start w-auto cursor-pointer"
      >
        Error Button
      </button>
    );

    if (hasError) {
      return (
        <div className="p-4 min-h-screen flex flex-col justify-between">
          <div className="my-4 p-4 text-red-600 font-bold text-xl text-center">
            Non-successful response.
          </div>
          {errorButton}
        </div>
      );
    }

    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">{this.props.children}</div>
        {errorButton}
        <ErrorThrower shouldThrow={this.state.throwError} />
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
    return null; // or <></>
  }
}

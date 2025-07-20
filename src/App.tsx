import React, { Component } from 'react';

import type { AppState } from './types/types';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Main from './components/Main';
import Search from './components/Search';
import { fetchCharacters } from './api/api';

class App extends Component<Record<string, never>, AppState> {
  state: AppState = {
    loading: false,
    error: null,
    data: [],
    searchTerm: localStorage.getItem('searchTerm') || '',
  };

  componentDidMount() {
    if (this.state.searchTerm) {
      this.handleSearch(this.state.searchTerm);
    }
  }

  handleSearch = async (term: string) => {
    try {
      this.setState({ loading: true, error: null });
      const res = await fetchCharacters(term);
      localStorage.setItem('searchTerm', term);
      this.setState({ data: res.results, loading: false, searchTerm: term });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong';
      this.setState({ error: message, loading: false });
    }
  };

  render(): React.ReactNode {
    const { loading, error, data } = this.state;
    // const { loading, error, data, searchTerm } = this.state;

    return (
      // <ErrorBoundary searchTerm={searchTerm} onSearch={this.handleSearch}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl flex flex-col items-center">
          <Header />
          <Search onSearch={this.handleSearch} />
          <ErrorBoundary>
            <Main loading={loading} error={error} data={data} />
          </ErrorBoundary>
        </div>
      </div>
      // </ErrorBoundary>
    );
  }
}

export default App;

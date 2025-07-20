import React, { Component } from 'react';

interface Props {
  onSearch: (term: string) => void;
}

interface State {
  searchTerm: string;
}

class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const storedTerm = localStorage.getItem('searchTerm') || '';
    this.state = { searchTerm: storedTerm };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSearch = () => {
    const trimmed = this.state.searchTerm.trim();
    localStorage.setItem('searchTerm', trimmed);
    this.props.onSearch(trimmed);
  };

  render(): React.ReactNode {
    return (
      <div className="flex space-x-2 mb-4">
        <input
          value={this.state.searchTerm}
          onChange={this.handleChange}
          placeholder="Search..."
          className="p-2 border rounded w-full"
        />
        <button
          onClick={this.handleSearch}
          className="bg-blue-100 p-2 rounded cursor-pointer border-2"
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;

import CardList from '../CardList/CardList';
import { Component } from 'react';
import type { MainProps } from '../../types/types';
// import Search from './Search';

class Main extends Component<MainProps> {
  render() {
    const { loading, error, data } = this.props;
    // const { loading, error, data, onSearch } = this.props;

    return (
      <div>
        {/* <Search onSearch={onSearch} /> */}
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <CardList items={data} />}
      </div>
    );
  }
}

export default Main;

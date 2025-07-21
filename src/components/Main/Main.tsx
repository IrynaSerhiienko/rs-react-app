import CardList from '../CardList/CardList';
import { Component } from 'react';
import type { MainProps } from '../../types/types';

class Main extends Component<MainProps> {
  render() {
    const { loading, error, data } = this.props;

    return (
      <div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <CardList items={data} />}
      </div>
    );
  }
}

export default Main;

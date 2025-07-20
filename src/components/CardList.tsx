import Card from './Card';
import type { CardListProps } from '../types/types';
import { Component } from 'react';

class CardList extends Component<CardListProps> {
  render() {
    return (
      <div className="grid gap-4">
        {this.props.items.map((item) => (
          <Card
            key={item.id}
            name={item.name}
            status={item.status}
            image={item.image}
          />
        ))}
      </div>
    );
  }
}

export default CardList;

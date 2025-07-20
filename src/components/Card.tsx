import type { CardProps } from '../types/types';
import { Component } from 'react';

class Card extends Component<CardProps> {
  render() {
    const { name, status, image } = this.props;

    return (
      <div className="border p-4 rounded shadow bg-white flex items-center space-x-4">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 rounded-full object-cover border border-gray-300"
        />
        <div>
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-gray-600">Status: {status}</p>
        </div>
      </div>
    );
  }
}

export default Card;

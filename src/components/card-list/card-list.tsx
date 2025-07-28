import type { Character } from '../../types/types';
import { Card } from '../card/card';

interface CardListProps {
  items: Character[];
  onCardClick: (id: number) => void;
}

export function CardList({ items, onCardClick }: CardListProps) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          name={item.name}
          status={item.status}
          image={item.image}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}

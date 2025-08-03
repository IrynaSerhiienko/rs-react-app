import type { Character } from '../../types/types';
import { Card } from '../card/card';

interface CardListProps {
  items: Character[];
  onOpenDetails: (id: number) => void;
}

export function CardList({ items, onOpenDetails }: CardListProps) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          name={item.name}
          status={item.status}
          image={item.image}
          onOpenDetails={onOpenDetails}
        />
      ))}
    </div>
  );
}

import type { Character } from '../../types/types';
import { Card } from '../card/card';

interface CardListProps {
  items: Character[];
}

export function CardList(props: CardListProps) {
  return (
    <div className="grid gap-4">
      {props.items.map((item) => (
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

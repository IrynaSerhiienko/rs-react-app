import type { Character } from '../../types/types';
import { Title } from '../title/title';

interface CardProps
  extends Pick<Character, 'id' | 'name' | 'status' | 'image'> {
  onClick?: (id: number) => void;
}

export function Card({ id, name, status, image, onClick }: CardProps) {
  return (
    <div
      className="dark:text-black px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 hover:text-white transition-all duration-300 cursor-pointer"
      onClick={() => onClick?.(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onClick?.(id);
      }}
    >
      <img src={image} alt={name} className="img-card-app w-20 h-20" />
      <div>
        <Title level={3} className="h3-app">
          {name}
        </Title>
        <p className="text-gray-600">Status: {status}</p>
      </div>
    </div>
  );
}

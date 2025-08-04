import type { Character } from '../../types/types';
import { CharacterSelectItemCheckbox } from '../character-select-item-checkbox/character-select-item-checkbox';

interface CardProps
  extends Pick<Character, 'id' | 'name' | 'status' | 'image'> {
  onOpenDetails: (id: number) => void;
}

export function Card({ id, name, status, image, onOpenDetails }: CardProps) {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('input[type="checkbox"]')) {
      return;
    }
    onOpenDetails(id);
  };

  return (
    <div
      className="dark:text-black px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 hover:text-white transition-all duration-300 cursor-pointer flex items-center justify-between"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          onOpenDetails(id);
        }
      }}
    >
      <div className="flex items-center gap-4">
        <img src={image} alt={name} className="img-card-app w-20 h-20" />
        <div>
          <h3 className="h3-app">{name}</h3>
          <p className="text-gray-600">Status: {status}</p>
        </div>
      </div>
      <CharacterSelectItemCheckbox character={{ id, name, status, image }} />
    </div>
  );
}

import type { Character } from '../../types/types';

interface CardProps
  extends Pick<Character, 'id' | 'name' | 'status' | 'image'> {
  onClick?: (id: number) => void;
}

export function Card({ id, name, status, image, onClick }: CardProps) {
  return (
    <div
      className="border p-4 rounded shadow bg-white flex items-center space-x-4 cursor-pointer"
      onClick={() => onClick?.(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onClick?.(id);
      }}
    >
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

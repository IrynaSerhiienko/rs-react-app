import { useEffect, useState } from 'react';

import { fetchCharacterById } from '../../api/api';
import type { Character } from '../../types/types';
import { Title } from '../title/title';

type CharacterDetailsProps = {
  id: string;
  onClose: () => void;
};

export function CharacterDetails({ id, onClose }: CharacterDetailsProps) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function loadCharacter() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCharacterById(parseInt(id, 10));
        setCharacter(data);
      } catch {
        setError('Failed to load character details');
      } finally {
        setLoading(false);
      }
    }

    loadCharacter();
  }, [id]);

  if (loading) return <p>Loading details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!character) return <p>No character found</p>;

  return (
    <div>
      <img
        src={character.image}
        alt={character.name}
        className="w-60 h-60 rounded-full object-cover border border-gray-300 mb-4"
      />
      <Title level={2} className="flex text-2xl font-bold mb-4">
        {character.name}
      </Title>
      <div className="flex flex-col gap-2 mb-4">
        <p>
          Status: <b>{character.status}</b>
        </p>
        <p>
          Species: <b>{character.species}</b>
        </p>
        <p>
          Gender: <b>{character.gender}</b>
        </p>
      </div>
      <button
        onClick={onClose}
        className="px-4 py-2 bg-gray-300 rounded cursor-pointer hover:bg-gray-400 hover:text-white transition-all duration-300"
      >
        Close
      </button>
    </div>
  );
}

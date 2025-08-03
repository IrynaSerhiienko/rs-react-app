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
    if (!id) {
      setLoading(false);
      return;
    }

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
  if (!character || !character.name) return <p>No character found</p>;

  return (
    <div>
      <img
        src={character.image}
        alt={character.name}
        className="img-card-app w-35 h-35 md:w-70 md:h-70 mb-4"
      />
      <Title level={2} className="h2-app mb-4">
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
      <button onClick={onClose} className="btn-app cursor-pointer">
        Close
      </button>
    </div>
  );
}

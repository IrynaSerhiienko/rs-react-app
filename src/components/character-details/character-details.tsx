import Image from 'next/image';

import { useGetCharacterByIdQuery } from '../../store/api/characters-api';
import { getErrorMessage } from '../../utils/get-error-message';
import { Spinner } from '../spinner/spinner';

type CharacterDetailsProps = {
  id: string;
  onClose: () => void;
};

export default function CharacterDetails({
  id,
  onClose,
}: CharacterDetailsProps) {
  const characterId = Number(id);
  const {
    data: character,
    error,
    isLoading,
  } = useGetCharacterByIdQuery(characterId, {
    skip: !characterId,
  });

  if (!id) return null;

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500">{getErrorMessage(error)}</p>;
  if (!character || !character.name) return <p>No character found</p>;

  return (
    <div>
      <div className="relative mb-4 w-35 h-35 md:w-70 md:h-70 img-card-app">
        <Image
          src={character.image}
          alt={character.name}
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <h2 className="mb-4 h2-app">{character.name}</h2>
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
      <button onClick={onClose} className="cursor-pointer btn-app">
        Close
      </button>
    </div>
  );
}

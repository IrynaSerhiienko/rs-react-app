import Image from 'next/image';

import { useCharacterData } from '../../../../data/app-data';
import { useGetCharacterByIdQuery } from '../../../../store/api/characters-api';
import { getErrorMessage } from '../../../../utils/get-error-message';
import { ErrorMessage } from '../../../error-content/error-message/error-message';
import { Spinner } from '../../../spinner/spinner';

type CharacterDetailsProps = {
  id: string;
  onClose: () => void;
};

export default function CharacterDetails({
  id,
  onClose,
}: CharacterDetailsProps) {
  const { CARD_DETAILS } = useCharacterData();
  const characterId = Number(id);
  const {
    data: character,
    error,
    isLoading,
  } = useGetCharacterByIdQuery(characterId, {
    skip: !characterId,
  });

  const isCharacterMissing = !character || !character.name;

  if (!id) return null;
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={getErrorMessage(error)} />;
  if (isCharacterMissing) return <p>{CARD_DETAILS.NO_CHARACTER_FOUND}</p>;

  return (
    <div>
      <div className="relative mb-4 w-35 h-35 md:w-70 md:h-70 rounded-full object-cover border border-[var(--color-gray-300)] overflow-hidden">
        <Image
          src={character.image}
          alt={character.name}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 768px) 140px, 280px"
        />
      </div>
      <h2 className="mb-4 text-xl md:text-2xl font-semibold">
        {character.name}
      </h2>
      <div className="flex flex-col gap-2 mb-4">
        <p>
          {CARD_DETAILS.STATUS}: <b>{character.status}</b>
        </p>
        <p>
          {CARD_DETAILS.SPECIES}: <b>{character.species}</b>
        </p>
        <p>
          {CARD_DETAILS.GENDER}: <b>{character.gender}</b>
        </p>
      </div>
      <button
        onClick={onClose}
        className="cursor-pointer dark:text-[var(--color-black)] px-4 py-2 bg-[var(--color-gray-300)] rounded hover:bg-[var(--color-gray-400)] hover:text-[var(--color-white)] transition-all duration-300"
      >
        {CARD_DETAILS.CLOSE_BUTTON}
      </button>
    </div>
  );
}

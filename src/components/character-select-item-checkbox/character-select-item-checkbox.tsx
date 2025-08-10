import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addItem, removeItem } from '../../store/selected-items-slice';
import type { Character } from '../../types/types';

interface CharacterSelectItemCheckboxProps {
  character: Character;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export function CharacterSelectItemCheckbox({
  character,
}: CharacterSelectItemCheckboxProps) {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selectedItems.items);
  const isSelected = selectedItems.some((item) => item.id === character.id);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (isSelected) {
      dispatch(removeItem(character));
    } else {
      dispatch(addItem(character));
    }
  };

  return (
    <input
      type="checkbox"
      checked={isSelected}
      onChange={handleChange}
      aria-label={`Select ${character.name}`}
      className="w-5 h-5 cursor-pointer"
    />
  );
}

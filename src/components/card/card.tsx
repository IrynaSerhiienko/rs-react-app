import { KEY_CODES } from '../../data/app-data';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addItem, removeItem } from '../../store/selected-items-slice';
import type { Character } from '../../types/types';

interface CardProps
  extends Pick<Character, 'id' | 'name' | 'status' | 'image'> {
  onOpenDetails: (id: number) => void;
}

export function Card(props: CardProps) {
  const { id, name, status, image, onOpenDetails } = props;

  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selectedItems.items);
  const isSelected = selectedItems.some((item) => item.id === id);

  const toggleSelection = () => {
    if (isSelected) {
      dispatch(removeItem({ id, name, status, image }));
    } else {
      dispatch(addItem({ id, name, status, image }));
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    toggleSelection();
  };

  const handleCheckboxKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === KEY_CODES.SPACE || event.key === KEY_CODES.ENTER) {
      event.preventDefault();
      toggleSelection();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('input[type="checkbox"]')) {
      return;
    }
    onOpenDetails(id);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === KEY_CODES.ENTER) {
      onOpenDetails(id);
    }
  };

  return (
    <div className="relative">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        onKeyDown={handleCheckboxKeyDown}
        aria-label={`Select ${name}`}
        className="absolute w-5 h-5 -translate-y-1/2 cursor-pointer top-1/2 right-4"
      />
      <div
        className="flex items-center justify-between px-4 py-2 transition-all duration-300 bg-gray-300 rounded cursor-pointer dark:text-black hover:bg-gray-400 hover:text-white"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-4">
          <img src={image} alt={name} className="w-20 h-20 img-card-app" />
          <div>
            <h3 className="h3-app">{name}</h3>
            <p className="text-gray-600">Status: {status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

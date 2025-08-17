import { useRef } from 'react';

import { useFlyoutData } from '../../data/app-data';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { unselectAll } from '../../store/selected-items-slice';
import { createCSVBlob } from '../../utils/download-csv';
import { LimitContainer } from '../container/container';

export function Flyout() {
  const { UNSELECT_ALL, DOWNLOAD, ITEM_LABEL_SINGULAR, ITEM_LABEL_PLURAL } =
    useFlyoutData();
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selectedItems.items);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const SINGULAR_COUNT = 1;

  if (selectedItems.length === 0) return null;

  const itemLabel = `${selectedItems.length} ${
    selectedItems.length > SINGULAR_COUNT
      ? ITEM_LABEL_PLURAL
      : ITEM_LABEL_SINGULAR
  }`;

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    const blob = createCSVBlob(selectedItems);
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    if (downloadRef.current) {
      downloadRef.current.href = url;
      downloadRef.current.download = `${selectedItems.length}_items.csv`;
      downloadRef.current.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1000]  bg-[var(--color-gray-100)] dark:bg-[var(--color-neutral-800)] text-[var(--color-gray-900)] dark:text-[var(--color-gray-100)]">
      <LimitContainer className="px-2 py-5 flex flex-row justify-between items-center">
        <div>{itemLabel}</div>
        <div>
          <button
            className=" dark:text-[var(--color-black)] px-4 py-2 bg-[var(--color-gray-300)] rounded hover:bg-[var(--color-gray-400)] hover:text-[var(--color-white)] transition-all duration-300 cursor-pointer mr-10"
            onClick={handleUnselectAll}
          >
            {UNSELECT_ALL}
          </button>
          <button
            className=" dark:text-[var(--color-black)] px-4 py-2 bg-[var(--color-gray-300)] rounded hover:bg-[var(--color-gray-400)] hover:text-[var(--color-white)] transition-all duration-300 cursor-pointer"
            onClick={handleDownload}
          >
            {DOWNLOAD}
          </button>
          <a ref={downloadRef} className="hidden" />
        </div>
      </LimitContainer>
    </div>
  );
}

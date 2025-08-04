import { useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { unselectAll } from '../../store/selected-items-slice';
import { createCSVBlob } from '../../utils/download-csv';
import { LimitContainer } from '../container/container';

export function Flyout() {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selectedItems.items);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  if (selectedItems.length === 0) return null;

  const itemLabel = `${selectedItems.length} item${
    selectedItems.length > 1 ? 's' : ''
  } selected`;

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
    <div className="bg-app fixed bottom-0 left-0 right-0 z-[1000]">
      <LimitContainer className="px-2 py-5 flex flex-row justify-between items-center">
        <div>{itemLabel}</div>
        <div>
          <button
            className="btn-app cursor-pointer mr-10"
            onClick={() => dispatch(unselectAll())}
          >
            Unselect all
          </button>
          <button className="btn-app cursor-pointer" onClick={handleDownload}>
            Download
          </button>
          <a ref={downloadRef} className="hidden" />
        </div>
      </LimitContainer>
    </div>
  );
}

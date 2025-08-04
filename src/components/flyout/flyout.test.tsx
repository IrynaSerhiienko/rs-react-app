import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { store } from '../../store';
import * as hooks from '../../store/hooks';
import { unselectAll } from '../../store/selected-items-slice';
import * as downloadCSV from '../../utils/download-csv';
import { Flyout } from './flyout';

describe('Flyout', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    global.URL.createObjectURL = vi.fn(() => 'blob:url');
    global.URL.revokeObjectURL = vi.fn();
  });

  it('returns null when no selected items', () => {
    vi.spyOn(hooks, 'useAppSelector').mockReturnValueOnce([]);

    const { container } = render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders correctly with selected items and buttons', () => {
    vi.spyOn(hooks, 'useAppSelector').mockReturnValueOnce([
      { id: 1 },
      { id: 2 },
    ]);

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(
      screen.getByText((content) => content.includes('2 item'))
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Unselect all/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Download/i })
    ).toBeInTheDocument();
  });

  it('dispatches unselectAll action when "Unselect all" clicked', () => {
    vi.spyOn(hooks, 'useAppSelector').mockReturnValueOnce([{ id: 1 }]);

    const dispatchMock = vi.fn();
    vi.spyOn(hooks, 'useAppDispatch').mockReturnValue(dispatchMock);

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Unselect all/i }));
    expect(dispatchMock).toHaveBeenCalledWith(unselectAll());
  });

  it('calls handleDownload when Download button is clicked', () => {
    const items = [{ id: 1, name: 'test' }];

    vi.spyOn(hooks, 'useAppSelector').mockReturnValueOnce(items);

    const dispatchMock = vi.fn();
    vi.spyOn(hooks, 'useAppDispatch').mockReturnValue(dispatchMock);

    const createCSVBlobMock = vi
      .spyOn(downloadCSV, 'createCSVBlob')
      .mockReturnValue(new Blob(['test']));

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Download/i }));

    expect(createCSVBlobMock).toHaveBeenCalledWith(items);
    expect(global.URL.createObjectURL).toHaveBeenCalled();
    expect(global.URL.revokeObjectURL).toHaveBeenCalled();
  });
});

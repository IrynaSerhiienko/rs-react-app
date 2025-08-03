import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';

import { store } from '../../store';
import { charactersMock } from '../../tests/mocks';
import { CardList } from './card-list';

describe('CardList component', () => {
  it('renders a list of Card components with correct props', () => {
    render(
      <Provider store={store}>
        <CardList items={charactersMock} onOpenDetails={() => {}} />
      </Provider>
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();

    const statuses = screen.getAllByText('Status: Alive');
    expect(statuses).toHaveLength(2);

    expect(screen.getByRole('img', { name: 'Rick Sanchez' })).toHaveAttribute(
      'src',
      'rick.jpg'
    );
    expect(screen.getByRole('img', { name: 'Morty Smith' })).toHaveAttribute(
      'src',
      'morty.jpg'
    );
  });
});

// import { render, screen } from '@testing-library/react';
// import { describe, expect, it } from 'vitest';

// import { charactersMock } from '../../tests/mocks';
// import { CardList } from './card-list';

// describe('CardList component', () => {
//   it('renders a list of Card components with correct props', () => {
//     render(<CardList items={charactersMock} onCardClick={() => {}} />);

//     expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
//     expect(screen.getByText('Morty Smith')).toBeInTheDocument();

//     const statuses = screen.getAllByText('Status: Alive');
//     expect(statuses).toHaveLength(2);

//     expect(screen.getByRole('img', { name: 'Rick Sanchez' })).toHaveAttribute(
//       'src',
//       'rick.jpg'
//     );
//     expect(screen.getByRole('img', { name: 'Morty Smith' })).toHaveAttribute(
//       'src',
//       'morty.jpg'
//     );
//   });
// });

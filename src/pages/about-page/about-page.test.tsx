import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AboutPage } from './about-page';

describe('AboutPage', () => {
  it('renders AboutPage content correctly', () => {
    render(<AboutPage />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'About'
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Irina'
    );
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();

    const img = screen.getByAltText('Irina');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      'src',
      'https://avatars.githubusercontent.com/u/108522040?v=4'
    );

    const githubLink = screen.getByRole('link', { name: /GitHub/i });
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/IrynaSerhiienko'
    );

    const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i });
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/irynaserhiienko/'
    );

    expect(
      screen.getByText(/Learn React at/i, { exact: false })
    ).toBeInTheDocument();

    const rsSchoolLink = screen.getByRole('link', {
      name: /RS School React Course/i,
    });
    expect(rsSchoolLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
  });
});

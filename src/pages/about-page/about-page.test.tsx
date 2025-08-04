import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ThemeContext } from '../../context/theme-context';
import { ThemeProvider } from '../../context/theme-provider';
import { AboutPage } from './about-page';

function renderWithProviders(ui: React.ReactNode) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('AboutPage', () => {
  it('renders AboutPage content correctly with default theme', () => {
    renderWithProviders(<AboutPage />);

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

  it('renders GitHub and LinkedIn icons in dark theme', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider
        value={{ theme: 'dark', setTheme: () => {}, toggleTheme: () => {} }}
      >
        {children}
      </ThemeContext.Provider>
    );

    render(<AboutPage />, { wrapper });

    const githubImg = screen.getByRole('img', { name: /GitHub/i });
    expect(githubImg).toHaveAttribute('src');
    expect(githubImg.getAttribute('src')).toMatch(/^data:image\/svg\+xml,/);

    const linkedinImg = screen.getByRole('img', { name: /LinkedIn/i });
    expect(linkedinImg).toHaveAttribute('src');
    expect(linkedinImg.getAttribute('src')).toMatch(/^data:image\/svg\+xml,/);
  });

  it('renders GitHub and LinkedIn icons in light theme', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider
        value={{ theme: 'light', setTheme: () => {}, toggleTheme: () => {} }}
      >
        {children}
      </ThemeContext.Provider>
    );

    render(<AboutPage />, { wrapper });

    const githubImg = screen.getByRole('img', { name: /GitHub/i });
    expect(githubImg).toHaveAttribute('src');
    expect(githubImg.getAttribute('src')).toMatch(/^data:image\/svg\+xml,/);

    const linkedinImg = screen.getByRole('img', { name: /LinkedIn/i });
    expect(linkedinImg).toHaveAttribute('src');
    expect(linkedinImg.getAttribute('src')).toMatch(/^data:image\/svg\+xml,/);
  });
});

# RS React App

A React application for searching characters from the **Rick and Morty API**.

## 💡 Usage

- Enter a character name into the search input to find matching results
  > Example names: `Rick`, `Morty`, `Summer`, `Beth`, `Birdperson`, `Mr. Meeseeks`
- Click on a character card to view detailed information
- Use pagination to navigate between result pages

## 🚀 Features

- Search characters by name
- View detailed character information
- Integrates with the public API: [https://rickandmortyapi.com](https://rickandmortyapi.com)
- Client-side routing with `react-router-dom`
- Styled with `Tailwind CSS`
- Tested using `Vitest` and `@testing-library/react`

## 📦 Installation

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🧪 Testing

Tests are colocated with the components and API functions they cover, typically in the same directory.

Covered scenarios:

- API requests by name
- Trimming whitespace in the search term
- Handling 404 and 500 error responses

### Run tests:

```bash
npm run test
```

### Run tests with coverage report:

```bash
npm run coverage
```

## 🛠 Available Scripts

- `npm run dev` — start development server
- `npm run build` — build for production
- `npm run preview` — preview production build
- `npm run lint` — run ESLint and fix issues
- `npm run format` — format code with Prettier
- `npm run test` — run tests
- `npm run coverage` — run tests with coverage

## 🌐 Environment Variables

No environment variables required for this project.  
The app fetches data directly from the public Rick and Morty API.

## 📝 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## 📬 Contact

For questions or feedback, please open an issue or connect with me on [LinkedIn](https://www.linkedin.com/in/irynaserhiienko).

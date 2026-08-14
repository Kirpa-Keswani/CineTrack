# CineTrack

CineTrack is a movie discovery web application built with React and Vite. Browse popular films from TMDB, search by title, filter by genre, view detailed information, and save favorites that persist across browser sessions.

## Main Features

- Browse popular movies from The Movie Database (TMDB)
- Search movies by title
- Filter movies by genre with an **All** option to return to popular movies
- View movie details: poster, title, rating, release year, runtime, genres, and overview
- Add and remove favorites with heart buttons on cards and detail pages
- Favorites saved in `localStorage` and restored on refresh
- Favorites count badge in the header navigation
- Loading, error, and empty states for movies, genres, and search
- Responsive layout for mobile, tablet, and desktop
- Dark cinema-style UI with accessible focus states and labels

## Technologies Used

- **React 19** — UI components and hooks
- **Vite 8** — development server and production build
- **React Router 7** — client-side routing
- **TMDB API** — movie and genre data
- **CSS** — component-scoped styles with shared design tokens
- **Oxlint** — linting

No Redux or additional state-management libraries are used. Favorites are managed with React Context and `localStorage`.

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm

### Installation

```bash
git clone https://github.com/Kirpa-Keswani/CineTrack.git
cd cinetrack
npm install
```

### TMDB API Key

1. Create a free API key at [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
2. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

3. Add your key to `.env`:

```env
VITE_TMDB_API_KEY=your_api_key_here
```

**Important:** Never commit your `.env` file or expose your real API key in source code or README files. The `.env` file is listed in `.gitignore`.

### Run the Development Server

```bash
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

If the page appears blank after code changes, stop any old dev server instances and restart with `npm run dev`.

### Build for Production

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## TMDB Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.

## Project Structure

```
src/
├── components/       # Reusable UI (Header, Footer, MovieCard, SearchBar, GenreFilter, etc.)
├── context/          # FavoritesProvider and favorites context
├── hooks/            # useFavorites hook
├── pages/            # Home, MovieDetails, Favorites, NotFound
├── services/         # TMDB API helpers (tmdb.js)
├── utils/            # Shared helpers (favorite movie shape, rating format)
├── App.jsx           # Router and layout shell
└── main.jsx          # Application entry point
```

## Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Popular movies, search, and genre filter |
| `/movie/:id` | Movie Details | Single movie from TMDB |
| `/favorites` | Favorites | Saved movies from localStorage |
| `*` | Not Found | Invalid URLs |

## How Favorites Work

- Favorites are stored in React Context via `FavoritesProvider`
- On change, the list is written to `localStorage` under the key `cinetrack_favorites`
- Each saved movie stores: `id`, `title`, `year`, `voteAverage`, `posterUrl`
- Toggle favorites from movie cards or the movie details page
- Invalid or corrupted `localStorage` data is filtered out safely

## Known Limitations

- Search and genre filter are not combined; search takes priority when active
- Only the first page of TMDB results is shown (no pagination)
- TMDB API keys in client-side apps are visible in the browser bundle
- Favorites are stored locally per browser (not synced across devices)
- No user accounts or server-side persistence

## License

This project is for educational and portfolio use.

# CineTrack — AI Development Log

## Prompt 1 — Project Planning
Act as an experienced React frontend developer.

I am building a professional movie discovery web application called CineTrack using React and Vite.

The application should allow users to:

* Browse popular movies
* Search for movies
* View movie details
* Filter movies by genre
* Save movies to a favorites list
* View their favorite movies

The application should have a clean, modern, professional design and work well on mobile, tablet, and desktop.

Before writing any code, create:

1. The main application pages/sections
2. Reusable React components
3. A recommended folder structure
4. The main features
5. How movie data and favorites should be managed

Keep the architecture simple and suitable for a student portfolio project.

Do not write implementation code yet. Only provide the development plan and explain the purpose of the main components.

## AI Response — Development Plan



Checking the workspace for any existing CineTrack setup so the plan fits what's already there.

# CineTrack — Development Plan

A planning blueprint for a React + Vite movie discovery app. Your repo is a fresh Vite scaffold (`react`, `react-dom` only), so this plan assumes you'll add **React Router** and use **The Movie Database (TMDB) API** for data — the standard choice for portfolio movie apps.

---

## 1. Main Application Pages / Sections

| **RoutePagePurpose** |                    |                                                                                         |
| -------------------- | ------------------ | --------------------------------------------------------------------------------------- |
| `/`                  | **Home**           | Landing page with hero, search bar, genre filter, and a grid of popular movies          |
| `/search`            | **Search Results** | Results for the user's query (optional: can live on Home with query params instead)     |
| `/movie/:id`         | **Movie Details**  | Full info for one movie: poster, title, rating, runtime, genres, overview, cast snippet |
| `/favorites`         | **Favorites**      | Movies the user saved locally; empty state when none saved                              |

### Shared layout (wraps all pages)

- **Header** — logo, nav links (Home, Favorites), mobile menu
- **Footer** — attribution (TMDB), optional links
- **Main content area** — page-specific content

### Optional sections (within pages, not separate routes)

- **Hero** (Home) — headline + primary search
- **Genre filter bar** (Home / Search) — horizontal chips or dropdown
- **Loading / error / empty states** — per page as needed

**Routing recommendation:** Use `react-router-dom` with a single `Layout` route and nested child routes. Search can be `/search?q=...` or `/?q=...&genre=...` — query params keep the app simpler than extra routes.

---

## 2. Reusable React Components

### Layout & navigation

| **ComponentPurpose**    |                                       |
| ----------------------- | ------------------------------------- |
| `Layout`                | Shell: Header + `<Outlet />` + Footer |
| `Header`                | Brand, nav, favorites count badge     |
| `NavLink` / `MobileNav` | Responsive navigation                 |
| `Footer`                | Credits and TMDB notice               |

### Movie display

| **ComponentPurpose** |                                                               |
| -------------------- | ------------------------------------------------------------- |
| `MovieCard`          | Poster, title, rating, year; link to details; favorite toggle |
| `MovieGrid`          | Responsive grid of `MovieCard` items                          |
| `MoviePoster`        | Image with fallback placeholder                               |
| `RatingBadge`        | Star/score display (e.g. 7.8/10)                              |
| `GenreTag`           | Single genre pill                                             |
| `GenreFilter`        | Selectable genre list (chips or dropdown)                     |

### Search & filters

| **ComponentPurpose** |                                                |
| -------------------- | ---------------------------------------------- |
| `SearchBar`          | Controlled input, submit, debounced search     |
| `FilterBar`          | Combines search + genre filter for Home/Search |

### Movie details

| **ComponentPurpose** |                                             |
| -------------------- | ------------------------------------------- |
| `MovieHero`          | Large poster + title block on details page  |
| `MovieMeta`          | Release date, runtime, genres               |
| `MovieOverview`      | Synopsis text                               |
| `FavoriteButton`     | Heart/star toggle; used on card and details |

### Feedback & UX

| **ComponentPurpose** |                                                                      |
| -------------------- | -------------------------------------------------------------------- |
| `Loader`             | Spinner or skeleton while fetching                                   |
| `ErrorMessage`       | User-friendly API/network errors + retry                             |
| `EmptyState`         | No results, no favorites, etc.                                       |
| `Button`             | Primary/secondary actions (optional if you prefer plain CSS classes) |

### Design principle

Keep components **presentational** where possible: they receive `movie` objects and callbacks (`onToggleFavorite`) as props. Data fetching stays in pages or custom hooks, not inside `MovieCard`.

---

## 3. Recommended Folder Structure

cinetrack/

├── public/

│   └── favicon.svg

├── src/

│   ├── api/

│   │   ├── tmdb.js              # fetch helpers, base URL, API key usage

│   │   └── endpoints.js         # getPopularMovies, searchMovies, getMovieDetails, getGenres

│   ├── components/

│   │   ├── layout/

│   │   │   ├── Layout.jsx

│   │   │   ├── Header.jsx

│   │   │   └── Footer.jsx

│   │   ├── movie/

│   │   │   ├── MovieCard.jsx

│   │   │   ├── MovieGrid.jsx

│   │   │   ├── MovieHero.jsx

│   │   │   ├── MovieMeta.jsx

│   │   │   ├── MovieOverview\.jsx

│   │   │   ├── MoviePoster.jsx

│   │   │   ├── RatingBadge.jsx

│   │   │   └── FavoriteButton.jsx

│   │   ├── filters/

│   │   │   ├── SearchBar.jsx

│   │   │   └── GenreFilter.jsx

│   │   └── ui/

│   │       ├── Loader.jsx

│   │       ├── ErrorMessage.jsx

│   │       └── EmptyState.jsx

│   ├── context/

│   │   └── FavoritesContext.jsx # favorites state + localStorage sync

│   ├── hooks/

│   │   ├── useMovies.js         # popular + genre filtering

│   │   ├── useSearch.js         # search query + debounce

│   │   ├── useMovieDetails.js   # single movie by id

│   │   └── useFavorites.js      # consume FavoritesContext

│   ├── pages/

│   │   ├── HomePage.jsx

│   │   ├── SearchPage.jsx       # optional if not merged with Home

│   │   ├── MovieDetailsPage.jsx

│   │   └── FavoritesPage.jsx

│   ├── utils/

│   │   ├── constants.js         # genre list cache key, storage keys

│   │   └── formatters.js        # format date, runtime (e.g. "2h 15m")

│   ├── styles/

│   │   ├── variables.css        # colors, spacing, breakpoints

│   │   ├── global.css           # reset, typography, layout utilities

│   │   └── components/          # optional: co-located CSS per component group

│   ├── App.jsx                  # router setup

│   └── main.jsx

├── .env                         # VITE\_TMDB\_API\_KEY (never commit)

├── .env.example

└── package.json

**Why this structure works for a portfolio:**

- Clear separation: **pages** orchestrate, **components** render, **hooks/api** handle logic
- Easy to navigate in interviews (“data layer in `api/`, favorites in `context/`”)
- Scales slightly (add `AboutPage`) without a rewrite

---

## 4. Main Features (Implementation Order)

### Phase 1 — Foundation

1. **Project setup** — React Router, global CSS variables, responsive layout
2. **TMDB integration** — env var for API key, `fetch` wrappers, error handling
3. **Home: popular movies** — grid with loading/error states

### Phase 2 — Discovery

4. **Search** — debounced search, results grid, empty state
5. **Genre filter** — load genre list once; filter popular or search results client-side or via TMDB `with_genres`
6. **Movie details** — dynamic route, fetch by ID, back navigation

### Phase 3 — Favorites & polish

7. **Favorites** — toggle on card/details, persist to `localStorage`, Favorites page
8. **Responsive UI** — mobile nav, touch-friendly cards, readable typography
9. **Polish** — skeleton loaders, 404 for invalid movie ID, accessibility (focus, alt text, keyboard)

### Feature behavior summary

| **FeatureBehavior** |                                                                       |
| ------------------- | --------------------------------------------------------------------- |
| Browse popular      | Default Home load; optional pagination (“Load more”)                  |
| Search              | Min 2 characters; debounce \~300–500 ms                               |
| Movie details       | Route `/movie/:id`; favorite state synced with list                   |
| Genre filter        | Single or multi-select; resets or combines with search via URL params |
| Favorites           | Add/remove; survives refresh; badge count in header                   |
| Responsive          | CSS Grid/Flexbox; breakpoints \~640px / 1024px                        |

---

## 5. Movie Data & Favorites Management

### Movie data (TMDB API)

**Source:** [**The Movie Database API**](https://www.themoviedb.org/settings/api) (free tier, API key required).

**Suggested endpoints:**

- `GET /movie/popular` — Home default list
- `GET /search/movie?query=` — Search
- `GET /movie/{id}` — Details page
- `GET /genre/movie/list` — Genre filter options
- `GET /discover/movie?with_genres=` — Optional: server-side genre filter

**Data flow:**

Page → custom hook (useMovies / useSearch / useMovieDetails)

     → api/tmdb.js

     → TMDB

     ← normalized movie object(s)

     → component state → UI

**Normalized movie shape (store in app, not raw TMDB everywhere):**

{

  id: number,

  title: string,

  posterPath: string | null,

  backdropPath: string | null,

  overview: string,

  releaseDate: string,

  voteAverage: number,

  genreIds: number[],      *// list views*

  genres: { id, name }[],  *// details view*

  runtime: number | null   *// details only*

}

Map TMDB fields once in `api/tmdb.js` so components stay stable if the API response changes.

**Caching (optional, keep simple):**

- In-memory cache in hooks for the current session, or
- `sessionStorage` for genre list (changes rarely)

No Redux needed for a portfolio app.

### Favorites management

**Storage:** `localStorage` key e.g. `cinetrack_favorites` — array of movie IDs or minimal movie objects `{ id, title, posterPath, voteAverage }`.

**State:** React Context (`FavoritesContext`) + `useFavorites` hook.

**Flow:**

1. On app load, read `localStorage` → initialize context
2. `toggleFavorite(movie)` — add/remove by `id`, write back to `localStorage`
3. `isFavorite(id)` — for `FavoriteButton` and card styling
4. Favorites page — map stored IDs to cards (use cached snapshot from toggle, or re-fetch details if you only store IDs)

**Why Context + localStorage:**

- No backend required — good for portfolio/demo
- Teaches global state and persistence
- Easy to explain in README

**Edge cases to plan for:**

- Duplicate adds — guard with `id` check
- Stale posters — storing `{ id, title, posterPath }` on add avoids empty cards
- Private browsing — try/catch around `localStorage`; degrade gracefully (favorites session-only)

### Environment & security

- API key in `.env`: `VITE_TMDB_API_KEY=...`
- Add `.env.example` without the real key
- TMDB keys in client apps are visible in the browser — acceptable for student projects; mention read-only key in README

---

## Architecture Diagram (High Level)

UILogicDataPages: Home, Search, Details, FavoritesReusable ComponentsCustom HooksFavoritesContextapi/tmdb.jslocalStorageTMDB API

---

## Suggested Dependencies (when you implement)

| **PackageRole**            |                               |
| -------------------------- | ----------------------------- |
| `react-router-dom`         | Client-side routing           |
| *(optional)* `react-icons` | Icons for search, heart, menu |

Stick with native `fetch`, CSS Modules or plain CSS, and Context — keeps the stack interview-friendly.

---

## Success Criteria for the Portfolio

- Works on mobile, tablet, and desktop
- Clear loading, error, and empty states
- Favorites persist after refresh
- Clean component boundaries and folder structure
- README with setup steps, env var instructions, and screenshots

---

When you're ready for **Prompt 2**, we can start with Phase 1: routing, layout, TMDB setup, and the Home page with popular movies.


## Review of AI-Generated Plan

## Review of AI-Generated Plan

The AI suggested a detailed architecture for the CineTrack application. I reviewed the suggested structure and decided to simplify it before implementation.

I kept the main features such as movie search, movie details, favorites, TMDB API integration, localStorage, responsive design, and reusable components.

However, I decided not to create too many small components and custom hooks at the beginning because they would add unnecessary complexity for this project. I will create additional components or files only when they are actually needed during development.


Prompt 2 — Project Foundation
## AI Response — Project Foundation

dist/index.html                   0.47 kB │ gzip:  0.31 kB dist/assets/index-Bj72STiF.css    8.54 kB │ gzip:  2.23 kB dist/assets/index-DIOcL57d.js   235.39 kB │ gzip: 75.27 kB  ✓ built in 851ms

\> cinetrack\@0.0.0 lint > oxlint

The CineTrack foundation is in place. The app builds and lints cleanly. Here is what was added and how it fits together.

## Summary

React Router is installed and wired up with a dark, cinema-style layout. Mock movie data powers the Home and Movie Details pages until TMDB is integrated later.

---

## Modified Files

| **FilePurpose**                      |                                                        |
| ------------------------------------ | ------------------------------------------------------ |
| `package.json` / `package-lock.json` | Added `react-router-dom`                               |
| `index.html`                         | Page title set to **CineTrack — Movie Discovery**      |
| `src/App.jsx`                        | Router setup with `Header`, `Footer`, and three routes |
| `src/App.css`                        | App shell layout — flex column, centered main content  |
| `src/index.css`                      | Global dark theme: CSS variables, reset, typography    |

---

## Created Folders & Files

### `src/components/`

| **FilePurpose**                   |                                                                                           |
| --------------------------------- | ----------------------------------------------------------------------------------------- |
| `Header.jsx` + `Header.css`       | Sticky top bar with logo, Home/Favorites links, mobile hamburger menu                     |
| `Footer.jsx` + `Footer.css`       | Footer with app tagline and TMDB placeholder note                                         |
| `MovieCard.jsx` + `MovieCard.css` | Single movie card — poster placeholder, title, rating, year, genre; links to `/movie/:id` |
| `MovieGrid.jsx` + `MovieGrid.css` | Responsive grid (2 → 3 columns) of `MovieCard` components                                 |
| `SearchBar.jsx` + `SearchBar.css` | Search form with input + button; filters mock movies on Home                              |
| `Loader.jsx` + `Loader.css`       | Centered spinner with optional message                                                    |

### `src/pages/`

| **FilePurpose**                         |                                                                                   |
| --------------------------------------- | --------------------------------------------------------------------------------- |
| `Home.jsx` + `Home.css`                 | Hero section, search bar, popular movies grid; brief loading state with mock data |
| `MovieDetails.jsx` + `MovieDetails.css` | Movie detail view from URL `:id`; poster, meta, overview; 404-style empty state   |
| `Favorites.jsx` + `Favorites.css`       | Empty favorites placeholder with link back to Home                                |

### `src/services/`

| **FilePurpose** |                                                                          |
| --------------- | ------------------------------------------------------------------------ |
| `mockMovies.js` | Six placeholder movies + `getMovieById()` helper until TMDB is connected |

### `src/context/`

| **FilePurpose** |                                                            |
| --------------- | ---------------------------------------------------------- |
| `.gitkeep`      | Reserves the folder for favorites context in a later stage |

---

## Routes

| **PathPage** |                                 |
| ------------ | ------------------------------- |
| `/`          | Home — hero, search, movie grid |
| `/movie/:id` | Movie details                   |
| `/favorites` | Favorites (empty state for now) |

---

## Design & Responsiveness

- **Dark theme** — near-black background, elevated cards, gold accent (`#e8b923`)
- **Mobile** — hamburger nav, stacked search field, 2-column movie grid
- **Tablet (640px+)** — inline search bar, 3-column grid
- **Desktop (768px+)** — horizontal nav, side-by-side movie details layout

---

## Try It

npm run dev

Then open Home, click a movie card for details, and use the nav to reach Favorites.

**Next stage:** TMDB API integration, `FavoritesContext`, and a favorite toggle on cards and details.

## My Review of AI Response — Prompt 2

I reviewed the foundation created by the AI by running the application in the browser and checking the main navigation and pages.

The basic structure was working correctly, including the Home, Movie Details, and Favorites routes. The responsive layout and dark movie-style design also provided a good starting point for the application.

The AI initially used mock movie data, which I decided to keep temporarily because real movie data will be added through the TMDB API in the next development stage.

I also reviewed the generated component structure and decided to keep the reusable components that are useful for the project while avoiding unnecessary complexity.

After testing the application, I decided to continue with the existing foundation and move to the TMDB API integration.

# Prompt 3 — TMDB API Integration

Now integrate The Movie Database (TMDB) API into the existing CineTrack application.

Do not redesign the existing application and do not change the overall component structure unless necessary.

Requirements:

1. Create a clean TMDB service in:
   src/services/tmdb.js

2. Use the Vite environment variable:
   VITE_TMDB_API_KEY

3. Add support for:
   - Fetching popular movies
   - Searching movies by title
   - Fetching movie details by ID
   - Fetching movie genres

4. Replace the temporary mock movie data on the Home page with real TMDB popular movie data.

5. Update MovieCard to display:
   - Movie poster
   - Movie title
   - Release year
   - Rating

6. Update MovieDetails to fetch and display the selected movie's real data.

7. Add proper:
   - Loading state
   - Error state
   - Empty search results state

8. Handle movies that do not have a poster by showing a clean fallback.

9. Keep the existing dark CineTrack design.

10. Do not expose the actual API key in source code.

11. Create or update .env.example with:
   VITE_TMDB_API_KEY=your_api_key_here

12. Do not add unnecessary dependencies.

After implementing the changes, explain:
- Which files were changed
- How the TMDB data flows through the application
- How the API key is handled
- How loading and error states work

Do not implement favorites yet.


\<p className="footer\_\_credit">

Movie data will be provided by TMDB in a future update.

This product uses the TMDB API but is not endorsed or certified by TMDB.

\</p>

\*.local

.env

export const mockMovies = [

{

id: 1,

title: 'The Dark Horizon',

 ✓ built in 619ms  > cinetrack\@0.0.0 lint > oxlint

TMDB is integrated. The app builds and lints cleanly. Here is what changed and how it works.

## Files Changed

| **FileChange**                               |                                                                                    |
| -------------------------------------------- | ---------------------------------------------------------------------------------- |
| **`src/services/tmdb.js`** *(new)*           | TMDB API service — fetch helpers, response normalization, poster URL builder       |
| **`.env.example`** *(new)*                   | Documents `VITE_TMDB_API_KEY=your_api_key_here`                                    |
| **`.gitignore`**                             | Added `.env` so the real API key is not committed                                  |
| **`src/pages/Home.jsx`**                     | Loads popular movies from TMDB; search uses TMDB; loading, error, and empty states |
| **`src/pages/Home.css`**                     | Styles for error/empty status blocks and retry button                              |
| **`src/pages/MovieDetails.jsx`**             | Fetches movie by ID on route change; loading, error, and not-found handling        |
| **`src/pages/MovieDetails.css`**             | Poster image styles and fallback rename                                            |
| **`src/components/MovieCard.jsx`**           | Shows real poster, title, year, rating; fallback when poster is missing or fails   |
| **`src/components/MovieCard.css`**           | Image cover styles; removed unused genre pill                                      |
| **`src/components/Footer.jsx`**              | TMDB attribution text                                                              |
| **`src/services/mockMovies.js`** *(deleted)* | Replaced by live TMDB data                                                         |

---

## TMDB Data Flow

Home / MovieDetails

       ↓

  tmdb.js (getPopularMovies, searchMovies, getMovieDetails, getGenres)

       ↓

  fetch → api.themoviedb.org/3/...

       ↓

  normalizeMovie() / normalizeMovieDetails()

       ↓

  Normalized objects → MovieGrid → MovieCard

                    → MovieDetails (direct)

**Normalized movie object (list/card):** `id`, `title`, `posterUrl`, `year`, `voteAverage`, `overview`, etc.

**Normalized details object:** Same fields plus `genres`, `runtime`, `backdropUrl`.

`getGenres()` is exported and ready for a future genre filter — not wired to the UI yet.

---

## API Key Handling

- Stored in **`.env`** as `VITE_TMDB_API_KEY=your_actual_key`
- Read at runtime via `import.meta.env.VITE_TMDB_API_KEY` inside `tmdb.js` only
- Never hardcoded in source files
- `.env` is gitignored; `.env.example` is the template for setup

**Setup:**

1. Copy `.env.example` → `.env`
2. Paste your key from [**TMDB Settings**](https://www.themoviedb.org/settings/api)
3. Restart the dev server (`npm run dev`)

If the key is missing, the app shows a clear error message instead of failing silently.

---

## Loading & Error States

**Home**

- **Loading** — `Loader` on initial load and during search
- **Error** — message + “Try again” button (network/API/key issues)
- **Empty search** — “No movies found for …” + link back to popular movies

**MovieDetails**

- **Loading** — full-page `Loader` while fetching
- **Error** — “Unable to load movie” with the error message
- **Not found** — shown if the fetch returns no usable movie data

**Poster fallback** — if `poster_path` is null or the image fails to load, a gradient placeholder with the movie’s first letter is shown (same dark CineTrack style).

---

Favorites are unchanged. Next step when you’re ready: `FavoritesContext` + toggle on cards and details.

## My Review of AI Response — Prompt 3

I reviewed the TMDB integration and tested the application after the changes were made. The mock movie data was successfully replaced with real movie data from TMDB, and the application continued to build and lint successfully.

The API service was separated into its own file, which keeps the API-related code organized. I also reviewed the loading, error, empty-result, and poster fallback states to make sure the application can handle common problems without showing a broken interface.

The AI used a Vite environment variable for the TMDB API key and added `.env` to `.gitignore`. This is useful for preventing the key from being accidentally committed to the repository. However, I noted that a VITE environment variable is still exposed to the browser in a client-side application, so it should not be treated as a fully secret API key.

I decided to keep the current approach because this is a frontend student project using TMDB's API, while making sure the real key is not committed to GitHub.

The genre API function was also prepared but not connected to the interface yet. I decided to leave it for the next stage rather than adding too many features at once.

Overall, I accepted the TMDB integration after reviewing and testing the generated changes.


# Prompt 4 — Favorites with LocalStorage

Now implement the Favorites feature in the existing CineTrack application.

Do not redesign the existing UI and do not change the TMDB integration unless it is necessary for the favorites feature.

Requirements:

1. Create:
   src/context/FavoritesContext.jsx

2. Use React Context to manage the user's favorite movies across the application.

3. Store favorite movies in localStorage using a clear key such as:
   cinetrack_favorites

4. The favorites state should:
   - Load saved favorites when the application starts
   - Add a movie to favorites
   - Remove a movie from favorites
   - Check whether a movie is already a favorite
   - Remain saved after refreshing the browser

5. Add a favorite button to MovieCard.
   - Show an appropriate heart icon
   - Clearly indicate when a movie is already a favorite
   - Clicking the button should add/remove the movie
   - Clicking the favorite button must not accidentally open the movie details page

6. Add the same favorite functionality to MovieDetails.

7. Update Favorites.jsx so it displays the user's saved movies using the existing MovieCard and MovieGrid components.

8. If there are no favorites, show a friendly empty state with a button/link that takes the user back to Home.

9. Add a favorites count to the Header if it can be done cleanly without making the header crowded.

10. Make sure favorites remain available after a page refresh.

11. Handle localStorage safely so the application does not crash if localStorage is unavailable or contains invalid data.

12. Keep the existing CineTrack dark theme and responsive design.

13. Do not add Redux or any other state management library.

14. Do not add unnecessary dependencies.

After implementation:
- Run the build and lint checks.
- Explain which files were created or modified.
- Explain how the FavoritesContext works.
- Explain how localStorage persistence works.
- Explain any important changes made to MovieCard, MovieDetails, Favorites, or Header.

Do not implement genre filtering yet.

## AI Response 

Verifying the favorites implementation and summarizing what was built per Prompt 4.

> cinetrack@0.0.0 lint
> oxlint

src/context/FavoritesContext.jsx:52:17: warning react(only-export-components): Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.
src/context/FavoritesContext.jsx:119:17: warning react(only-export-components): Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.
Prompt 4 is implemented. Build and lint both pass (two non-blocking Fast Refresh warnings in FavoritesContext.jsx only).

Files Created
File	Purpose
src/context/FavoritesContext.jsx
Global favorites state, localStorage sync, useFavorites hook
src/components/FavoriteButton.jsx
Reusable heart toggle button
src/components/FavoriteButton.css
Heart button styles (card overlay + details variant)
Files Modified
File	Change
src/App.jsx
Wrapped app in FavoritesProvider
src/components/MovieCard.jsx + .css
Heart button overlay; card is position: relative
src/pages/MovieDetails.jsx + .css
“Add to Favorites” / “In Favorites” button below poster
src/pages/Favorites.jsx + .css
Renders saved movies via MovieGrid, or empty state
src/components/Header.jsx + .css
Favorites count badge on nav link
How FavoritesContext Works
FavoritesProvider wraps the app and exposes:

favorites — array of saved movies
favoritesCount — length of that array
isFavorite(id) — checks if a movie is saved
addFavorite(movie) / removeFavorite(id) — explicit add/remove
toggleFavorite(movie) — add or remove in one action
On mount, state initializes from localStorage. When favorites changes, a useEffect writes back to storage. Components use useFavorites() instead of prop drilling.

Each saved movie stores only what the UI needs:

{ id, title, year, voteAverage, posterUrl }
How localStorage Persistence Works
Key: cinetrack_favorites
On load: loadFavoritesFromStorage() reads JSON, validates each item (id + title required), returns [] on failure
On change: saveFavoritesToStorage() writes the array as JSON
Safety: All storage access is wrapped in try/catch. Missing localStorage, invalid JSON, or quota errors fall back gracefully — the app never crashes
Favorites survive page refresh because state is restored from localStorage on startup.

Component Changes
MovieCard — Heart button sits absolutely over the top-right corner, outside the card link. preventDefault() + stopPropagation() on click so it does not navigate to movie details. Active state shows a filled red heart.

MovieDetails — Same FavoriteButton with a text label (“Add to Favorites” / “In Favorites”) below the poster.

Favorites — Reads favorites from context. If empty, shows the existing empty state with “Explore Movies” link. Otherwise renders MovieGrid (which uses MovieCard, so favorites can be toggled off from there too).

Header — Small gold badge next to “Favorites” when count > 0.

Try It
npm run dev
Click hearts on Home movie cards
Open /favorites — saved movies appear
Refresh the browser — favorites remain
Remove favorites from cards or the details page
Genre filtering is not implemented yet, as requested.


## My Review of AI Response
The AI successfully added the genre filtering feature to CineTrack without rebuilding the existing functionality. It reused the existing TMDB service and added genre-based movie discovery.

I reviewed the changes and checked that:

The existing TMDB integration was kept intact.
The existing search feature was preserved.
Genre options are loaded from TMDB.
Users can select a genre and see related movies.
An “All” option returns the popular movie list.
Loading, error, and empty states were included.
The genre buttons are responsive on smaller screens.
The existing Favorites and localStorage functionality was not unnecessarily changed.

I also tested the application after the changes to make sure the new genre filter worked with the existing movie cards and search functionality.


##Manual Improvements / Corrections
After reviewing the AI-generated implementation, I checked the code and made sure that existing features such as Favorites, movie details, and TMDB search were not affected. I also tested the application in the browser and verified the new genre filtering behavior.

Overall, the AI helped me implement the feature faster, while I was responsible for reviewing, testing, and checking that the changes worked correctly with the existing application.

# Prompt 5 — UI/UX Polish and Responsive Improvements
# Prompt 5 — UI/UX Polish and Responsive Improvements

Continue working on the existing CineTrack React + Vite movie application.

First inspect the existing implementation before making changes.

The following features are already implemented and working:
- TMDB API integration
- Popular movies
- Movie search
- Movie details
- Favorites
- FavoritesContext
- localStorage persistence
- Favorites count
- Favorite buttons
- Genre filtering
- Loading, error, and empty states
- React Router

DO NOT rebuild or replace any of these features.

Goal:
Improve the overall UI/UX and responsive behavior of CineTrack so it feels like a polished, professional movie discovery application.

Requirements:

1. Review the current Home page and improve its visual hierarchy.
   - Make the hero section clear and attractive.
   - Keep the existing dark cinema-style theme.
   - Make headings and supporting text easy to read.

2. Improve the movie cards:
   - Keep posters at consistent sizes.
   - Make cards look clean and consistent.
   - Improve hover/focus states.
   - Keep the favorite button easy to access.
   - Make sure long movie titles do not break the layout.

3. Improve the search bar:
   - Make it visually clear that it is the main search feature.
   - Make the input and button easy to use on mobile.
   - Keep the existing search behavior unchanged.

4. Improve the genre filter:
   - Keep the existing functionality.
   - Make selected and unselected genres visually different.
   - Make genre buttons easy to tap on mobile.
   - Prevent horizontal page overflow.

5. Improve responsive behavior:
   - Mobile: approximately 2 movie cards per row where appropriate.
   - Tablet: approximately 3 cards per row.
   - Desktop: 4 or more cards where the screen allows.
   - Movie details should stack properly on small screens.
   - Header navigation and mobile menu should remain usable.

6. Improve accessibility:
   - Add useful alt text to movie posters.
   - Make buttons and links keyboard accessible.
   - Add visible focus states where appropriate.
   - Do not rely only on color to communicate selected states.

7. Improve loading and empty states visually without changing their existing behavior.

8. Check the Header and Footer for spacing, alignment, and responsive issues.

9. Remove obvious unused CSS or duplicated styles if you find any during the review.

10. Do not add unnecessary dependencies.
11. Do not introduce Redux or another state-management library.
12. Do not change the existing API structure.
13. Do not modify the Favorites logic unless a genuine UI bug requires it.

Important:
- Keep the existing CineTrack design direction.
- Do not completely redesign the application.
- Make practical improvements rather than adding unnecessary animations or effects.
- Keep the code simple and readable.

After making the changes:

1. Run:
   npm run build

2. Run:
   npm run lint

3. Fix any errors or warnings caused by your changes.

4. Provide a short summary containing:
   - Files changed
   - Main UI improvements
   - Responsive improvements
   - Accessibility improvements
   - Any manual corrections or refactoring performed

   ## AI Response 

           {!loading && error && (
          <div className="status-panel home__status--error" role="alert">
          <div className="status-panel status-panel--error home__status--error" role="alert">
            <p>{error}</p>
        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
        <nav
          id="main-nav"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen((open) => !open)}
> cinetrack@0.0.0 lint
> oxlint

src/context/FavoritesContext.jsx:52:17: warning react(only-export-components): Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.
src/context/FavoritesContext.jsx:119:17: warning react(only-export-components): Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.
UI/UX polish is complete. Build and lint pass (only the pre-existing FavoritesContext Fast Refresh warnings remain).

Note: Genre filtering is listed in your dev log but is not present in the current codebase (no GenreFilter component or Home integration). No genre filter changes were made to avoid adding new functionality during a polish pass.

Files Changed
File	Changes
src/index.css
Shared .btn-primary, .status-panel, global :focus-visible, overflow-x: hidden, reduced-motion support
src/pages/Home.jsx + Home.css
Hero hierarchy, accent title, shared status/button classes
src/components/SearchBar.jsx + .css
Prominent search container, icon, 44px touch targets
src/components/MovieCard.jsx + .css
Consistent card heights, hover/focus, better alt text
src/components/MovieGrid.css
2 → 3 → 4 column responsive grid
src/components/Loader.css
Card-style loading panel
src/components/Header.jsx + .css
Nav accessibility, active border indicator, 44px tap targets
src/components/Footer.jsx + .css
Inner container, spacing alignment
src/components/FavoriteButton.css
Border + background for active state (not color-only)
src/pages/MovieDetails.jsx + .css
Meta pills, improved poster alt text, status panel styling
src/pages/Favorites.jsx + .css
Shared status/button styles, section title divider
Main UI Improvements
Hero — gradient panel, gold accent on “Favorite Film”, clearer subtitle sizing
Search — elevated container with shadow; search icon on tablet/desktop
Cards — equal-height layout, consistent posters, cleaner hover lift
States — unified card-style panels for loading, empty, and error views
Details — metadata shown as readable pills instead of plain text
Footer — content aligned to app max-width
Responsive Improvements
Mobile: 2-column grid, stacked search input/button, full-width touch targets
Tablet (640px+): 3-column grid, inline search field
Desktop (1024px+): 4-column grid
Movie details — stacks on small screens, side-by-side from 768px
Header — mobile menu with shadow; desktop horizontal nav unchanged
overflow-x: hidden on body to prevent horizontal scroll
Accessibility Improvements
Global :focus-visible outlines on interactive elements
Descriptive poster alt text — e.g. Inception (2010) movie poster
Card links — aria-label for screen readers; title on truncated titles
Rating — aria-label with score context
Active nav links — border + font-weight, not color alone
Favorite button — border/background when active; aria-pressed preserved
Header — aria-controls, aria-label on nav, 44px minimum tap targets
Refactoring Performed
Extracted shared .btn-primary and .status-panel to remove duplicated button/empty-state CSS from Home and Favorites
Removed unused --color-danger variable (replaced with --color-error used in error states)
Fixed invalid composes syntax that was briefly introduced in Home.css (plain CSS project, not CSS Modules)
Run npm run dev to preview the polished layout. If you want genre filter styling next, that feature would need to be added to the codebase first.

##My Review of AI Response — Prompt 5
The AI improved the overall UI and UX of the CineTrack application without changing the existing core functionality. The updated design has a clearer hero section, improved search bar, better movie cards, stronger visual hierarchy, and a more polished desktop layout.

I reviewed the changes in the browser and checked the main parts of the application. The existing TMDB search, movie cards, favorites, and navigation continued to work after the UI improvements.

The AI also improved responsive behavior, button states, spacing, and accessibility-related details such as image alt text and keyboard focus.

##Manual review and improvements:
After reviewing the AI-generated changes, I checked the layout visually and verified that the movie grid, search area, navigation, and favorite buttons were still usable. I also checked that the new styling did not interfere with the existing application functionality.

Overall, AI helped improve the visual quality and responsiveness of the application, while I reviewed the generated changes and tested the result before accepting them.

# Prompt 6 — Final Testing, Bug Fixes, Accessibility and Code Cleanup

Continue working on the existing CineTrack React + Vite application.

Before making any changes, inspect the current implementation.

The application already includes:

- TMDB API integration
- Popular movies
- Movie search
- Movie details
- Favorites
- FavoritesContext
- localStorage persistence
- Favorites count
- Favorite buttons
- Genre filtering
- Loading states
- Error states
- Empty states
- Responsive UI improvements
- Dark cinema-style design

Do NOT add a new major feature.

Goal:
Perform a final quality check of the existing application and fix genuine issues found during the review.

1. Test the main user flows:

   Home:
   - Popular movies load correctly.
   - Movie cards display correctly.
   - Search works.
   - Genre filter works.
   - "All" returns to popular movies.

   Movie Details:
   - Clicking a movie opens the correct details page.
   - Poster, title, rating, release year, runtime, genres and overview display correctly.
   - Favorite button works.

   Favorites:
   - Movies can be added and removed.
   - Favorites remain after refreshing the page.
   - Favorites count updates correctly.
   - Empty favorites state works.

   Navigation:
   - Home link works.
   - Favorites link works.
   - Browser back/forward navigation does not cause errors.

2. Check error handling:
   - Missing/invalid API key should show a useful message.
   - Failed API requests should not crash the application.
   - Empty search results should show a clear message.
   - Invalid movie IDs should show a proper not-found state.

3. Check responsive behavior:
   - Mobile
   - Tablet
   - Desktop

   Make sure:
   - No horizontal page scrolling is caused by the application.
   - Movie cards fit properly.
   - Search bar remains usable.
   - Genre buttons do not overflow.
   - Header/navigation remains usable.
   - Movie details stack correctly on small screens.

4. Check accessibility:
   - Images have meaningful alt text.
   - Buttons have clear accessible labels where needed.
   - Interactive elements can receive keyboard focus.
   - Focus states are visible.
   - Color contrast is reasonable.
   - Do not use color alone to communicate important states.

5. Check React/code quality:
   - Look for unnecessary duplicated code.
   - Look for unused imports.
   - Look for unused variables.
   - Look for obvious unnecessary CSS.
   - Check useEffect dependencies.
   - Check for possible console errors.
   - Avoid unnecessary refactoring.

6. Do not change working functionality just for the sake of changing it.

7. Do not add new dependencies unless absolutely necessary.

8. Do not introduce Redux or another state-management library.

9. Keep the existing CineTrack visual design.

10. If you find a genuine bug, fix it and briefly explain:
   - What the problem was.
   - Why it happened.
   - How it was fixed.

11. Run:

   npm run build

   npm run lint

12. Fix any build or lint errors caused by the changes.

13. At the end, provide a concise final report containing:

   - Tests performed
   - Bugs found and fixed
   - Accessibility improvements
   - Code cleanup performed
   - Build result
   - Lint result
   - Any issues that intentionally remain


##AI Reponse

import { createContext } from 'react'
export const FavoritesContext = createContext(null)
import { createContext } from 'react'
export const FavoritesContext = createContext(null)
import { toFavoriteMovie } from '../utils/favoriteMovie'
import { FavoritesContext } from './favoritesContext'
import { FavoritesContext } from './favorites-context'
import { useContext } from 'react'
import { FavoritesContext } from '../context/favoritesContext'
import { FavoritesContext } from '../context/favorites-context'

✓ built in 574ms

> cinetrack@0.0.0 lint
> oxlint
Final Quality Report — CineTrack
Tests Performed
Reviewed all source files and verified behavior through code-path analysis and successful production build:

Area	Checked
Home
Popular movies load, search, empty/error states, card rendering
Movie Details
Route params, poster/meta display, favorites toggle, 404 handling
Favorites
Add/remove, localStorage persistence, count badge, empty state
Navigation
Home/Favorites links, catch-all route, browser history (no state leaks in effects)
Errors
Missing API key, failed requests, empty search, invalid movie IDs
Responsive
Grid breakpoints, header mobile menu, details stacking, overflow-x: hidden
Accessibility
Alt text, focus states, ARIA labels, non-color-only active states
Code quality
Imports, hooks deps, duplicated logic, lint rules
Bugs Found and Fixed
Bug	Cause	Fix
Invalid movie IDs showed “Unable to load movie”
TMDB 404 threw a generic error
Added NOT_FOUND_ERROR; details page now shows a proper Movie not found state
Search input stayed filled after “Back to popular movies”
SearchBar kept its own state
Synced input with submittedQuery from Home
Possible crash on voteAverage.toFixed()
Corrupt/missing rating in stored favorites
Added safe formatRating() helper
Generic API error messages
All failures returned status-only text
Specific messages for missing key, invalid key (401), network errors
Blank page on unknown URLs
No catch-all route
Added NotFound page at *
isFavorite could fail silently
String vs number ID mismatch
Compare IDs with String() coercion
Build failure after lint refactor
favoritesContext.js collided with FavoritesContext.jsx on Windows
Renamed to favorites-context.js
Accessibility Improvements
Loader — added aria-busy="true" for screen readers
Header Favorites link — aria-label includes count (e.g. “Favorites, 3 saved”); badge marked aria-hidden
Favorite button — fallback label when title is missing
Movie details error/not-found — consistent btn-primary back links with visible focus
Existing — poster alt text, :focus-visible outlines, active nav/favorite borders retained
Code Cleanup Performed
Extracted toFavoriteMovie and formatRating → src/utils/favoriteMovie.js
Moved useFavorites → src/hooks/useFavorites.js
Split context object → src/context/favorites-context.js (Provider stays in FavoritesContext.jsx)
Consolidated duplicate back-link styles
Fixed React import order in MovieDetails.jsx
Lint: all warnings resolved (0 warnings)
Build Result
✓ built in 574ms — 52 modules, no errors
Lint Result
oxlint — 0 errors, 0 warnings
Issues That Intentionally Remain
Genre filtering — Listed in your dev log as implemented, but not present in the current codebase (no GenreFilter component or Home integration). Not added here to avoid introducing a new feature during QA.

getGenres() in tmdb.js — Exported but unused until genre filtering is built.

TMDB API key visibility — Client-side keys are always visible in the browser; acceptable for this portfolio setup.

No pagination — Popular/search results show the first TMDB page only (existing behavior, unchanged).

Run npm run dev to manually verify favorites persistence and search reset in the browser. If you want genre filtering next, that would be a separate implementation step.

##Review of AI Response — Prompt 6

The AI response was strong overall. It reviewed the existing CineTrack application instead of rebuilding it and checked the main features, including movie search, movie details, favorites, navigation, error handling, responsiveness, accessibility, and code quality.

It also identified and fixed several issues, such as invalid movie ID handling, search state problems, unsafe rating formatting, missing 404 handling, ID type mismatches, and duplicate context files. The response also confirmed that the application builds successfully and passes linting with 0 errors and 0 warnings.

One useful part of the review was that it clearly identified features that were still incomplete. In particular, genre filtering was not actually implemented, even though the API function for genres already existed. It also noted that pagination was not included and that the TMDB API key is visible on the client side, which is expected for this type of student project.

Overall, the response was useful because it did more than simply say the application was working. It checked the code for possible problems, made corrections, and pointed out what still needed to be improved.


##Prompt 7 — Genre Filter & Final Discovery Improvements
Continue developing CineTrack from its current state.

Do not rebuild or replace the existing features. Keep the current TMDB integration, movie search, favorites, movie details, routing, responsive design, error handling, and accessibility improvements.

The previous quality review identified that genre filtering is still missing. The existing tmdb.js already has a getGenres() function, so now implement the genre filtering feature properly.

Requirements:

1. Fetch the available movie genres from TMDB using the existing getGenres() service.

2. Create a reusable GenreFilter component.

3. Display the genre options below the search bar on the Home page.

4. Include an "All" option that clears the selected genre and returns to the popular movies.

5. When a genre is selected, fetch movies from TMDB that belong to that genre.

6. Keep the existing movie search functionality working correctly.

7. If a user searches for a movie, search results should continue to work normally.

8. Make sure genre selection and search do not break the existing favorites functionality.

9. Show proper loading, error, and empty states while genres or movies are being loaded.

10. Make the selected genre visually obvious.

11. Make the genre filter responsive:
    - On mobile, allow horizontal scrolling or wrapping.
    - On desktop, display the genres neatly with consistent spacing.

12. Add proper accessibility:
    - Keyboard navigation
    - Visible focus states
    - Appropriate ARIA attributes where needed
    - Do not rely only on color to show the selected genre

13. Reuse the existing TMDB service functions instead of duplicating API/fetch logic.

14. Keep the current dark CineTrack design and gold accent style.

15. Do not add Redux or unnecessary dependencies.

16. Keep the code clean and reusable.

17. Make sure clicking a movie after filtering still opens the correct Movie Details page.

18. Make sure favorite buttons still work correctly on filtered movie cards.

After implementation:

- Run npm run build
- Run npm run lint
- Check the application for broken imports or duplicated logic.
- Fix any issues you find.

Finally, give me a concise report containing:

1. Files created or modified
2. How the genre filter works
3. Bugs or issues found and fixed
4. Build result
5. Lint result
6. Any remaining limitations

##AI Reponse
Fixing genre selection display during search and moving movie-fetch orchestration into the TMDB service.

export async function getMovies({ query = '', genreId = null } = {}) {
  const activeQuery = query.trim()
import Loader from '../components/Loader'
import {
  getGenres,
  getMoviesByGenre,

✓ built in 527ms

> cinetrack@0.0.0 lint
> oxlint
Genre Filtering — Implementation Report
1. Files Created or Modified
File	Change
src/components/GenreFilter.jsx (new)
Reusable genre filter with All + genre buttons
src/components/GenreFilter.css (new)
Dark theme styling, scroll/wrap, active states
src/services/tmdb.js
Added getMoviesByGenre() and getMovies() orchestrator
src/pages/Home.jsx
Genre loading, filter integration, updated states/titles
2. How the Genre Filter Works
Home loads genres (getGenres) + popular movies on mount
         ↓
GenreFilter renders "All" + TMDB genre buttons
         ↓
User selects genre → getMovies({ genreId }) → /discover/movie?with_genres=
User selects "All"  → getMovies({})         → /movie/popular
User searches       → getMovies({ query })   → /search/movie (genre ignored while searching)
         ↓
Results → MovieGrid → MovieCard (details + favorites unchanged)
Behavior:

All — clears genre, clears search, loads popular movies
Genre — clears search, loads movies for that genre
Search — takes priority over genre; selected genre stays visible but does not filter search results
Clear search — returns to the previously selected genre, or popular if none
3. Bugs or Issues Found and Fixed
Issue	Fix
Genre appeared deselected during search (initial draft)
Always pass selectedGenreId to GenreFilter so selection persists
Movie-fetch logic duplicated in Home
Moved orchestration to getMovies() in tmdb.js
No broken imports or duplicate fetch logic found after review.

4. Build Result
✓ built in 527ms — 54 modules, no errors
5. Lint Result
oxlint — 0 errors, 0 warnings
6. Remaining Limitations
Search + genre are not combined — search OR genre OR popular (not both at once)
First page only — no pagination for popular, genre, or search results
Genre selection during search — visually selected but inactive until search is cleared
TMDB discover defaults — genre results use TMDB’s default sorting (popularity)
Run npm run dev to test: select a genre, click All, search for a title, and confirm favorites still work on filtered cards.

##Review of AI Response — Prompt 7

The AI successfully implemented the missing genre filtering feature without rebuilding the existing CineTrack functionality. It created a reusable GenreFilter component and connected it to the existing TMDB service.

The main improvements include:

Added a reusable GenreFilter component.
Added All + genre selection.
Connected genre selection to TMDB's movie discovery endpoint.
Kept the existing search functionality working.
Kept Favorites and Movie Details working with filtered movies.
Moved movie-fetching logic into the TMDB service instead of keeping duplicate API logic inside the Home page.
Added responsive styling for the genre filter.
Fixed an issue where the selected genre was not displayed correctly while searching.
Verified that the project builds successfully.
Verified 0 lint errors and 0 warnings.
Manual Review

I reviewed the AI-generated implementation and checked that the new genre filter did not interfere with the existing search, Favorites, or movie details features. I also reviewed the way the AI organized the API logic and kept the movie-fetching code inside the existing TMDB service.

The AI also clearly documented the remaining limitations, such as the lack of pagination and the fact that search and genre filtering are not combined.

# Prompt 8 — Final Submission Preparation and Documentation

This is the final stage of the CineTrack project.

Do not add any new major features.

First inspect the complete current project and understand the existing implementation.

The application currently includes:

- React + Vite
- React Router
- TMDB API integration
- Popular movies
- Movie search
- Movie details
- Genre filtering
- Favorites
- Favorites persistence using localStorage
- Favorites count
- Loading states
- Error states
- Empty states
- Responsive design
- Accessibility improvements
- Dark cinema-style UI

IMPORTANT:

Do not rebuild existing features.
Do not change working functionality unnecessarily.
Do not introduce new dependencies unless absolutely required.

## 1. Final Code Review

Review the complete source code for:

- Broken imports
- Unused imports
- Unused variables
- Duplicate components
- Duplicate context files
- Duplicate API logic
- Obvious unnecessary CSS
- Incorrect React hooks usage
- Console errors
- Incorrect file references
- Potential runtime errors

Pay special attention to the Favorites context because it was previously affected by duplicate/renamed context files.

Make sure there is only one clear source of truth for FavoritesContext and FavoritesProvider.

## 2. Final Feature Testing

Check these user flows:

### Home
- Popular movies load.
- Search works.
- Genre filter works.
- All button returns to popular movies.
- Movie cards display correctly.

### Search
- Search results display correctly.
- Empty search results show a useful message.
- Clearing search works correctly.

### Genre
- Genres load from TMDB.
- Selecting a genre updates the movie list.
- Selected genre is visually clear.
- All resets the genre.
- Genre filter works on mobile.

### Movie Details
- Correct movie opens from a movie card.
- Movie information displays correctly.
- Favorite button works.

### Favorites
- Movie can be added to favorites.
- Movie can be removed.
- Favorites count updates.
- Favorites remain after refresh.
- Empty favorites state works.

### Navigation
- Home works.
- Favorites works.
- Movie detail routes work.
- Invalid routes show an appropriate page.

## 3. Responsive Check

Review the application at:

- Mobile
- Tablet
- Desktop

Make sure there is no unwanted horizontal overflow and that all important controls remain usable.

## 4. Accessibility Check

Verify:

- Movie images have useful alt text.
- Buttons have accessible labels.
- Keyboard focus is visible.
- Interactive elements are keyboard accessible.
- Selected genre state is not communicated only through color.
- Navigation is usable with keyboard controls.

## 5. Build and Lint

Run:

npm run build

npm run lint

Fix any genuine errors or warnings.

Do not hide warnings just to make the output clean.

## 6. README

Create or update README.md so it clearly explains:

- Project name: CineTrack
- What the application does
- Main features
- Technologies used
- How to install and run the project
- How to configure the TMDB API key
- Environment variable name
- Important note that .env should not be committed
- TMDB attribution
- Project structure overview
- Main routes
- How favorites work
- Known limitations

Do not include the actual TMDB API key anywhere in the README.

## 7. AI Development Documentation

Create a file:

AI-DEVELOPMENT-LOG.md

Document the AI-assisted development process.

Include:

### Prompt 1
Project planning and architecture.

### Prompt 2
React foundation, routing, layout, pages, and mock movie data.

### Prompt 3
TMDB API integration, movie search, movie details, loading and error states.

### Prompt 4
UI/UX and discovery improvements that were implemented at that stage.

### Prompt 5
UI/UX polish and responsive improvements.

### Prompt 6
Final quality review, bug fixing, accessibility, and code cleanup.

### Prompt 7
Genre filtering implementation.

### Prompt 8
Final testing and submission preparation.

For each prompt include:

- What was requested
- How AI assisted
- What was reviewed manually
- Any corrections or improvements made afterward

Be honest about which work was generated by AI and which changes were manually reviewed or corrected.

## 8. Manual Improvements Section

Add a separate section explaining examples of manual review/corrections.

Use actual examples from this project, including:

- Testing Favorites persistence after refreshing the browser.
- Checking that search and movie details continued working.
- Identifying the missing genre filtering feature during quality review.
- Identifying the Favorites context/file naming issue that caused the blank page.
- Reviewing AI-generated changes instead of blindly accepting them.
- Testing the final application in the browser.

Do not claim that a manual change was made if it was not actually made.

## 9. Final Project Summary

At the end of AI-DEVELOPMENT-LOG.md include:

- Final feature list
- Technology stack
- AI tools used
- Examples of AI assistance
- Examples of human review
- Final build result
- Final lint result
- Known limitations

## 10. Final Report

After completing the work, provide a concise report containing:

1. Files created or modified
2. Final features
3. Bugs fixed
4. Accessibility improvements
5. Manual improvements/review performed
6. Build result
7. Lint result
8. Remaining limitations
9. Confirmation that the project is ready for submission

Do not make unnecessary visual or architectural changes during this final stage.

##AI Reponse
            {favoritesCount > 0 && (
              <span className="header__badge" aria-label={`${favoritesCount} favorites`}>
              <span className="header__badge" aria-hidden="true">
                {favoritesCount}
# React + Vite
# CineTrack
This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.
# CineTrack — AI Development Log
This document records the AI-assisted development of CineTrack. It describes what was requested at each stage, how AI tools helped, what was reviewed manually, and what corrections were made afterward.

✓ built in 628ms

> cinetrack@0.0.0 lint
> oxlint
Final Submission Report — CineTrack
1. Files Created or Modified
File	Action
README.md
Replaced Vite template with full project documentation
AI-DEVELOPMENT-LOG.md
Created — full AI-assisted development record
src/components/MovieGrid.jsx
Default movies = [] guard
src/components/Header.jsx
Badge aria-hidden (removed duplicate label)
Favorites context (verified single source of truth):

src/context/favoritesCtx.js — FavoritesContext only
src/context/FavoritesProvider.jsx — FavoritesProvider only
src/hooks/useFavorites.js — consumes context
No duplicate FavoritesContext.jsx, favorites-context.js, or mockMovies.js remain.

2. Final Features
TMDB popular movies, search, genre filter (All resets to popular)
Movie details (poster, rating, year, runtime, genres, overview)
Favorites with localStorage + header count
Loading, error, and empty states
Responsive dark UI + accessibility improvements
404 page for invalid routes; not-found for invalid movie IDs
3. Bugs Fixed (This Stage + Prior)
Bug	Fix
Blank page (Windows)
FavoritesContext import resolved to wrong file → renamed to favoritesCtx.js + FavoritesProvider.jsx
Duplicate header aria-label
Badge uses aria-hidden; count on parent link
MovieGrid crash risk
Default empty movies array
4. Accessibility Improvements (Verified)
Poster alt text with title and year
:focus-visible outlines globally
Genre buttons use aria-pressed + border (not color alone)
Favorite buttons: aria-label, aria-pressed
Loader: aria-busy, role="status"
Keyboard-accessible nav and mobile menu
5. Manual Review Performed
Confirmed one favorites context path (favoritesCtx.js + FavoritesProvider.jsx)
Code-path review of Home search ↔ genre ↔ favorites flows
Build and lint run successfully
Documented real issues (blank page, missing genre, persistence testing) in AI-DEVELOPMENT-LOG.md
6. Build Result
✓ built in 628ms — 54 modules, no errors
7. Lint Result
oxlint — 0 errors, 0 warnings
8. Remaining Limitations
Search and genre are not combined (search wins when active)
No pagination (first TMDB page only)
API key visible in client bundle (normal for Vite)
Favorites are browser-local only
9. Submission Readiness
Yes — the project is ready for submission.

Before submitting:

Copy .env.example → .env and add your TMDB key (do not commit .env)
Run npm run dev and smoke-test Home, search, genres, details, favorites
If the page is blank, stop old dev servers and restart npm run dev
See README.md for setup and AI-DEVELOPMENT-LOG.md for the full development narrative.

My Review of AI Response — Prompt 8
The AI completed the final review and preparation of the CineTrack application. It reviewed the existing codebase, removed duplicate context files, fixed the Favorites context issue that had previously caused a blank page, and made small accessibility and stability improvements.

The AI also updated the README and created an AI Development Log documenting the prompts, AI assistance, manual review, and corrections performed throughout development.

I reviewed the final changes and verified that the important application flows remained intact, including movie search, genre filtering, movie details, Favorites, and localStorage persistence.

The final project successfully passed the production build and lint checks with 0 errors and 0 warnings.

The final review also identified the remaining limitations honestly, such as no pagination, search and genre filtering not being combined, and Favorites being stored locally in the browser.

Overall, the AI was useful throughout the development process, but I still had to review the generated code, test the application, identify issues, and make sure the final implementation met the assignment requirements.
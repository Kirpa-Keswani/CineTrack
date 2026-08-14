# CineTrack — AI Development Log

This document records the AI-assisted development of CineTrack. It describes what was requested at each stage, how AI tools helped, what was reviewed manually, and what corrections were made afterward.

**Honest note:** Most implementation code was generated with AI assistance (Cursor). A human developer reviewed, tested, and corrected the output at each stage rather than accepting it blindly.

---

## Prompt 1 — Project Planning and Architecture

### What was requested

- Plan pages, components, folder structure, features, and data management
- No implementation code yet
- Simple architecture suitable for a student portfolio

### How AI assisted

- Produced a development plan: routes (`/`, `/movie/:id`, `/favorites`), component list, folder structure, TMDB data flow, and favorites strategy with Context + `localStorage`
- Recommended React Router, no Redux, and phased implementation order

### Manual review

- Confirmed the plan matched assignment goals (discovery, search, details, favorites, responsive UI)
- Used the plan as the blueprint for Prompt 2 onward

### Corrections afterward

- None at planning stage; structure was followed in later prompts

---

## Prompt 2 — React Foundation, Routing, and Layout

### What was requested

- Install React Router
- Create folders: `components`, `pages`, `services`, `context`
- Build Header, Footer, MovieCard, MovieGrid, SearchBar, Loader
- Pages: Home, MovieDetails, Favorites
- Routes and dark responsive layout
- Mock data only (no TMDB yet)

### How AI assisted

- Scaffolded the Vite project structure, routing, layout shell, and placeholder movie UI
- Added mock movies in `services/mockMovies.js` for early UI testing

### Manual review

- Verified routes and navigation in the browser
- Checked responsive layout on different screen widths

### Corrections afterward

- Mock data was later removed when TMDB integration replaced it (Prompt 3)

---

## Prompt 3 — TMDB API Integration

### What was requested

- `src/services/tmdb.js` with popular movies, search, details, genres
- Environment variable `VITE_TMDB_API_KEY`
- Replace mock data on Home
- Loading, error, empty states; poster fallbacks
- `.env.example`; no API key in source

### How AI assisted

- Created `tmdb.js` with fetch helpers, response normalization, and poster URL builder
- Updated Home, MovieCard, and MovieDetails to use live TMDB data
- Added error handling and `.gitignore` entry for `.env`

### Manual review

- Created `.env` with a personal TMDB API key
- Tested popular movies, search, and movie detail pages
- Confirmed error message when API key is missing

### Corrections afterward

- Improved API error messages (401 invalid key, network errors) during Prompt 6 quality review
- Added `NOT_FOUND` handling for invalid movie IDs

---

## Prompt 4 — Favorites with localStorage

### What was requested

- `FavoritesContext`, heart buttons on cards and details, Favorites page with grid
- `localStorage` key `cinetrack_favorites`
- Header favorites count
- Safe storage handling; no Redux

### How AI assisted

- Implemented `FavoritesProvider`, `FavoriteButton`, and `useFavorites` hook
- Wired favorites into MovieCard, MovieDetails, Favorites page, and Header badge
- Added validation for corrupted `localStorage` data

### Manual review

- Tested add/remove favorites on cards and details page
- Refreshed browser to confirm persistence
- Verified favorites count updates in header

### Corrections afterward

- Split `toFavoriteMovie` into `utils/favoriteMovie.js` during Prompt 6 cleanup
- Fixed `isFavorite` ID comparison (`String()` coercion) for reliability
- Later renamed context files to fix Windows import collision (see Manual Improvements)

---

## Prompt 5 — UI/UX Polish and Responsive Improvements

### What was requested

- Improve hero, cards, search bar, loading/empty states
- Responsive grid (2 / 3 / 4 columns)
- Accessibility: focus states, alt text, non-color-only selected states
- No new major features

### How AI assisted

- Enhanced Home hero with gradient panel and accent typography
- Improved SearchBar container, card hover/focus, shared `.btn-primary` and `.status-panel` classes
- Updated grid breakpoints and movie details meta pills
- Added global `:focus-visible` and `prefers-reduced-motion` support

### Manual review

- Checked layout on mobile, tablet, and desktop
- Verified keyboard focus visibility on links and buttons

### Corrections afterward

- Genre filter styling was added in Prompt 7 (genre was not in codebase during Prompt 5)

---

## Prompt 6 — Final Quality Review, Bug Fixes, and Code Cleanup

### What was requested

- Test all user flows; fix genuine bugs
- Review accessibility, hooks, duplicate code
- Run build and lint
- Do not add major features

### How AI assisted

- Improved TMDB error handling and movie-not-found states
- Synced SearchBar with parent when clearing search
- Added `formatRating()` safety for missing vote averages
- Added `NotFound` route for invalid URLs
- Split favorites hook/context files for lint cleanliness

### Manual review

- Ran `npm run build` and `npm run lint`
- Identified that **genre filtering was still missing** from the codebase despite being planned
- Tested invalid movie URLs and empty search results

### Corrections afterward

- Renamed context files to avoid Windows module resolution bug (see below)
- Genre filtering implemented in Prompt 7

---

## Prompt 7 — Genre Filtering Implementation

### What was requested

- Reusable `GenreFilter` component below search on Home
- Fetch genres via existing `getGenres()`
- **All** returns to popular movies; genre selection fetches discover API results
- Search must still work; favorites unchanged
- Loading/error/empty states; responsive and accessible genre buttons

### How AI assisted

- Added `getMoviesByGenre()` and `getMovies()` orchestrator in `tmdb.js`
- Created `GenreFilter.jsx` with horizontal scroll on mobile, wrap on desktop
- Integrated genre state into Home alongside search

### Manual review

- Tested genre selection, All button, and search priority
- Verified favorite buttons still work on filtered cards
- Confirmed movie details open correctly from filtered results

### Corrections afterward

- Fixed blank-page issue caused by duplicate context file naming on Windows (Prompt 8)

---

## Prompt 8 — Final Submission Preparation

### What was requested

- Final code review and testing
- README and AI development documentation
- Build and lint verification
- No unnecessary feature or design changes

### How AI assisted

- Reviewed imports, context structure, and duplicate files
- Updated README with setup, TMDB configuration, structure, routes, and limitations
- Produced this development log
- Minor fixes: `MovieGrid` default prop, header badge `aria-hidden`

### Manual review

- Confirmed single favorites source of truth: `favoritesCtx.js` + `FavoritesProvider.jsx`
- Final build and lint pass
- Browser smoke test of main flows

### Corrections afterward

- Documentation consolidated for submission

---

## Manual Improvements and Corrections

Examples of human review and fixes during this project:

### 1. Favorites persistence testing

After AI implemented favorites, the app was tested by adding movies, refreshing the browser, and confirming the list and header count remained correct.

### 2. Search and movie details regression checks

After each major change (TMDB, favorites, genre filter), search and `/movie/:id` routes were retested to ensure existing behavior was not broken.

### 3. Missing genre filtering identified during quality review

Prompt 6 review found genre filtering was documented in planning but not yet implemented. Prompt 7 added it without rebuilding other features.

### 4. Blank page — Favorites context file naming (Windows)

**Problem:** The app showed a blank page in the browser.

**Cause:** On Windows, importing `./context/FavoritesContext` resolved to `favorites-context.js` (context object only) instead of `FavoritesProvider.jsx`. `FavoritesProvider` was `undefined`, causing React to crash on render.

**Fix:** Renamed files to remove ambiguity:

- `favoritesCtx.js` — exports `FavoritesContext` only
- `FavoritesProvider.jsx` — exports `FavoritesProvider` only
- `App.jsx` imports from `./context/FavoritesProvider` explicitly

### 5. Reviewing AI output instead of blind acceptance

- Invalid CSS `composes` syntax was caught and removed during UI polish (plain CSS project, not CSS Modules)
- Duplicate `aria-label` on header badge was corrected (`aria-hidden` on badge, label on parent link)
- Stale dev server on port 5173 was identified as serving broken module resolution; restarting dev server resolved cached issues

### 6. Final browser testing

Before submission: popular movies, search, genre filter, favorites add/remove, refresh persistence, movie details, and invalid routes were checked manually.

---

## Final Project Summary

### Final feature list

- React + Vite application with React Router
- TMDB popular movies, search, and genre filtering
- Movie details page with poster, meta, and overview
- Favorites with Context + `localStorage` persistence
- Loading, error, and empty states
- Responsive dark UI with accessibility improvements
- 404 / not-found handling for bad routes and movie IDs

### Technology stack

| Layer | Technology |
|-------|------------|
| UI | React 19 |
| Build | Vite 8 |
| Routing | React Router 7 |
| Data | TMDB REST API |
| State | React Context + `localStorage` |
| Styling | CSS (component files + global tokens) |
| Lint | Oxlint |

### AI tools used

- **Cursor** (AI coding assistant) for planning, implementation, debugging, and documentation drafts

### Examples of AI assistance

- Initial architecture and folder structure planning
- Component and page scaffolding
- TMDB service layer and normalization
- Favorites Context and `localStorage` sync
- Genre filter component and Home integration
- README and development log drafting
- Diagnosing Windows import collision for blank page

### Examples of human review

- Creating and securing `.env` with TMDB API key
- Browser testing after each prompt
- Identifying missing genre feature before Prompt 7
- Fixing context file naming for Windows compatibility
- Verifying build/lint and submission readiness

### Final build result

```
npm run build — ✓ success (54 modules, no errors)
```

### Final lint result

```
npm run lint (oxlint) — ✓ 0 errors, 0 warnings
```

### Known limitations

- Search and genre filter are not combined simultaneously
- No pagination (first TMDB page only)
- Client-side API key visibility (standard for Vite env vars)
- Favorites are local to one browser/device
- No authentication or backend

---

## Submission readiness

The project builds cleanly, passes lint, has complete README and environment setup instructions, and core user flows have been reviewed. CineTrack is ready for portfolio submission.

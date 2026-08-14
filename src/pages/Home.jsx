import { useCallback, useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import GenreFilter from '../components/GenreFilter'
import MovieGrid from '../components/MovieGrid'
import Loader from '../components/Loader'
import { getGenres, getMovies } from '../services/tmdb'
import './Home.css'

function Home() {
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [genresLoading, setGenresLoading] = useState(true)
  const [error, setError] = useState(null)
  const [genresError, setGenresError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenreId, setSelectedGenreId] = useState(null)

  const isSearching = Boolean(searchQuery.trim())
  const selectedGenre = genres.find((genre) => genre.id === selectedGenreId)

  const loadMovies = useCallback(async (query, genreId) => {
    setLoading(true)
    setError(null)

    try {
      const results = await getMovies({ query, genreId })
      setMovies(results)
      setSearchQuery(query.trim())
      setSelectedGenreId(genreId)
    } catch (err) {
      setMovies([])
      setError(err.message || 'Something went wrong while loading movies.')
    } finally {
      setLoading(false)
    }
  }, [])

  const loadGenres = useCallback(async () => {
    setGenresLoading(true)
    setGenresError(null)

    try {
      const results = await getGenres()
      setGenres(results.sort((a, b) => a.name.localeCompare(b.name)))
    } catch (err) {
      setGenresError(err.message || 'Something went wrong while loading genres.')
    } finally {
      setGenresLoading(false)
    }
  }, [])

  useEffect(() => {
    loadMovies('', null)
  }, [loadMovies])

  useEffect(() => {
    loadGenres()
  }, [loadGenres])

  const handleSearch = (query) => {
    loadMovies(query, selectedGenreId)
  }

  const handleGenreSelect = (genreId) => {
    loadMovies('', genreId)
  }

  const sectionTitle = isSearching
    ? 'Search Results'
    : selectedGenre
      ? `${selectedGenre.name} Movies`
      : 'Popular Movies'

  const loadingMessage = isSearching
    ? 'Searching movies…'
    : selectedGenre
      ? `Loading ${selectedGenre.name.toLowerCase()} movies…`
      : 'Loading movies…'

  return (
    <div className="home">
      <section className="home__hero">
        <h1 className="home__title">
          Discover Your Next <span className="home__title-accent">Favorite Film</span>
        </h1>
        <p className="home__subtitle">
          Browse popular movies, search titles, and save favorites — all in one
          place.
        </p>
        <SearchBar onSearch={handleSearch} submittedQuery={searchQuery} />
        <GenreFilter
          genres={genres}
          selectedGenreId={selectedGenreId}
          onSelectGenre={handleGenreSelect}
          loading={genresLoading}
          error={genresError}
          onRetry={loadGenres}
        />
      </section>

      <section className="home__content">
        <h2 className="home__section-title">{sectionTitle}</h2>

        {loading && <Loader message={loadingMessage} />}

        {!loading && error && (
          <div className="status-panel status-panel--error home__status--error" role="alert">
            <p>{error}</p>
            <button
              type="button"
              className="btn-primary home__retry"
              onClick={() => loadMovies(searchQuery, selectedGenreId)}
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="status-panel">
            <p>
              {isSearching
                ? `No movies found for "${searchQuery}".`
                : selectedGenre
                  ? `No movies found in ${selectedGenre.name}.`
                  : 'No movies available right now.'}
            </p>
            {isSearching && (
              <button
                type="button"
                className="btn-primary home__retry"
                onClick={() => loadMovies('', selectedGenreId)}
              >
                Clear search
              </button>
            )}
            {!isSearching && selectedGenre && (
              <button
                type="button"
                className="btn-primary home__retry"
                onClick={() => handleGenreSelect(null)}
              >
                View popular movies
              </button>
            )}
          </div>
        )}

        {!loading && !error && movies.length > 0 && <MovieGrid movies={movies} />}
      </section>
    </div>
  )
}

export default Home

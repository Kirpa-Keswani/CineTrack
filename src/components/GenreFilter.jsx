import './GenreFilter.css'

function GenreFilter({
  genres,
  selectedGenreId,
  onSelectGenre,
  loading = false,
  error = null,
  onRetry,
}) {
  if (loading) {
    return (
      <div className="genre-filter genre-filter--loading" aria-live="polite">
        <p className="genre-filter__message">Loading genres…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="genre-filter genre-filter--error" role="alert">
        <p className="genre-filter__message">{error}</p>
        {onRetry && (
          <button type="button" className="btn-primary genre-filter__retry" onClick={onRetry}>
            Retry
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="genre-filter">
      <p className="genre-filter__label" id="genre-filter-label">
        Filter by genre
      </p>
      <div
        className="genre-filter__list"
        role="group"
        aria-labelledby="genre-filter-label"
      >
        <button
          type="button"
          className={`genre-filter__button ${selectedGenreId === null ? 'genre-filter__button--active' : ''}`}
          onClick={() => onSelectGenre(null)}
          aria-pressed={selectedGenreId === null}
        >
          All
        </button>
        {genres.map((genre) => {
          const isActive = selectedGenreId === genre.id

          return (
            <button
              key={genre.id}
              type="button"
              className={`genre-filter__button ${isActive ? 'genre-filter__button--active' : ''}`}
              onClick={() => onSelectGenre(genre.id)}
              aria-pressed={isActive}
            >
              {genre.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default GenreFilter

import { useFavorites } from '../hooks/useFavorites'
import './FavoriteButton.css'

function HeartIcon({ filled }) {
  return (
    <svg
      className="favorite-button__icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.75"
      />
    </svg>
  )
}

function FavoriteButton({ movie, className = '', showLabel = false }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(movie.id)
  const movieTitle = movie.title || 'this movie'

  const handleClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    toggleFavorite(movie)
  }

  return (
    <button
      type="button"
      className={`favorite-button ${active ? 'favorite-button--active' : ''} ${className}`.trim()}
      onClick={handleClick}
      aria-label={
        active
          ? `Remove ${movieTitle} from favorites`
          : `Add ${movieTitle} to favorites`
      }
      aria-pressed={active}
    >
      <HeartIcon filled={active} />
      {showLabel && (
        <span className="favorite-button__label">
          {active ? 'In Favorites' : 'Add to Favorites'}
        </span>
      )}
    </button>
  )
}

export default FavoriteButton

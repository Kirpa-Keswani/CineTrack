import { useState } from 'react'
import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton'
import { formatRating } from '../utils/favoriteMovie'
import './MovieCard.css'

function MovieCard({ movie }) {
  const { id, title, year, voteAverage, posterUrl } = movie
  const [posterError, setPosterError] = useState(false)
  const showFallback = !posterUrl || posterError
  const posterAlt = year ? `${title} (${year}) movie poster` : `${title} movie poster`
  const rating = formatRating(voteAverage)

  return (
    <article className="movie-card">
      <Link
        to={`/movie/${id}`}
        className="movie-card__link"
        aria-label={`View details for ${title}`}
      >
        <div className="movie-card__poster">
          {showFallback ? (
            <span className="movie-card__fallback" aria-hidden="true">
              {title.charAt(0) || '?'}
            </span>
          ) : (
            <img
              className="movie-card__image"
              src={posterUrl}
              alt={posterAlt}
              loading="lazy"
              onError={() => setPosterError(true)}
            />
          )}
        </div>
        <div className="movie-card__body">
          <h3 className="movie-card__title" title={title}>
            {title}
          </h3>
          <div className="movie-card__meta">
            <span className="movie-card__rating" aria-label={`Rating ${rating} out of 10`}>
              {rating}
            </span>
            {year && <span className="movie-card__year">{year}</span>}
          </div>
        </div>
      </Link>
      <FavoriteButton movie={movie} className="movie-card__favorite" />
    </article>
  )
}

export default MovieCard

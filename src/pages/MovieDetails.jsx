import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import FavoriteButton from '../components/FavoriteButton'
import { getMovieDetails, NOT_FOUND_ERROR } from '../services/tmdb'
import { formatRating } from '../utils/favoriteMovie'
import './MovieDetails.css'

function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [posterError, setPosterError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadMovie() {
      setLoading(true)
      setError(null)
      setNotFound(false)
      setMovie(null)
      setPosterError(false)

      try {
        const data = await getMovieDetails(id)

        if (!cancelled) {
          setMovie(data)
        }
      } catch (err) {
        if (!cancelled) {
          if (err.message === NOT_FOUND_ERROR) {
            setNotFound(true)
          } else {
            setError(err.message || 'Something went wrong while loading this movie.')
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadMovie()

    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return <Loader message="Loading movie details…" />
  }

  if (error) {
    return (
      <div className="movie-details movie-details--empty status-panel">
        <h1>Unable to load movie</h1>
        <p>{error}</p>
        <Link to="/" className="btn-primary movie-details__back-link">
          Back to Home
        </Link>
      </div>
    )
  }

  if (notFound || !movie) {
    return (
      <div className="movie-details movie-details--empty status-panel">
        <h1>Movie not found</h1>
        <p>The movie you are looking for does not exist.</p>
        <Link to="/" className="btn-primary movie-details__back-link">
          Back to Home
        </Link>
      </div>
    )
  }

  const showFallback = !movie.posterUrl || posterError
  const genreLabel = movie.genres.map((genre) => genre.name).join(', ')
  const posterAlt = movie.year
    ? `${movie.title} (${movie.year}) movie poster`
    : `${movie.title} movie poster`
  const rating = formatRating(movie.voteAverage)

  return (
    <div className="movie-details">
      <Link to="/" className="movie-details__back">
        ← Back to Home
      </Link>

      <div className="movie-details__layout">
        <div className="movie-details__poster-wrap">
          <div className="movie-details__poster">
            {showFallback ? (
              <span className="movie-details__fallback" aria-hidden="true">
                {movie.title.charAt(0) || '?'}
              </span>
            ) : (
              <img
                className="movie-details__image"
                src={movie.posterUrl}
                alt={posterAlt}
                onError={() => setPosterError(true)}
              />
            )}
          </div>
          <FavoriteButton
            movie={movie}
            showLabel
            className="favorite-button--details movie-details__favorite"
          />
        </div>

        <div className="movie-details__info">
          <h1 className="movie-details__title">{movie.title}</h1>
          <div className="movie-details__meta">
            <span className="movie-details__meta-item movie-details__meta-item--rating">
              {rating} / 10
            </span>
            {movie.year && (
              <span className="movie-details__meta-item">{movie.year}</span>
            )}
            {movie.runtime && (
              <span className="movie-details__meta-item">{movie.runtime} min</span>
            )}
            {genreLabel && (
              <span className="movie-details__meta-item">{genreLabel}</span>
            )}
          </div>
          <p className="movie-details__overview">
            {movie.overview || 'No overview available for this movie.'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails

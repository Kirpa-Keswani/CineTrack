import MovieCard from './MovieCard'
import './MovieGrid.css'

function MovieGrid({ movies = [] }) {
  if (!movies.length) {
    return null
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default MovieGrid

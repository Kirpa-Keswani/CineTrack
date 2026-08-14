import { Link } from 'react-router-dom'
import MovieGrid from '../components/MovieGrid'
import { useFavorites } from '../hooks/useFavorites'
import './Favorites.css'

function Favorites() {
  const { favorites } = useFavorites()

  return (
    <div className="favorites">
      <h1 className="favorites__title">My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="status-panel favorites__empty">
          <p>You have not saved any movies yet.</p>
          <p className="favorites__hint">
            Browse movies on the home page and add them to your favorites list.
          </p>
          <Link to="/" className="btn-primary favorites__link">
            Explore Movies
          </Link>
        </div>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </div>
  )
}

export default Favorites

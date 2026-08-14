import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <div className="not-found status-panel">
      <h1 className="not-found__title">Page not found</h1>
      <p className="not-found__text">The page you are looking for does not exist.</p>
      <Link to="/" className="btn-primary not-found__link">
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound

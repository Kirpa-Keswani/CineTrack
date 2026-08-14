import { useEffect, useState } from 'react'
import './SearchBar.css'

function SearchIcon() {
  return (
    <svg
      className="search-bar__icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function SearchBar({
  onSearch,
  placeholder = 'Search for a movie…',
  submittedQuery = '',
}) {
  const [query, setQuery] = useState(submittedQuery)

  useEffect(() => {
    setQuery(submittedQuery)
  }, [submittedQuery])

  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch?.(query.trim())
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <label htmlFor="movie-search" className="search-bar__label">
        Search movies
      </label>
      <div className="search-bar__container">
        <div className="search-bar__field">
          <SearchIcon />
          <input
            id="movie-search"
            type="search"
            className="search-bar__input"
            placeholder={placeholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit" className="search-bar__button">
            Search
          </button>
        </div>
      </div>
    </form>
  )
}

export default SearchBar

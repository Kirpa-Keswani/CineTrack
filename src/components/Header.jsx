import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'
import './Header.css'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { favoritesCount } = useFavorites()

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="header">
      <div className="header__inner">
        <NavLink to="/" className="header__logo" onClick={closeMenu}>
          Cine<span>Track</span>
        </NavLink>

        <button
          type="button"
          className="header__menu-btn"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="main-nav"
          className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}
          aria-label="Main navigation"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `header__link ${isActive ? 'header__link--active' : ''}`
            }
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `header__link ${isActive ? 'header__link--active' : ''}`
            }
            aria-label={
              favoritesCount > 0 ? `Favorites, ${favoritesCount} saved` : 'Favorites'
            }
            onClick={closeMenu}
          >
            Favorites
            {favoritesCount > 0 && (
              <span className="header__badge" aria-hidden="true">
                {favoritesCount}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header

import { useCallback, useEffect, useMemo, useState } from 'react'
import { toFavoriteMovie } from '../utils/favoriteMovie'
import { FavoritesContext } from './favoritesCtx'

const STORAGE_KEY = 'cinetrack_favorites'

function isValidFavorite(movie) {
  return (
    movie &&
    typeof movie === 'object' &&
    typeof movie.id === 'number' &&
    typeof movie.title === 'string'
  )
}

function loadFavoritesFromStorage() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return []
    }

    const stored = localStorage.getItem(STORAGE_KEY)

    if (!stored) {
      return []
    }

    const parsed = JSON.parse(stored)

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(isValidFavorite)
  } catch {
    return []
  }
}

function saveFavoritesToStorage(favorites) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  } catch {
    // Ignore quota errors or private browsing restrictions.
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFavoritesFromStorage)

  useEffect(() => {
    saveFavoritesToStorage(favorites)
  }, [favorites])

  const isFavorite = useCallback(
    (id) => favorites.some((movie) => String(movie.id) === String(id)),
    [favorites],
  )

  const addFavorite = useCallback((movie) => {
    const favorite = toFavoriteMovie(movie)

    setFavorites((current) => {
      if (current.some((item) => item.id === favorite.id)) {
        return current
      }

      return [...current, favorite]
    })
  }, [])

  const removeFavorite = useCallback((id) => {
    setFavorites((current) =>
      current.filter((movie) => String(movie.id) !== String(id)),
    )
  }, [])

  const toggleFavorite = useCallback((movie) => {
    setFavorites((current) => {
      const exists = current.some((item) => item.id === movie.id)

      if (exists) {
        return current.filter((item) => item.id !== movie.id)
      }

      return [...current, toFavoriteMovie(movie)]
    })
  }, [])

  const value = useMemo(
    () => ({
      favorites,
      favoritesCount: favorites.length,
      isFavorite,
      addFavorite,
      removeFavorite,
      toggleFavorite,
    }),
    [favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite],
  )

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  )
}

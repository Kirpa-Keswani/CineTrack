const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'
export const NOT_FOUND_ERROR = 'NOT_FOUND'

function getApiKey() {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY

  if (!apiKey) {
    throw new Error(
      'TMDB API key is missing. Add VITE_TMDB_API_KEY to your .env file.',
    )
  }

  return apiKey
}

export function getPosterUrl(posterPath, size = 'w500') {
  if (!posterPath) {
    return null
  }

  return `${TMDB_IMAGE_BASE_URL}/${size}${posterPath}`
}

function getReleaseYear(releaseDate) {
  if (!releaseDate) {
    return null
  }

  return releaseDate.slice(0, 4)
}

function normalizeMovie(movie) {
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview ?? '',
    posterPath: movie.poster_path ?? null,
    posterUrl: getPosterUrl(movie.poster_path),
    releaseDate: movie.release_date ?? '',
    year: getReleaseYear(movie.release_date),
    voteAverage: movie.vote_average ?? 0,
    genreIds: movie.genre_ids ?? [],
  }
}

function normalizeMovieDetails(movie) {
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview ?? '',
    posterPath: movie.poster_path ?? null,
    posterUrl: getPosterUrl(movie.poster_path),
    backdropUrl: getPosterUrl(movie.backdrop_path, 'w1280'),
    releaseDate: movie.release_date ?? '',
    year: getReleaseYear(movie.release_date),
    voteAverage: movie.vote_average ?? 0,
    runtime: movie.runtime ?? null,
    genres: movie.genres ?? [],
  }
}

function createRequestError(status) {
  if (status === 401) {
    return new Error(
      'Invalid TMDB API key. Check VITE_TMDB_API_KEY in your .env file.',
    )
  }

  if (status === 404) {
    return new Error(NOT_FOUND_ERROR)
  }

  return new Error(`TMDB request failed (${status}). Please try again later.`)
}

async function fetchFromTmdb(endpoint, params = {}) {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`)
  url.searchParams.set('api_key', getApiKey())

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  let response

  try {
    response = await fetch(url)
  } catch {
    throw new Error('Network error. Check your internet connection and try again.')
  }

  if (!response.ok) {
    throw createRequestError(response.status)
  }

  return response.json()
}

export async function getPopularMovies() {
  const data = await fetchFromTmdb('/movie/popular')
  return data.results.map(normalizeMovie)
}

export async function searchMovies(query) {
  const data = await fetchFromTmdb('/search/movie', { query })
  return data.results.map(normalizeMovie)
}

export async function getMovieDetails(id) {
  if (!id || Number.isNaN(Number(id))) {
    throw new Error(NOT_FOUND_ERROR)
  }

  const data = await fetchFromTmdb(`/movie/${id}`)
  return normalizeMovieDetails(data)
}

export async function getMoviesByGenre(genreId) {
  const data = await fetchFromTmdb('/discover/movie', { with_genres: genreId })
  return data.results.map(normalizeMovie)
}

export async function getMovies({ query = '', genreId = null } = {}) {
  const activeQuery = query.trim()

  if (activeQuery) {
    return searchMovies(activeQuery)
  }

  if (genreId) {
    return getMoviesByGenre(genreId)
  }

  return getPopularMovies()
}

export async function getGenres() {
  const data = await fetchFromTmdb('/genre/movie/list')
  return data.genres
}

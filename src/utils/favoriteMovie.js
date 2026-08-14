export function toFavoriteMovie(movie) {
  return {
    id: movie.id,
    title: movie.title,
    year: movie.year ?? null,
    voteAverage: movie.voteAverage ?? 0,
    posterUrl: movie.posterUrl ?? null,
  }
}

export function formatRating(value) {
  return Number(value ?? 0).toFixed(1)
}

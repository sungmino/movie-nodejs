module.exports = {
  redisPort: process.env.REDIS_PORT || 6379,
  redisHost: '127.0.0.1',
  redisConnectTimeout: 60000,

  limitedPagesCache: 5,

  timeoutAllFilms: 10 * 60,
  timeoutFilterFilms: 10 * 60,
  timeoutSearchFilms: 10 * 60,
  timeoutSearchFilmByField: 10 * 60,
  timeoutRelateFilms: 10 * 60,

  timeoutTotalAllFilms: 10 * 60,
  timeoutTotalFilterFilms: 10 * 60,
  timeoutTotalRelateFilms: 10 * 60,
  timeoutTotalSearchFilmsByField: 10 * 60
}

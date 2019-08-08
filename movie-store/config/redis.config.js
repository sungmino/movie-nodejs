module.exports = {
  redisPort: process.env.REDIS_PORT || 6379,
  redisHost: '127.0.0.1',
  redisConnectTimeout: 60000,

  timeoutAllFilms: 10,
}
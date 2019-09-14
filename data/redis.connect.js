const redis = require('redis')
const bluebird = require('bluebird')
const { redisPort, redisHost, redisConnectTimeout } = require('../config/redis.config')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const client = redis.createClient({
  host: redisHost,
  port: redisPort,
  connect_timeout: redisConnectTimeout
})

client.on('error', error => {
  console.log(error.message)
})

module.exports = {
  client
}

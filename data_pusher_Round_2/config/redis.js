// config/redisClient.js
const Redis = require('ioredis');

const redis = new Redis(); // uses default localhost:6379

redis.on('connect', () => {
  console.log('🧠 Redis connected');
});

redis.on('error', (err) => {
  console.error('❌ Redis error:', err);
});

module.exports = redis;

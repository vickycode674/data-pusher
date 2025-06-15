const Queue = require('bull');
const redis = require('../config/redis');

const dataQueue = new Queue('dataQueue', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
});

module.exports = dataQueue;

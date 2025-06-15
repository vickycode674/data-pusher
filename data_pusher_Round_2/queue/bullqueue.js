const Queue = require('bull');
const dataQueue = new Queue('dataQueue', {
  redis: {
    host: 'localhost',
    port: 6379
  }
});

module.exports = {
  dataQueue
};

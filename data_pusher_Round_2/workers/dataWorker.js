const dataQueue = require('../queue/dataQueue');
const knex = require('../config/db');
const axios = require('axios');

dataQueue.process(async (job, done) => {
  try {
    const { event_id, account_id, data } = job.data;
    console.log(`⚙️  Processing job: Event ID ${event_id}, Account ${account_id}`);
    const receivedTime = new Date();

    // Fetch destinations linked to this account
    const destinations = await knex('destinations').where('account_id', account_id);

    if (!destinations || destinations.length === 0) {
      console.log(`No destinations found for account ${account_id}`);
      return done();
    }

    for (const dest of destinations) {
      try {
        // Send data to destination webhook
        await axios({
          method: dest.http_method || 'POST',
          url: dest.url,
          headers: JSON.parse(dest.headers || '{}'),
          data: data
        });

        // Log success
        await knex('logs').insert({
          event_id,
          account_id,
          destination_id: dest.id,
          received_timestamp: receivedTime,
          processed_timestamp: new Date(),
          received_data: JSON.stringify(data),
          status: 'success'
        });
      } catch (err) {
        console.error(`Error posting to ${dest.url}:`, err.message);

        // Log failure
        await knex('logs').insert({
          event_id,
          account_id,
          destination_id: dest.id,
          received_timestamp: receivedTime,
          processed_timestamp: new Date(),
          received_data: JSON.stringify(data),
          status: 'failed'
        });
      }
    }
    console.log("🚀 Data Worker started and waiting for jobs...");

    done();
  } catch (err) {
    console.error('Worker Error:', err.message);
    done(err);
  }
});

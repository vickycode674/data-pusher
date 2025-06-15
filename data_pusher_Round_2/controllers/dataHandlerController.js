// src/controllers/incomingDataController.js
const knex = require('../config/db');
const dataQueue = require('../queue/dataQueue'); // Added now ✅
const redis = require('../config/redis');


exports.receiveData = async (req, res) => {
  try {
    const token = req.headers['cl-x-token'];
    const eventId = req.headers['cl-x-event-id'];

    console.log("Header Token:", token);
    console.log("Event ID:", eventId);

    if (!token || !eventId) {
      return res.status(400).json({ success: false, message: "Missing required headers" });
    }

    const account = await knex('accounts').where('app_secret_token', token).first();

    const cacheKey = `event:${eventId}`;
    await redis.set(cacheKey, JSON.stringify(req.body), 'EX', 300); 

    console.log(`📦 Cached Data for ${cacheKey}:`, req.body);


    if (!account) {
      return res.status(403).json({ success: false, message: "Invalid token" });
    }

    const destinations = await knex('destinations').where('account_id', account.account_id);

    if (!destinations || destinations.length === 0) {
      return res.status(404).json({ success: false, message: "No destinations found" });
    }

    const newEventId = `event_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    // ✅ Enqueue job instead of inserting logs directly
    await dataQueue.add({
      event_id: newEventId,
      account_id: account.account_id,
      data: req.body,
    });

    res.json({ success: true, message: "Data received and queued for processing." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

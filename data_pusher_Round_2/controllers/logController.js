const knex = require('../config/db');

exports.getLogs = async (req, res) => {
  try {
    const { account_id, status, date_from, date_to, page = 1, limit = 10 } = req.query;

    let query = knex('logs')
      .join('accounts', 'accounts.account_id', 'logs.account_id')
      .join('destinations', 'destinations.id', 'logs.destination_id')
      .select(
        'logs.event_id',
        'accounts.account_name',
        'destinations.url',
        'logs.received_timestamp',
        'logs.processed_timestamp',
        'logs.status',
        'logs.received_data'
      );

    if (account_id) {
      query = query.where('logs.account_id', account_id);
    }

    if (status) {
      query = query.where('logs.status', status);
    }

    if (date_from) {
      query = query.where('logs.received_timestamp', '>=', new Date(date_from));
    }

    if (date_to) {
      query = query.where('logs.received_timestamp', '<=', new Date(date_to));
    }

    query = query.orderBy('logs.received_timestamp', 'desc')
                 .limit(limit)
                 .offset((page - 1) * limit);

    const logs = await query;

    res.json({ success: true, data: logs });
  } catch (err) {
    console.error("Error fetching logs:", err);
    res.status(500).json({ success: false, message: "Error fetching logs" });
  }
};


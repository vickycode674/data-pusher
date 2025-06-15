require("dotenv").config();
const express = require("express");
const { ExpressAdapter } = require('@bull-board/express');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');

const { dataQueue } = require('./queue/bullqueue');




const app = express();

const PORT = process.env.PORT || 5000;



app.use(express.json());

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullAdapter(dataQueue)],
  serverAdapter,
});

app.use('/admin/queues', serverAdapter.getRouter());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/accounts', require('./routes/accountRoutes'));
app.use('/api/destinations', require('./routes/destinationRoutes'));
app.use('/api/account-members', require('./routes/accountMemberRoutes'));
app.use('/api/logs', require('./routes/logRoutes'));
app.use('/server', require('./routes/dataHandlerRoutes'));

// add this so tests can run it
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

const cors = require("cors");


module.exports = app;



app.get("/", (req, res) => {
  res.send("✅ Data Pusher API Working!");
});

//  logger.info({ message: 'Webhook data received!' });

//  logger.error({ message: 'Database insert failed!', error: err });

//  logger.info({ message: 'Webhook forwarded to destination' }, { route: '/data', status: 200 });



app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


module.exports = app;

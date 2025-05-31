const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const accountRoutes = require('./routes/accountRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const incomingRoutes = require('./routes/incomingRoutes');

app.use(express.json());
app.use('/accounts', accountRoutes);
app.use('/destinations', destinationRoutes);
app.use('/server', incomingRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { port, mongoUri } = require('./config');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/consultations', require('./routes/consultationRoutes'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

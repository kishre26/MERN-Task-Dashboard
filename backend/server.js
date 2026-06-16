const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
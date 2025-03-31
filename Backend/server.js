const express = require('express');
const cors = require('cors');
const https = require('https');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/jobs', require('./routes/jobs'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
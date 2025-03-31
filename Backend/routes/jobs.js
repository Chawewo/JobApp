const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Route to search for jobs
router.post('/search', jobController.searchJobs);

module.exports = router;
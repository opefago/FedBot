// const dotenv = require('dotenv');
// dotenv.config();
const express = require("express");
const moment = require('moment');
const cronJobs = require('./bot/cron_jobs');
const apiRoutes = require('./api/indexRoutes');

moment.locale('WAT');
app = express();

// Connect to all API routes
app.use('/api', apiRoutes);

app.listen(process.env.PORT || 3000);

// Run Cron Jobs
cronJobs.runBirthdayWishesJob();
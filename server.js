const express = require('express');
const app = express();

// Initial status
let currentStatus = 'OK';

// Get the interval from the environment variable or set default to 5 minutes
const intervalSeconds = process.env.STATUS_INTERVAL_SECONDS || 300;

// Define the /status endpoint
app.get('/status', (req, res) => {
  res.json({ status: currentStatus });
});

// Function to change status and schedule the next execution
function changeStatus() {
  currentStatus = 'ERROR';
  console.log(`Status changed to ERROR after ${intervalSeconds} seconds`);
}

// Schedule the status change
setTimeout(changeStatus, intervalSeconds * 1000);

// Handle SIGTERM signal for graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM signal. Gracefully shutting down...');

  server.close(() => {
    console.log('Server closed. Exiting process.');
    process.exit(0);
  });
});

// Start the server on port 3000
const port = 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Status is set to OK`);
});

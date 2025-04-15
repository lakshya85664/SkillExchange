const cron = require('node-cron');
const checkInactiveUsersWithMatches = require('./InactiveUserNotifier');

// Run every day at 11 AM
cron.schedule('03 11 * * *', () => {
  console.log('\n--- Starting inactive user notification check ---');
  checkInactiveUsersWithMatches()
    .then(() => console.log('--- Notification check completed ---\n'))
    .catch(err => console.error('Error in notification check:', err));
});

console.log('Inactive user notification scheduler started. Will run daily at 11 AM.');
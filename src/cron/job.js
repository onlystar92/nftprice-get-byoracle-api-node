import cron from 'node-cron';

const task = cron.schedule('* * * * * *', () => {
  console.log('===>1');
});

module.exports = task;

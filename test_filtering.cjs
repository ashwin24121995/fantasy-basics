const axios = require('axios');
const apiKey = process.env.CRICKET_API_KEY;

axios.get('https://api.cricapi.com/v1/currentMatches', {
  params: { apikey: apiKey },
  timeout: 10000
}).then(res => {
  const matches = res.data.data || [];
  console.log('Total matches:', matches.length);
  
  const now = new Date();
  
  // Test new filtering logic
  const upcoming = matches.filter(m => {
    const matchDate = new Date(m.dateTimeGMT);
    return !m.matchStarted && matchDate >= now;
  });
  
  const live = matches.filter(m => m.matchStarted && !m.matchEnded);
  const completed = matches.filter(m => m.matchEnded);
  
  console.log('Upcoming:', upcoming.length);
  console.log('Live:', live.length);
  console.log('Completed:', completed.length);
  
  if (upcoming.length > 0) {
    console.log('\nSample upcoming match:', upcoming[0].name);
    console.log('Date:', upcoming[0].dateTimeGMT);
  }
  
  if (live.length > 0) {
    console.log('\nSample live match:', live[0].name);
  }
  
  if (completed.length > 0) {
    console.log('\nSample completed match:', completed[0].name);
  }
}).catch(err => console.error('Error:', err.message));

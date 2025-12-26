const axios = require('axios');
const apiKey = process.env.CRICKET_API_KEY;

// Get current matches first
axios.get('https://api.cricapi.com/v1/currentMatches', {
  params: { apikey: apiKey },
  timeout: 10000
}).then(res => {
  const matches = res.data.data || [];
  const liveMatch = matches.find(m => m.matchStarted && !m.matchEnded);
  
  if (liveMatch) {
    console.log('Testing with match:', liveMatch.name);
    console.log('Match ID:', liveMatch.id);
    console.log('Has Squad:', liveMatch.hasSquad);
    console.log('Fantasy Enabled:', liveMatch.fantasyEnabled);
    
    // Try to fetch squad
    return axios.get('https://api.cricapi.com/v1/match_squad', {
      params: { 
        apikey: apiKey,
        id: liveMatch.id
      },
      timeout: 10000
    });
  } else {
    console.log('No live match found');
    // Try with first match
    const firstMatch = matches[0];
    if (firstMatch) {
      console.log('\nTrying with first match:', firstMatch.name);
      console.log('Match ID:', firstMatch.id);
      return axios.get('https://api.cricapi.com/v1/match_squad', {
        params: { 
          apikey: apiKey,
          id: firstMatch.id
        },
        timeout: 10000
      });
    }
    return null;
  }
}).then(squadRes => {
  if (squadRes) {
    console.log('\nSquad API Response:');
    console.log('Status:', squadRes.data.status);
    if (squadRes.data.data) {
      console.log('Squad data available');
      const squad = squadRes.data.data;
      console.log('\nFull squad structure:');
      console.log(JSON.stringify(squad, null, 2).substring(0, 2000));
    } else {
      console.log('No squad data');
      console.log('Response:', JSON.stringify(squadRes.data, null, 2));
    }
  }
}).catch(err => {
  console.error('Error:', err.message);
  if (err.response) {
    console.error('Response status:', err.response.status);
    console.error('Response data:', JSON.stringify(err.response.data, null, 2));
  }
});

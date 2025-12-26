import axios from 'axios';

const API_KEY = '1a822521-d7e0-46ff-98d3-3e51020863f3';

async function testMatchesAPI() {
  try {
    console.log('Testing /matches endpoint...\n');
    
    const response = await axios.get('https://api.cricapi.com/v1/matches', {
      params: {
        apikey: API_KEY,
        offset: 0
      }
    });

    console.log('API Status:', response.data.status);
    console.log('Total matches returned:', response.data.data?.length || 0);
    console.log('\nAPI Info:', JSON.stringify(response.data.info, null, 2));
    
    if (response.data.data && response.data.data.length > 0) {
      console.log('\nFirst 3 matches:');
      response.data.data.slice(0, 3).forEach((match, idx) => {
        console.log(`\n${idx + 1}. ${match.name}`);
        console.log(`   ID: ${match.id}`);
        console.log(`   Date: ${match.date}`);
        console.log(`   Status: ${match.status}`);
        console.log(`   Match Started: ${match.matchStarted}`);
        console.log(`   Match Ended: ${match.matchEnded}`);
        console.log(`   Teams: ${match.teams?.join(' vs ') || 'N/A'}`);
      });
      
      // Count matches by status
      const upcoming = response.data.data.filter(m => !m.matchStarted).length;
      const live = response.data.data.filter(m => m.matchStarted && !m.matchEnded).length;
      const completed = response.data.data.filter(m => m.matchEnded).length;
      
      console.log('\n=== Match Counts ===');
      console.log(`Upcoming: ${upcoming}`);
      console.log(`Live: ${live}`);
      console.log(`Completed: ${completed}`);
      console.log(`Total: ${response.data.data.length}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

testMatchesAPI();

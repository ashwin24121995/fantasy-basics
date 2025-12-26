import axios from 'axios';

const API_KEY = '1a822521-d7e0-46ff-98d3-3e51020863f3';

async function findUpcomingMatches() {
  try {
    console.log('Searching for upcoming matches across multiple pages...\n');
    
    const today = new Date();
    let upcomingMatches = [];
    let offset = 0;
    const maxPages = 20; // Check first 20 pages (500 matches)
    
    for (let page = 0; page < maxPages; page++) {
      console.log(`Fetching page ${page + 1} (offset ${offset})...`);
      
      const response = await axios.get('https://api.cricapi.com/v1/matches', {
        params: {
          apikey: API_KEY,
          offset: offset
        }
      });

      if (response.data.status !== 'success' || !response.data.data) {
        console.log('No more data');
        break;
      }

      const matches = response.data.data;
      console.log(`  Got ${matches.length} matches`);
      
      // Find upcoming matches (not started yet)
      const upcoming = matches.filter(m => !m.matchStarted);
      
      if (upcoming.length > 0) {
        console.log(`  Found ${upcoming.length} upcoming matches!`);
        upcomingMatches.push(...upcoming);
        
        // Show first few
        upcoming.slice(0, 3).forEach(match => {
          console.log(`    - ${match.name} (${match.date})`);
        });
      }
      
      // If we found enough upcoming matches, stop
      if (upcomingMatches.length >= 50) {
        console.log('\nFound enough upcoming matches, stopping search.');
        break;
      }
      
      offset += 25;
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`\n=== RESULTS ===`);
    console.log(`Total upcoming matches found: ${upcomingMatches.length}`);
    
    if (upcomingMatches.length > 0) {
      console.log('\nFirst 10 upcoming matches:');
      upcomingMatches.slice(0, 10).forEach((match, idx) => {
        console.log(`${idx + 1}. ${match.name}`);
        console.log(`   Date: ${match.date}`);
        console.log(`   Status: ${match.status}`);
      });
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

findUpcomingMatches();

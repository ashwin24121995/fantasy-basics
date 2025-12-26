import { getCurrentMatches } from "./server/cricketApi";

async function testAPI() {
  console.log("Fetching matches from Cricket API...\n");
  
  const matches = await getCurrentMatches();
  
  console.log(`Total matches fetched: ${matches.length}\n`);
  
  // Categorize matches
  const now = new Date();
  const upcoming = matches.filter(m => !m.matchStarted && !m.matchEnded);
  const live = matches.filter(m => m.matchStarted && !m.matchEnded);
  const completed = matches.filter(m => m.matchEnded);
  
  console.log(`Upcoming: ${upcoming.length}`);
  console.log(`Live: ${live.length}`);
  console.log(`Completed: ${completed.length}\n`);
  
  // Show first 5 matches with their status
  console.log("First 5 matches:");
  matches.slice(0, 5).forEach((m, i) => {
    console.log(`\n${i + 1}. ${m.name}`);
    console.log(`   ID: ${m.id}`);
    console.log(`   Date: ${m.date}`);
    console.log(`   DateTime GMT: ${m.dateTimeGMT}`);
    console.log(`   Match Started: ${m.matchStarted}`);
    console.log(`   Match Ended: ${m.matchEnded}`);
    console.log(`   Status: ${m.status}`);
  });
}

testAPI().catch(console.error);

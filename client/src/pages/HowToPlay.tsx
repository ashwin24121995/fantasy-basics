import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function HowToPlayPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation activePage="how-to-play" />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary via-primary/90 to-secondary py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full">
          <div className="absolute top-0 right-0 w-32 h-full bg-secondary transform skew-x-[-12deg] translate-x-16 opacity-60"></div>
          <div className="absolute top-0 right-24 w-24 h-full bg-white transform skew-x-[-12deg] translate-x-16 opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4">How to Play Fantasy Cricket</h1>
          <p className="text-xl text-white/90 max-w-2xl">Your Complete Guide to Playing on Kavera</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Introduction */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary"></div>
              <h2 className="text-3xl font-bold text-gray-900">What is Fantasy Cricket?</h2>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Fantasy cricket is a <strong>free game of skill</strong> where you create a virtual team of real cricket players and earn points based on their actual performance in live matches. It's a test of your cricket knowledge, strategic thinking, and ability to predict player performance.
              </p>
              <p>
                On Kavera, it's <strong>100% free</strong> with no entry fees, no real money transactions, and no cash prizes. You compete purely for entertainment, bragging rights among friends, and the satisfaction of proving your cricket expertise.
              </p>
            </div>
          </section>

          {/* Step-by-Step Guide */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">5 Simple Steps to Get Started</h2>
            
            {/* Step 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-secondary p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Create Your Account</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 mb-4">
                  Getting started is quick and easy. Follow these steps to create your free account:
                </p>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                      <span className="text-sm font-bold text-primary">✓</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Sign Up:</strong> Click the "Sign Up" or "Register" button and provide your email address or use social login.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                      <span className="text-sm font-bold text-primary">✓</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Age Verification:</strong> Confirm you are 18 years or older. This is mandatory as per Indian regulations.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                      <span className="text-sm font-bold text-primary">✓</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Select Your State:</strong> Choose your state of residence. Note: Residents of Telangana, Andhra Pradesh, Assam, and Odisha cannot participate due to state regulations.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                      <span className="text-sm font-bold text-primary">✓</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Complete Profile:</strong> Add your name and preferences to personalize your experience.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-secondary to-primary p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-secondary">2</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Select a Match</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 mb-4">
                  Browse through upcoming and live cricket matches from various tournaments and formats:
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-2">T20</div>
                    <div className="text-sm text-gray-600">Fast-paced 20-over matches</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-secondary mb-2">ODI</div>
                    <div className="text-sm text-gray-600">50-over international matches</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-2">Test</div>
                    <div className="text-sm text-gray-600">Multi-day test cricket</div>
                  </div>
                </div>
                <p className="text-gray-700">
                  You can filter matches by status (upcoming, live, completed), format, and tournament. Each match shows team names, match time, and venue information sourced from real cricket data APIs.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-secondary p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Join a Free Contest</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 mb-4">
                  Each match has multiple free contests you can join. Here's what you need to know:
                </p>
                <div className="bg-yellow-50 border-l-4 border-secondary p-6 rounded-r-lg mb-4">
                  <h4 className="font-bold text-gray-900 mb-2">100% Free - No Entry Fees</h4>
                  <p className="text-gray-700">
                    All contests on Kavera are completely free. There are no entry fees, no hidden charges, and no real money involved. Simply click "Join Contest" and you're in!
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center mt-1">
                      <span className="text-sm font-bold text-secondary">•</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Contest Size:</strong> Contests vary from small (50 participants) to large (1000+ participants). Choose based on your preference for competition level.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center mt-1">
                      <span className="text-sm font-bold text-secondary">•</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Scoring Rules:</strong> Review the contest's scoring system to understand how points are awarded.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center mt-1">
                      <span className="text-sm font-bold text-secondary">•</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">No Cash Prizes:</strong> Compete for fun, rankings, and bragging rights among friends—not for money.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-secondary to-primary p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-secondary">4</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Build Your Dream Team</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 mb-6">
                  This is where your cricket knowledge comes into play. Create a team of <strong>11 players</strong> from both competing teams:
                </p>
                
                <h4 className="font-bold text-gray-900 mb-4 text-lg">Team Composition Rules:</h4>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">🏏</div>
                      <strong className="text-gray-900">Batsmen</strong>
                    </div>
                    <p className="text-sm text-gray-600">Select 3-6 batsmen who score runs</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center text-white font-bold">⚡</div>
                      <strong className="text-gray-900">Bowlers</strong>
                    </div>
                    <p className="text-sm text-gray-600">Select 3-6 bowlers who take wickets</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">🎯</div>
                      <strong className="text-gray-900">All-Rounders</strong>
                    </div>
                    <p className="text-sm text-gray-600">Select 1-4 all-rounders (bat & bowl)</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center text-white font-bold">🧤</div>
                      <strong className="text-gray-900">Wicket-Keepers</strong>
                    </div>
                    <p className="text-sm text-gray-600">Select 1-4 wicket-keepers</p>
                  </div>
                </div>

                <h4 className="font-bold text-gray-900 mb-4 text-lg">Captain & Vice-Captain:</h4>
                <div className="space-y-3 mb-6">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">C</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Captain (2x Points):</strong>
                      <p className="text-gray-600 text-sm">Choose one player as captain. All points earned by this player will be doubled!</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">VC</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Vice-Captain (1.5x Points):</strong>
                      <p className="text-gray-600 text-sm">Choose another player as vice-captain. This player earns 1.5x points.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border-l-4 border-primary p-6 rounded-r-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Pro Tip</h4>
                  <p className="text-gray-700 text-sm">
                    Choose your captain and vice-captain wisely! These multipliers can significantly boost your total points. Consider players in good form, favorable match conditions, and their historical performance against the opposition.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-secondary p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">5</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Track Your Performance</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-700 mb-4">
                  Once the match starts, sit back and watch your fantasy team come to life:
                </p>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                      <span className="text-sm font-bold text-primary">📊</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Real-Time Updates:</strong> Watch live scores and fantasy points update automatically as the match progresses. No need to refresh!
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                      <span className="text-sm font-bold text-primary">🏆</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Contest Leaderboard:</strong> Check your ranking in the contest and see how you stack up against other participants.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                      <span className="text-sm font-bold text-primary">📈</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Player Statistics:</strong> View detailed performance stats for each player in your team, including runs, wickets, catches, and more.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                      <span className="text-sm font-bold text-primary">💬</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Share & Compete:</strong> Share your team and rankings with friends to prove your cricket expertise!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Scoring System */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-secondary"></div>
              <h2 className="text-3xl font-bold text-gray-900">Detailed Scoring System</h2>
            </div>
            <p className="text-gray-700 mb-6">
              Understanding how points are awarded is crucial for building a winning team. Here's the complete breakdown:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Batting */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="text-2xl">🏏</span> Batting Points
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-primary/20">
                    <span className="text-gray-700">Run Scored</span>
                    <span className="font-bold text-primary">+1 point</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-primary/20">
                    <span className="text-gray-700">Boundary Bonus (4)</span>
                    <span className="font-bold text-primary">+1 point</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-primary/20">
                    <span className="text-gray-700">Six Bonus (6)</span>
                    <span className="font-bold text-primary">+2 points</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-primary/20">
                    <span className="text-gray-700">Half-Century (50 runs)</span>
                    <span className="font-bold text-primary">+8 points</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-primary/20">
                    <span className="text-gray-700">Century (100 runs)</span>
                    <span className="font-bold text-primary">+16 points</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Duck (out for 0)</span>
                    <span className="font-bold text-red-600">-2 points</span>
                  </div>
                </div>
              </div>

              {/* Bowling */}
              <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-lg p-6">
                <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                  <span className="text-2xl">⚡</span> Bowling Points
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-secondary/20">
                    <span className="text-gray-700">Wicket Taken</span>
                    <span className="font-bold text-secondary">+25 points</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-secondary/20">
                    <span className="text-gray-700">3 Wicket Bonus</span>
                    <span className="font-bold text-secondary">+4 points</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-secondary/20">
                    <span className="text-gray-700">4 Wicket Bonus</span>
                    <span className="font-bold text-secondary">+8 points</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-secondary/20">
                    <span className="text-gray-700">5 Wicket Bonus</span>
                    <span className="font-bold text-secondary">+16 points</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Maiden Over</span>
                    <span className="font-bold text-secondary">+12 points</span>
                  </div>
                </div>
              </div>

              {/* Fielding */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="text-2xl">🧤</span> Fielding Points
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-primary/20">
                    <span className="text-gray-700">Catch Taken</span>
                    <span className="font-bold text-primary">+8 points</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-primary/20">
                    <span className="text-gray-700">Stumping</span>
                    <span className="font-bold text-primary">+12 points</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-primary/20">
                    <span className="text-gray-700">Run Out (Direct Hit)</span>
                    <span className="font-bold text-primary">+12 points</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Run Out (Indirect)</span>
                    <span className="font-bold text-primary">+6 points</span>
                  </div>
                </div>
              </div>

              {/* Strike Rate & Economy */}
              <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-lg p-6">
                <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                  <span className="text-2xl">📊</span> Performance Bonuses
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-secondary/20">
                    <span className="text-gray-700 text-sm">Strike Rate &gt; 170 (min 10 balls)</span>
                    <span className="font-bold text-secondary">+6 points</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-secondary/20">
                    <span className="text-gray-700 text-sm">Strike Rate 150-170</span>
                    <span className="font-bold text-secondary">+4 points</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-secondary/20">
                    <span className="text-gray-700 text-sm">Economy &lt; 5 (min 2 overs)</span>
                    <span className="font-bold text-secondary">+6 points</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700 text-sm">Economy 5-6</span>
                    <span className="font-bold text-secondary">+4 points</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 border-l-4 border-secondary p-6 rounded-r-lg">
              <h4 className="font-bold text-gray-900 mb-2">Remember: Captain & Vice-Captain Multipliers</h4>
              <p className="text-gray-700 text-sm">
                All points earned by your <strong>Captain are doubled (2x)</strong> and your <strong>Vice-Captain earns 1.5x points</strong>. Choose wisely to maximize your total score!
              </p>
            </div>
          </section>

          {/* Tips & Strategies */}
          <section className="bg-gradient-to-r from-primary to-secondary rounded-lg shadow-md p-8 text-white">
            <h2 className="text-3xl font-bold mb-6">Pro Tips & Strategies</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-lg mb-3">✓ Research Player Form</h4>
                <p className="text-white/90 text-sm">
                  Check recent performances, batting averages, bowling economy rates, and head-to-head records before selecting players.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-3">✓ Consider Match Conditions</h4>
                <p className="text-white/90 text-sm">
                  Pitch conditions, weather, and venue history can significantly impact player performance. Adjust your team accordingly.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-3">✓ Balance Your Team</h4>
                <p className="text-white/90 text-sm">
                  Don't overload on batsmen or bowlers. A balanced team with all-rounders often performs better across different match situations.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-3">✓ Captain Selection is Key</h4>
                <p className="text-white/90 text-sm">
                  Your captain choice can make or break your contest ranking. Pick players likely to have high-impact performances.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-3">✓ Monitor Team News</h4>
                <p className="text-white/90 text-sm">
                  Last-minute injuries or team changes can affect your strategy. Stay updated until the match starts.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-3">✓ Learn from Experience</h4>
                <p className="text-white/90 text-sm">
                  Review your past teams and contest results to understand what works and what doesn't. Continuous learning improves your skills.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}

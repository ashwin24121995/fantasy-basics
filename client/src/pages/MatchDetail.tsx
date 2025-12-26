import { Link, useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Users, Trophy, ArrowLeft, Info } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import ProfileCompletion from "@/components/ProfileCompletion";

export default function MatchDetail() {
  const [, params] = useRoute("/match/:matchId");
  const matchId = params?.matchId || "";
  const { user, isAuthenticated } = useAuth();

  const { data: match, isLoading: loadingMatch } = trpc.matches.getMatchById.useQuery(
    { matchId },
    { enabled: !!matchId }
  );

  const { data: contests, isLoading: loadingContests } = trpc.contests.getContestsByMatch.useQuery(
    { matchId },
    { enabled: !!matchId }
  );

  // Show profile completion if user is authenticated but profile is incomplete
  if (isAuthenticated && user && (!user.dateOfBirth || !user.state)) {
    return <ProfileCompletion onComplete={() => window.location.reload()} />;
  }

  if (loadingMatch) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading match details...</p>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="py-12 text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-bold mb-2">Match Not Found</h3>
            <p className="text-muted-foreground mb-4">
              The match you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/matches">
              <Button className="bg-primary hover:bg-primary/90">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Matches
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white relative z-50 shadow-md">
        <div className="container mx-auto px-4 py-0 flex items-center justify-between">
          <Link href="/" className="py-4">
            <img src="/logo-new.webp" alt="Fantasy Basics" className="h-14 w-auto cursor-pointer" />
          </Link>
          
          <div className="hidden md:flex items-stretch h-16">
            <Link href="/" className="relative px-6 flex items-center justify-center font-bold text-sm text-foreground hover:text-primary bg-gray-100 hover:bg-gray-200 transition-colors" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
              <span className="relative z-10">HOME</span>
            </Link>
            <Link href="/matches" className="relative px-6 flex items-center justify-center font-bold text-sm text-white bg-primary hover:bg-primary/90 transition-colors -ml-4" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
              <span className="relative z-10">CONTESTS</span>
            </Link>
            <Link href="/how-to-play" className="relative px-6 flex items-center justify-center font-bold text-sm text-foreground hover:text-primary bg-gray-100 hover:bg-gray-200 transition-colors -ml-4" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
              <span className="relative z-10">HOW TO PLAY</span>
            </Link>
            {isAuthenticated && (
              <Link href="/dashboard" className="relative px-6 flex items-center justify-center font-bold text-sm text-foreground hover:text-primary bg-gray-100 hover:bg-gray-200 transition-colors -ml-4" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                <span className="relative z-10">MY TEAMS</span>
              </Link>
            )}
            <Link href="/about" className="relative px-6 flex items-center justify-center font-bold text-sm text-foreground hover:text-primary bg-gray-100 hover:bg-gray-200 transition-colors -ml-4" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' }}>
              <span className="relative z-10">ABOUT</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-3 py-4">
            {!isAuthenticated ? (
              <>
                <Button 
                  variant="outline" 
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold text-sm"
                  onClick={() => window.location.href = getLoginUrl()}
                >
                  LOGIN
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white font-bold px-6 text-sm"
                  onClick={() => window.location.href = getLoginUrl()}
                >
                  REGISTER NOW
                </Button>
              </>
            ) : (
              <Link href="/dashboard">
                <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold">
                  DASHBOARD
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/matches">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to All Matches
            </Button>
          </Link>
        </div>
      </div>

      {/* Match Header */}
      <section className="bg-gradient-red-yellow py-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-full">
          <div className="absolute top-0 right-0 w-24 h-full bg-white/20 transform skew-x-12 translate-x-8"></div>
          <div className="absolute top-0 right-16 w-16 h-full bg-white/10 transform skew-x-12 translate-x-8"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Match Type Badge */}
          <div className="mb-4">
            <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm">
              {match.matchType || 'T20'} • {match.name}
            </span>
          </div>

          {/* Teams */}
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="text-center">
              {match.team1Img && (
                <img src={match.team1Img || ''} alt={match.team1 || ''} className="w-20 h-20 mx-auto mb-3 object-contain" />
              )}
              <h2 className="text-2xl md:text-3xl font-black text-white text-shadow-strong">{match.team1}</h2>
            </div>
            
            <div className="text-3xl md:text-4xl font-black text-secondary text-shadow-strong">VS</div>
            
            <div className="text-center">
              {match.team2Img && (
                <img src={match.team2Img || ''} alt={match.team2 || ''} className="w-20 h-20 mx-auto mb-3 object-contain" />
              )}
              <h2 className="text-2xl md:text-3xl font-black text-white text-shadow-strong">{match.team2}</h2>
            </div>
          </div>

          {/* Match Details */}
          <div className="flex flex-wrap justify-center gap-6 text-white">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Clock className="w-5 h-5" />
              <span className="font-bold">
                {new Date(match.dateTimeGMT).toLocaleString('en-IN', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                  timeZone: 'Asia/Kolkata'
                })}
              </span>
            </div>
            {match.venue && (
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <MapPin className="w-5 h-5" />
                <span className="font-bold">{match.venue}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contests Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h2 className="text-3xl font-black mb-2">Available Contests</h2>
            <p className="text-muted-foreground">
              Join a free contest and build your fantasy team. All contests are 100% free with no entry fees.
            </p>
          </div>

          {loadingContests ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading contests...</p>
            </div>
          ) : contests && contests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contests.map((contest: any) => (
                <Card key={contest.id} className="card-angular border-2 border-gray-200 hover:border-primary transition-all overflow-hidden">
                  <div className="h-2 bg-gradient-red-yellow"></div>
                  <CardContent className="p-6">
                    {/* Contest Name */}
                    <h3 className="text-xl font-black mb-4 text-foreground">{contest.name}</h3>

                    {/* Contest Stats */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-primary" />
                          <span className="text-sm font-bold text-muted-foreground">Total Spots</span>
                        </div>
                        <span className="text-lg font-black text-primary">{contest.maxParticipants}</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-secondary" />
                          <span className="text-sm font-bold text-muted-foreground">Entry Fee</span>
                        </div>
                        <span className="text-lg font-black text-secondary">FREE</span>
                      </div>

                      {/* Spots Filled Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-bold text-muted-foreground">Spots Filled</span>
                          <span className="font-black text-foreground">
                            {contest.currentParticipants} / {contest.maxParticipants}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div 
                            className="bg-gradient-red-yellow h-full rounded-full transition-all"
                            style={{ width: `${(contest.currentParticipants / contest.maxParticipants) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {contest.maxParticipants - contest.currentParticipants} spots remaining
                        </p>
                      </div>
                    </div>

                    {/* Join Button */}
                    {isAuthenticated ? (
                      <Link href={`/team-builder?matchId=${match.id}&contestId=${contest.id}`}>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold">
                          CREATE TEAM & JOIN
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold"
                        onClick={() => window.location.href = getLoginUrl()}
                      >
                        LOGIN TO JOIN
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center border-2 border-dashed">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-bold mb-2">No Contests Available</h3>
              <p className="text-muted-foreground mb-4">
                There are currently no contests available for this match. Please check back later or browse other matches.
              </p>
              <Link href="/matches">
                <Button variant="outline" className="border-2">
                  Browse Other Matches
                </Button>
              </Link>
            </Card>
          )}
        </div>
      </section>

      {/* Information Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 p-6 bg-secondary/10 border-l-4 border-secondary rounded">
              <Info className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold mb-2 text-secondary-foreground">How to Join a Contest</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-secondary-foreground">
                  <li><strong>Select a Contest:</strong> Choose from the available free contests above</li>
                  <li><strong>Create Your Team:</strong> Build your fantasy team of 11 players from both teams</li>
                  <li><strong>Select Captain & Vice-Captain:</strong> Choose wisely - captain gets 2x points, vice-captain gets 1.5x points</li>
                  <li><strong>Join the Contest:</strong> Submit your team and compete with other players</li>
                  <li><strong>Track Live:</strong> Watch your team's performance during the match in real-time</li>
                </ol>
                <p className="mt-4 text-sm font-bold text-secondary-foreground">
                  <strong>Remember:</strong> All contests are 100% free. There are no entry fees, no cash prizes, and no real money involved. This is purely for entertainment and testing your cricket knowledge.
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold mb-2">100% Free</h4>
                <p className="text-sm text-muted-foreground">
                  No entry fees or hidden charges. Play completely free.
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold mb-2">Compete with Friends</h4>
                <p className="text-sm text-muted-foreground">
                  Join contests and see how you rank against other players.
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold mb-2">Real-Time Updates</h4>
                <p className="text-sm text-muted-foreground">
                  Track your team's performance live during the match.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 relative overflow-hidden mt-auto">
        <div className="absolute bottom-0 right-0 w-1/4 h-full">
          <div className="absolute bottom-0 right-0 w-32 h-full bg-secondary transform skew-x-[-12deg] translate-x-16 opacity-80"></div>
          <div className="absolute bottom-0 right-24 w-24 h-full bg-primary transform skew-x-[-12deg] translate-x-16 opacity-80"></div>
          <div className="absolute bottom-0 right-40 w-16 h-full bg-secondary transform skew-x-[-12deg] translate-x-16 opacity-60"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-wrap justify-between gap-8 mb-8">
            <div className="flex-1 min-w-[200px]">
              <img src="/logo-new.webp" alt="Fantasy Basics" className="h-12 w-auto mb-4" />
              <p className="text-gray-400 text-sm max-w-xs">
                100% free fantasy cricket platform for entertainment purposes only.
              </p>
            </div>
            
            <div className="flex gap-16">
              <div>
                <h4 className="font-bold mb-4 text-secondary uppercase text-sm">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/about" className="text-gray-400 hover:text-secondary transition-colors">About Us</Link></li>
                  <li><Link href="/how-to-play" className="text-gray-400 hover:text-secondary transition-colors">How to Play</Link></li>
                  <li><Link href="/faq" className="text-gray-400 hover:text-secondary transition-colors">FAQ</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-secondary transition-colors">Contact Us</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold mb-4 text-secondary uppercase text-sm">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/terms" className="text-gray-400 hover:text-secondary transition-colors">Terms & Conditions</Link></li>
                  <li><Link href="/privacy" className="text-gray-400 hover:text-secondary transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/responsible-gaming" className="text-gray-400 hover:text-secondary transition-colors">Responsible Gaming</Link></li>
                  <li><Link href="/fair-play" className="text-gray-400 hover:text-secondary transition-colors">Fair Play</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-wrap justify-between items-center gap-4 text-sm text-gray-400">
              <p>© 2024 Fantasy Basics. All Rights Reserved. | KAVERAMMA COFFEE CURING WORKS PRIVATE LIMITED, Karnataka, India</p>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Legal Disclosure: This is a skill-based gaming platform for entertainment purposes only. Participants must be 18+ years old. Not available in Telangana, Andhra Pradesh, Assam, and Odisha.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

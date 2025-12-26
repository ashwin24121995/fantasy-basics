import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Clock, MapPin, Trophy, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import ProfileCompletion from "@/components/ProfileCompletion";

export default function Matches() {
  const { user, isAuthenticated } = useAuth();
  const { data: upcomingMatches, isLoading: upcomingLoading } = trpc.matches.getUpcomingMatches.useQuery();
  const { data: liveMatches, isLoading: liveLoading } = trpc.matches.getLiveMatches.useQuery();
  const { data: completedMatches, isLoading: completedLoading } = trpc.matches.getCompletedMatches.useQuery();

  // Show profile completion if user is authenticated but profile is incomplete
  if (isAuthenticated && user && (!user.dateOfBirth || !user.state)) {
    return <ProfileCompletion onComplete={() => window.location.reload()} />;
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

      {/* Page Header with Angular Design */}
      <section className="bg-gradient-red-yellow py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-full">
          <div className="absolute top-0 right-0 w-24 h-full bg-white/20 transform skew-x-12 translate-x-8"></div>
          <div className="absolute top-0 right-16 w-16 h-full bg-white/10 transform skew-x-12 translate-x-8"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 text-shadow-strong">
            CRICKET CONTESTS
          </h1>
          <p className="text-xl text-white/90 font-semibold max-w-2xl">
            Join free fantasy cricket contests and compete with players across India. Build your dream team and showcase your cricket knowledge!
          </p>
        </div>
      </section>

      {/* Matches Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white border-2 border-gray-200 p-1 h-auto">
              <TabsTrigger 
                value="upcoming" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white font-bold py-3 text-sm"
              >
                <Clock className="w-4 h-4 mr-2" />
                UPCOMING ({upcomingMatches?.length || 0})
              </TabsTrigger>
              <TabsTrigger 
                value="live" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white font-bold py-3 text-sm"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                LIVE ({liveMatches?.length || 0})
              </TabsTrigger>
              <TabsTrigger 
                value="completed" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white font-bold py-3 text-sm"
              >
                <Trophy className="w-4 h-4 mr-2" />
                COMPLETED ({completedMatches?.length || 0})
              </TabsTrigger>
            </TabsList>

            {/* Upcoming Matches */}
            <TabsContent value="upcoming">
              {upcomingLoading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading upcoming matches...</p>
                </div>
              ) : upcomingMatches && upcomingMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingMatches.map((match: any) => (
                    <Card key={match.id} className="card-angular border-2 border-gray-200 hover:border-primary transition-all overflow-hidden">
                      <div className="h-2 bg-gradient-red-yellow"></div>
                      <CardContent className="p-6">
                        {/* Match Type & Series */}
                        <div className="mb-4">
                          <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                            {match.matchType || 'T20'}
                          </span>
                          {match.name && (
                            <p className="text-xs text-muted-foreground mt-2 font-medium">{match.name}</p>
                          )}
                        </div>

                        {/* Teams */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex-1 text-center">
                            {match.t1img && (
                              <img src={match.t1img} alt={match.t1} className="w-12 h-12 mx-auto mb-2 object-contain" />
                            )}
                            <div className="text-lg font-black text-foreground">{match.t1}</div>
                          </div>
                          <div className="px-4">
                            <div className="text-xl font-black text-primary">VS</div>
                          </div>
                          <div className="flex-1 text-center">
                            {match.t2img && (
                              <img src={match.t2img} alt={match.t2} className="w-12 h-12 mx-auto mb-2 object-contain" />
                            )}
                            <div className="text-lg font-black text-foreground">{match.t2}</div>
                          </div>
                        </div>

                        {/* Match Details */}
                        <div className="space-y-2 mb-4 bg-gray-50 p-3 rounded">
                          <div className="flex items-start gap-2 text-sm">
                            <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-bold text-foreground">
                                {new Date(match.dateTimeGMT).toLocaleString('en-IN', {
                                  dateStyle: 'medium',
                                  timeStyle: 'short',
                                  timeZone: 'Asia/Kolkata'
                                })}
                              </div>
                              <div className="text-xs text-muted-foreground">Indian Standard Time (IST)</div>
                            </div>
                          </div>
                          {match.venue && (
                            <div className="flex items-start gap-2 text-sm">
                              <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <div className="font-medium text-muted-foreground">{match.venue}</div>
                            </div>
                          )}
                        </div>

                        {/* Action Button */}
                        <Link href={`/match/${match.id}`}>
                          <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold">
                            VIEW CONTESTS
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center border-2 border-dashed">
                  <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-bold mb-2">No Upcoming Matches</h3>
                  <p className="text-muted-foreground mb-4">
                    There are currently no upcoming cricket matches available. Please check back later for new contests.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Match data is fetched in real-time from Cricket Data API. New matches are added automatically as they are scheduled.
                  </p>
                </Card>
              )}
            </TabsContent>

            {/* Live Matches */}
            <TabsContent value="live">
              {liveLoading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading live matches...</p>
                </div>
              ) : liveMatches && liveMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {liveMatches.map((match: any) => (
                    <Card key={match.id} className="card-angular border-2 border-primary hover:shadow-lg transition-all overflow-hidden">
                      <div className="h-2 bg-gradient-red-yellow animate-pulse"></div>
                      <CardContent className="p-6">
                        {/* Live Badge */}
                        <div className="mb-4 flex items-center justify-between">
                          <span className="inline-flex items-center bg-primary text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                            <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                            LIVE
                          </span>
                          <span className="text-xs font-bold text-muted-foreground">{match.matchType || 'T20'}</span>
                        </div>

                        {/* Teams with Scores */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                            <div className="flex items-center gap-3">
                              {match.t1img && (
                                <img src={match.t1img} alt={match.t1} className="w-10 h-10 object-contain" />
                              )}
                              <div className="font-black text-foreground">{match.t1}</div>
                            </div>
                            <div className="text-lg font-black text-primary">
                              {match.score?.t1 || '-'}
                            </div>
                          </div>
                          <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                            <div className="flex items-center gap-3">
                              {match.t2img && (
                                <img src={match.t2img} alt={match.t2} className="w-10 h-10 object-contain" />
                              )}
                              <div className="font-black text-foreground">{match.t2}</div>
                            </div>
                            <div className="text-lg font-black text-primary">
                              {match.score?.t2 || '-'}
                            </div>
                          </div>
                        </div>

                        {/* Match Status */}
                        {match.status && (
                          <div className="mb-4 p-3 bg-primary/5 rounded border-l-4 border-primary">
                            <p className="text-sm font-bold text-primary">{match.status}</p>
                          </div>
                        )}

                        {/* Action Button */}
                        <Link href={`/live/${match.id}`}>
                          <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold">
                            WATCH LIVE
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center border-2 border-dashed">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-bold mb-2">No Live Matches</h3>
                  <p className="text-muted-foreground mb-4">
                    There are no cricket matches currently in progress. Check the upcoming tab to see scheduled matches.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Live match data updates automatically every 30 seconds with real-time scores from Cricket Data API.
                  </p>
                </Card>
              )}
            </TabsContent>

            {/* Completed Matches */}
            <TabsContent value="completed">
              {completedLoading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading completed matches...</p>
                </div>
              ) : completedMatches && completedMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedMatches.map((match: any) => (
                    <Card key={match.id} className="card-angular border-2 border-gray-200 hover:border-primary transition-all overflow-hidden opacity-90">
                      <div className="h-2 bg-gray-400"></div>
                      <CardContent className="p-6">
                        {/* Completed Badge */}
                        <div className="mb-4">
                          <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">
                            COMPLETED
                          </span>
                        </div>

                        {/* Teams with Final Scores */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {match.t1img && (
                                <img src={match.t1img} alt={match.t1} className="w-10 h-10 object-contain" />
                              )}
                              <div className="font-black text-foreground">{match.t1}</div>
                            </div>
                            <div className="text-lg font-black text-muted-foreground">
                              {match.score?.t1 || '-'}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {match.t2img && (
                                <img src={match.t2img} alt={match.t2} className="w-10 h-10 object-contain" />
                              )}
                              <div className="font-black text-foreground">{match.t2}</div>
                            </div>
                            <div className="text-lg font-black text-muted-foreground">
                              {match.score?.t2 || '-'}
                            </div>
                          </div>
                        </div>

                        {/* Match Result */}
                        {match.status && (
                          <div className="mb-4 p-3 bg-gray-50 rounded">
                            <p className="text-sm font-bold text-foreground">{match.status}</p>
                          </div>
                        )}

                        {/* Action Button */}
                        <Link href={`/live/${match.id}`}>
                          <Button variant="outline" className="w-full border-2 border-gray-300 text-foreground hover:bg-gray-100 font-bold">
                            VIEW SCORECARD
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center border-2 border-dashed">
                  <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-bold mb-2">No Completed Matches</h3>
                  <p className="text-muted-foreground mb-4">
                    There are no recently completed cricket matches. Completed matches will appear here after they finish.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Match results and scorecards are available immediately after the match concludes.
                  </p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black mb-6 text-primary">About Fantasy Cricket Contests</h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground mb-4">
                <strong>Fantasy Basics</strong> offers 100% free fantasy cricket contests where you can showcase your cricket knowledge and compete with players across India. Our platform is designed purely for entertainment - there are no entry fees, no cash prizes, and no real money involved.
              </p>
              
              <h3 className="text-xl font-bold mb-3 text-foreground">How It Works:</h3>
              <ol className="list-decimal list-inside space-y-2 text-foreground mb-6">
                <li><strong>Choose a Match:</strong> Browse upcoming cricket matches from various tournaments and series</li>
                <li><strong>Join a Contest:</strong> Select a free contest to participate in (no payment required)</li>
                <li><strong>Build Your Team:</strong> Create your fantasy team of 11 players within the budget</li>
                <li><strong>Earn Points:</strong> Your players earn fantasy points based on their real match performance</li>
                <li><strong>Track Live:</strong> Watch your team's performance update in real-time during the match</li>
                <li><strong>Compete & Learn:</strong> Compare your team with others and improve your cricket strategy</li>
              </ol>
              
              <div className="bg-secondary/10 border-l-4 border-secondary p-4 rounded mb-6">
                <p className="text-sm font-bold text-secondary-foreground">
                  <strong>Important:</strong> Fantasy Basics is a free-to-play platform for entertainment only. We do not offer any monetary rewards, prizes, or gambling. This is a skill-based game designed to test your cricket knowledge.
                </p>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-foreground">Match Data:</h3>
              <p className="text-foreground mb-4">
                All match information, player statistics, and live scores are fetched in real-time from <strong>Cricket Data API</strong>. We display actual cricket matches from international and domestic tournaments. Match availability depends on the cricket calendar and ongoing tournaments.
              </p>
              
              <h3 className="text-xl font-bold mb-3 text-foreground">Eligibility:</h3>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Participants must be <strong>18 years or older</strong></li>
                <li>Not available in: <strong>Telangana, Andhra Pradesh, Assam, and Odisha</strong></li>
                <li>Valid for residents of India only</li>
              </ul>
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

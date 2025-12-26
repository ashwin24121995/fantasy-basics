import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Clock, MapPin, Trophy, TrendingUp, Calendar, Users } from "lucide-react";
import { Link, useLocation } from "wouter";
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

  // Helper function to format score
  const formatScore = (scoreArray: any[]) => {
    if (!scoreArray || scoreArray.length === 0) return null;
    const latestScore = scoreArray[scoreArray.length - 1];
    return `${latestScore.r}/${latestScore.w} (${latestScore.o} ov)`;
  };

  // Helper function to get team score from score array
  const getTeamScore = (scoreArray: any[], teamName: string) => {
    if (!scoreArray || scoreArray.length === 0) return '-';
    const teamScore = scoreArray.find((s: any) => s.inning?.includes(teamName));
    if (!teamScore) return '-';
    return `${teamScore.r}/${teamScore.w}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white relative z-50 shadow-md">
        <div className="container mx-auto px-4 py-0 flex items-center justify-between">
          <Link href="/" className="py-4">
            <img src="/kavera-logo.png" alt="Kavera" className="h-14 w-auto cursor-pointer" />
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
          <Tabs defaultValue="live" className="w-full">
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
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <p className="text-muted-foreground mt-4">Loading upcoming matches...</p>
                </div>
              ) : upcomingMatches && upcomingMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingMatches.map((match: any) => (
                    <Card key={match.id} className="card-angular border-2 border-gray-200 hover:border-primary transition-all overflow-hidden group">
                      <div className="h-2 bg-gradient-red-yellow"></div>
                      <CardContent className="p-6">
                        {/* Match Type & Series */}
                        <div className="mb-4 flex items-center justify-between">
                          <Badge variant="secondary" className="bg-primary/10 text-primary font-bold">
                            {match.matchType?.toUpperCase() || 'T20'}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <Calendar className="w-3 h-3 mr-1" />
                            UPCOMING
                          </Badge>
                        </div>

                        {/* Series Name */}
                        {match.name && (
                          <p className="text-xs text-muted-foreground mb-4 font-medium line-clamp-2">{match.name}</p>
                        )}

                        {/* Teams */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group-hover:bg-primary/5 transition-colors">
                            {match.teamInfo && match.teamInfo[0]?.img ? (
                              <img src={match.teamInfo[0].img} alt={match.teams[0]} className="w-12 h-12 object-contain" />
                            ) : (
                              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                <Users className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="font-black text-foreground">{match.teams[0]}</div>
                              {match.teamInfo && match.teamInfo[0]?.shortname && (
                                <div className="text-xs text-muted-foreground">{match.teamInfo[0].shortname}</div>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-sm font-black text-primary">VS</div>
                          </div>

                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group-hover:bg-primary/5 transition-colors">
                            {match.teamInfo && match.teamInfo[1]?.img ? (
                              <img src={match.teamInfo[1].img} alt={match.teams[1]} className="w-12 h-12 object-contain" />
                            ) : (
                              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                <Users className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="font-black text-foreground">{match.teams[1]}</div>
                              {match.teamInfo && match.teamInfo[1]?.shortname && (
                                <div className="text-xs text-muted-foreground">{match.teamInfo[1].shortname}</div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Match Details */}
                        <div className="space-y-2 mb-4 bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-start gap-2 text-sm">
                            <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
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
                              <div className="font-medium text-muted-foreground text-xs">{match.venue}</div>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold"
                            onClick={() => {
                              if (!isAuthenticated) {
                                window.location.href = getLoginUrl();
                              } else {
                                window.location.href = `/create-team/${match.id}`;
                              }
                            }}
                          >
                            CREATE TEAM
                          </Button>
                          <Button 
                            variant="outline"
                            className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold"
                            onClick={() => window.location.href = `/matches/${match.id}`}
                          >
                            VIEW CONTESTS
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center border-2 border-dashed">
                  <Clock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
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
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <p className="text-muted-foreground mt-4">Loading live matches...</p>
                </div>
              ) : liveMatches && liveMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {liveMatches.map((match: any) => (
                    <Card key={match.id} className="card-angular border-2 border-primary hover:shadow-xl transition-all overflow-hidden group">
                      <div className="h-2 bg-gradient-red-yellow animate-pulse"></div>
                      <CardContent className="p-6">
                        {/* Live Badge & Match Type */}
                        <div className="mb-4 flex items-center justify-between">
                          <Badge className="bg-primary text-white font-bold animate-pulse">
                            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></span>
                            LIVE NOW
                          </Badge>
                          <Badge variant="secondary" className="bg-primary/10 text-primary font-bold">
                            {match.matchType?.toUpperCase() || 'T20'}
                          </Badge>
                        </div>

                        {/* Series Name */}
                        {match.name && (
                          <p className="text-xs text-muted-foreground mb-4 font-medium line-clamp-2">{match.name}</p>
                        )}

                        {/* Teams with Scores */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border-l-4 border-primary">
                            <div className="flex items-center gap-3 flex-1">
                              {match.teamInfo && match.teamInfo[0]?.img ? (
                                <img src={match.teamInfo[0].img} alt={match.teams[0]} className="w-10 h-10 object-contain" />
                              ) : (
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                  <Users className="w-5 h-5 text-gray-400" />
                                </div>
                              )}
                              <div>
                                <div className="font-black text-foreground">{match.teams[0]}</div>
                                {match.teamInfo && match.teamInfo[0]?.shortname && (
                                  <div className="text-xs text-muted-foreground">{match.teamInfo[0].shortname}</div>
                                )}
                              </div>
                            </div>
                            <div className="text-xl font-black text-primary">
                              {getTeamScore(match.score, match.teams[0])}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-secondary/5 to-transparent rounded-lg border-l-4 border-secondary">
                            <div className="flex items-center gap-3 flex-1">
                              {match.teamInfo && match.teamInfo[1]?.img ? (
                                <img src={match.teamInfo[1].img} alt={match.teams[1]} className="w-10 h-10 object-contain" />
                              ) : (
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                  <Users className="w-5 h-5 text-gray-400" />
                                </div>
                              )}
                              <div>
                                <div className="font-black text-foreground">{match.teams[1]}</div>
                                {match.teamInfo && match.teamInfo[1]?.shortname && (
                                  <div className="text-xs text-muted-foreground">{match.teamInfo[1].shortname}</div>
                                )}
                              </div>
                            </div>
                            <div className="text-xl font-black text-secondary">
                              {getTeamScore(match.score, match.teams[1])}
                            </div>
                          </div>
                        </div>

                        {/* Match Status */}
                        {match.status && (
                          <div className="mb-4 p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                            <p className="text-sm font-bold text-primary line-clamp-2">{match.status}</p>
                          </div>
                        )}

                        {/* Venue */}
                        {match.venue && (
                          <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span className="line-clamp-1">{match.venue}</span>
                          </div>
                        )}

                        {/* Action Button */}
                        <Button 
                          className="w-full bg-primary hover:bg-primary/90 text-white font-bold"
                          onClick={() => window.location.href = `/matches/${match.id}/live`}
                        >
                          <TrendingUp className="w-4 h-4 mr-2" />
                          WATCH LIVE
                        </Button>
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
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <p className="text-muted-foreground mt-4">Loading completed matches...</p>
                </div>
              ) : completedMatches && completedMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedMatches.map((match: any) => (
                    <Card key={match.id} className="card-angular border-2 border-gray-200 hover:border-primary transition-all overflow-hidden opacity-90 hover:opacity-100 group">
                      <div className="h-2 bg-gray-400"></div>
                      <CardContent className="p-6">
                        {/* Match Type & Completed Badge */}
                        <div className="mb-4 flex items-center justify-between">
                          <Badge variant="secondary" className="bg-gray-100 text-gray-600 font-bold">
                            {match.matchType?.toUpperCase() || 'T20'}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-gray-300">
                            <Trophy className="w-3 h-3 mr-1" />
                            COMPLETED
                          </Badge>
                        </div>

                        {/* Series Name */}
                        {match.name && (
                          <p className="text-xs text-muted-foreground mb-4 font-medium line-clamp-2">{match.name}</p>
                        )}

                        {/* Teams with Final Scores */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3 flex-1">
                              {match.teamInfo && match.teamInfo[0]?.img ? (
                                <img src={match.teamInfo[0].img} alt={match.teams[0]} className="w-10 h-10 object-contain opacity-70" />
                              ) : (
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                  <Users className="w-5 h-5 text-gray-400" />
                                </div>
                              )}
                              <div>
                                <div className="font-black text-foreground">{match.teams[0]}</div>
                                {match.teamInfo && match.teamInfo[0]?.shortname && (
                                  <div className="text-xs text-muted-foreground">{match.teamInfo[0].shortname}</div>
                                )}
                              </div>
                            </div>
                            <div className="text-lg font-black text-gray-600">
                              {getTeamScore(match.score, match.teams[0])}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3 flex-1">
                              {match.teamInfo && match.teamInfo[1]?.img ? (
                                <img src={match.teamInfo[1].img} alt={match.teams[1]} className="w-10 h-10 object-contain opacity-70" />
                              ) : (
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                  <Users className="w-5 h-5 text-gray-400" />
                                </div>
                              )}
                              <div>
                                <div className="font-black text-foreground">{match.teams[1]}</div>
                                {match.teamInfo && match.teamInfo[1]?.shortname && (
                                  <div className="text-xs text-muted-foreground">{match.teamInfo[1].shortname}</div>
                                )}
                              </div>
                            </div>
                            <div className="text-lg font-black text-gray-600">
                              {getTeamScore(match.score, match.teams[1])}
                            </div>
                          </div>
                        </div>

                        {/* Match Result */}
                        {match.status && (
                          <div className="mb-4 p-3 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                            <p className="text-sm font-bold text-gray-700 line-clamp-2">{match.status}</p>
                          </div>
                        )}

                        {/* Venue */}
                        {match.venue && (
                          <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span className="line-clamp-1">{match.venue}</span>
                          </div>
                        )}

                        {/* Action Button */}
                        <Button 
                          variant="outline" 
                          className="w-full border-2 border-gray-300 hover:border-primary hover:bg-primary hover:text-white font-bold transition-colors"
                          onClick={() => window.location.href = `/matches/${match.id}`}
                        >
                          VIEW DETAILS
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center border-2 border-dashed">
                  <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-bold mb-2">No Completed Matches</h3>
                  <p className="text-muted-foreground mb-4">
                    There are no completed matches to display. Completed matches will appear here after they finish.
                  </p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-navy text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <img src="/kavera-logo.png" alt="Kavera" className="h-12 mb-4" />
              <p className="text-sm text-white/70">
                100% free fantasy cricket platform for entertainment purposes only.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold mb-4">QUICK LINKS</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-white/70 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/how-to-play" className="text-white/70 hover:text-white transition-colors">How to Play</Link></li>
                <li><Link href="/faq" className="text-white/70 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="text-white/70 hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-bold mb-4">LEGAL</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="text-white/70 hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="text-white/70 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/responsible-gaming" className="text-white/70 hover:text-white transition-colors">Responsible Gaming</Link></li>
                <li><Link href="/fair-play" className="text-white/70 hover:text-white transition-colors">Fair Play</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useRoute, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, RefreshCw, Trophy, TrendingUp } from "lucide-react";

export default function LiveMatch() {
  const [, params] = useRoute("/matches/:matchId/live");
  const matchId = params?.matchId || "";

  const utils = trpc.useUtils();

  // Fetch match data
  const { data: match, isLoading: loadingMatch } = trpc.matches.getMatchById.useQuery(
    { matchId },
    { enabled: !!matchId, refetchInterval: 30000 } // Refetch every 30 seconds
  );

  // Fetch scorecard
  const { data: scorecard, isLoading: loadingScorecard } = trpc.matches.getMatchScorecard.useQuery(
    { matchId },
    { enabled: !!matchId, refetchInterval: 30000 }
  );

  // Fetch fantasy points
  const { data: fantasyPoints, isLoading: loadingPoints } = trpc.matches.getFantasyPoints.useQuery(
    { matchId },
    { enabled: !!matchId, refetchInterval: 30000 }
  );

  // Manual refresh function
  const handleRefresh = () => {
    utils.matches.getMatchById.invalidate({ matchId });
    utils.matches.getMatchScorecard.invalidate({ matchId });
    utils.matches.getFantasyPoints.invalidate({ matchId });
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, 30000);

    return () => clearInterval(interval);
  }, [matchId]);

  if (loadingMatch) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Match not found</p>
              <Link href="/matches">
                <Button className="mt-4">Back to Matches</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const scoreData = match.scoreData ? JSON.parse(match.scoreData) : [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation activePage="contests" />
      
      {/* Live Match Header */}
      <div className="border-b bg-white sticky top-0 z-40">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/matches/${matchId}`}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold">{match.name}</h1>
                  <Badge variant="destructive" className="animate-pulse">
                    LIVE
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{match.status}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-6">
        {/* Live Score Card */}
        <Card className="mb-6 border-accent">
          <CardHeader>
            <CardTitle>Live Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Team 1 */}
              <div className="flex items-center gap-4">
                <img src={match.team1Img || ""} alt={match.team1 || ""} className="h-16 w-16 rounded-full" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{match.team1}</h3>
                  {scoreData[0] && (
                    <div>
                      <p className="text-3xl font-bold">
                        {scoreData[0].r}/{scoreData[0].w}
                      </p>
                      <p className="text-sm text-muted-foreground">({scoreData[0].o} overs)</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Team 2 */}
              <div className="flex items-center gap-4">
                <img src={match.team2Img || ""} alt={match.team2 || ""} className="h-16 w-16 rounded-full" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{match.team2}</h3>
                  {scoreData[1] && (
                    <div>
                      <p className="text-3xl font-bold">
                        {scoreData[1].r}/{scoreData[1].w}
                      </p>
                      <p className="text-sm text-muted-foreground">({scoreData[1].o} overs)</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Scorecard and Fantasy Points */}
        <Tabs defaultValue="scorecard">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="scorecard">Scorecard</TabsTrigger>
            <TabsTrigger value="points">Fantasy Points</TabsTrigger>
          </TabsList>

          {/* Scorecard Tab */}
          <TabsContent value="scorecard" className="mt-6">
            {loadingScorecard ? (
              <Card>
                <CardContent className="py-12">
                  <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-muted rounded"></div>
                    <div className="h-8 bg-muted rounded"></div>
                    <div className="h-8 bg-muted rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ) : scorecard ? (
              <div className="space-y-6">
                {/* Batting Scorecard */}
                {scorecard.scorecard && scorecard.scorecard.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Batting</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {scorecard.scorecard.map((inning: any, inningIdx: number) => (
                        <div key={inningIdx} className="mb-6">
                          <h4 className="font-semibold mb-3">{inning.innings}</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left py-2">Batsman</th>
                                  <th className="text-center py-2">R</th>
                                  <th className="text-center py-2">B</th>
                                  <th className="text-center py-2">4s</th>
                                  <th className="text-center py-2">6s</th>
                                  <th className="text-center py-2">SR</th>
                                </tr>
                              </thead>
                              <tbody>
                                {inning.batting.map((batsman: any, idx: number) => (
                                  <tr key={idx} className="border-b">
                                    <td className="py-2">{batsman.name}</td>
                                    <td className="text-center">{batsman.r}</td>
                                    <td className="text-center">{batsman.b}</td>
                                    <td className="text-center">{batsman["4s"]}</td>
                                    <td className="text-center">{batsman["6s"]}</td>
                                    <td className="text-center">{batsman.sr}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Bowling Scorecard */}
                {scorecard.scorecard && scorecard.scorecard.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Bowling</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {scorecard.scorecard.map((inning: any, inningIdx: number) => (
                        <div key={inningIdx} className="mb-6">
                          <h4 className="font-semibold mb-3">{inning.innings}</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left py-2">Bowler</th>
                                  <th className="text-center py-2">O</th>
                                  <th className="text-center py-2">M</th>
                                  <th className="text-center py-2">R</th>
                                  <th className="text-center py-2">W</th>
                                  <th className="text-center py-2">Econ</th>
                                </tr>
                              </thead>
                              <tbody>
                                {inning.bowling.map((bowler: any, idx: number) => (
                                  <tr key={idx} className="border-b">
                                    <td className="py-2">{bowler.name}</td>
                                    <td className="text-center">{bowler.o}</td>
                                    <td className="text-center">{bowler.m}</td>
                                    <td className="text-center">{bowler.r}</td>
                                    <td className="text-center">{bowler.w}</td>
                                    <td className="text-center">{bowler.eco}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Scorecard not available yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Fantasy Points Tab */}
          <TabsContent value="points" className="mt-6">
            {loadingPoints ? (
              <Card>
                <CardContent className="py-12">
                  <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-muted rounded"></div>
                    <div className="h-8 bg-muted rounded"></div>
                    <div className="h-8 bg-muted rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ) : fantasyPoints && Array.isArray(fantasyPoints) && fantasyPoints.length > 0 ? (
              <div className="space-y-4">
                {fantasyPoints.map((teamData: any, teamIdx: number) => (
                  <Card key={teamIdx}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-accent" />
                        {teamData.name}
                      </CardTitle>
                      <CardDescription>Fantasy points for each player</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Array.isArray(teamData.players) && teamData.players.map((player: any, idx: number) => (
                          <div key={idx} className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              {player.playerImg && (
                                <img
                                  src={player.playerImg}
                                  alt={player.name}
                                  className="h-10 w-10 rounded-full object-cover"
                                />
                              )}
                              <div>
                                <p className="font-medium">{player.name}</p>
                                <p className="text-sm text-muted-foreground">{player.role}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-accent" />
                              <span className="text-xl font-bold">{player.points}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Fantasy points not available yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
}

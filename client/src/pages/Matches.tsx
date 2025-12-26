import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { Calendar, Clock, Zap, Trophy, ArrowLeft } from "lucide-react";

export default function Matches() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "live" | "completed">("upcoming");

  const { data: upcomingMatches, isLoading: loadingUpcoming } = trpc.matches.getUpcomingMatches.useQuery();
  const { data: liveMatches, isLoading: loadingLive } = trpc.matches.getLiveMatches.useQuery();
  const { data: completedMatches, isLoading: loadingCompleted } = trpc.matches.getCompletedMatches.useQuery();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold">All Matches</h1>
          <p className="text-muted-foreground mt-2">
            Browse all cricket matches and join contests to win prizes
          </p>
        </div>
      </div>

      {/* Matches Tabs */}
      <div className="container py-8">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="upcoming" className="gap-2">
              <Calendar className="h-4 w-4" />
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="live" className="gap-2">
              <Zap className="h-4 w-4" />
              Live
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <Trophy className="h-4 w-4" />
              Completed
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Matches */}
          <TabsContent value="upcoming" className="mt-6">
            {loadingUpcoming ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                      <div className="h-6 bg-muted rounded w-2/3"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-24 bg-muted rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : upcomingMatches && upcomingMatches.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {upcomingMatches.map((match) => (
                  <Card key={match.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">Upcoming</Badge>
                        <span className="text-sm text-muted-foreground">{match.matchType.toUpperCase()}</span>
                      </div>
                      <CardTitle className="text-lg">{match.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {new Date(match.dateTimeGMT).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img src={match.t1img} alt={match.t1} className="h-8 w-8 rounded-full" />
                            <span className="font-medium">{match.t1}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-center text-muted-foreground text-sm">vs</div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img src={match.t2img} alt={match.t2} className="h-8 w-8 rounded-full" />
                            <span className="font-medium">{match.t2}</span>
                          </div>
                        </div>
                      </div>
                      <Link href={`/matches/${match.id}`}>
                        <Button className="w-full">View Contests</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No upcoming matches at the moment.</p>
                  <p className="text-sm text-muted-foreground mt-2">Check back soon for new matches!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Live Matches */}
          <TabsContent value="live" className="mt-6">
            {loadingLive ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                      <div className="h-6 bg-muted rounded w-2/3"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-24 bg-muted rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : liveMatches && liveMatches.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {liveMatches.map((match) => (
                  <Card key={match.id} className="hover:shadow-lg transition-shadow border-accent">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="destructive" className="animate-pulse">
                          LIVE
                        </Badge>
                        <span className="text-sm text-muted-foreground">{match.matchType.toUpperCase()}</span>
                      </div>
                      <CardTitle className="text-lg">{match.name}</CardTitle>
                      <CardDescription>{match.status}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img src={match.t1img} alt={match.t1} className="h-8 w-8 rounded-full" />
                            <span className="font-medium">{match.t1}</span>
                          </div>
                          {match.score[0] && (
                            <span className="font-bold">
                              {match.score[0].r}/{match.score[0].w} ({match.score[0].o})
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img src={match.t2img} alt={match.t2} className="h-8 w-8 rounded-full" />
                            <span className="font-medium">{match.t2}</span>
                          </div>
                          {match.score[1] && (
                            <span className="font-bold">
                              {match.score[1].r}/{match.score[1].w} ({match.score[1].o})
                            </span>
                          )}
                        </div>
                      </div>
                      <Link href={`/matches/${match.id}/live`}>
                        <Button className="w-full" variant="default">
                          Watch Live
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No live matches at the moment.</p>
                  <p className="text-sm text-muted-foreground mt-2">Live matches will appear here when they start!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Completed Matches */}
          <TabsContent value="completed" className="mt-6">
            {loadingCompleted ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                      <div className="h-6 bg-muted rounded w-2/3"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-24 bg-muted rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : completedMatches && completedMatches.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {completedMatches.map((match) => (
                  <Card key={match.id} className="hover:shadow-lg transition-shadow opacity-90">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">Completed</Badge>
                        <span className="text-sm text-muted-foreground">{match.matchType.toUpperCase()}</span>
                      </div>
                      <CardTitle className="text-lg">{match.name}</CardTitle>
                      <CardDescription>{match.status}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img src={match.t1img} alt={match.t1} className="h-8 w-8 rounded-full" />
                            <span className="font-medium">{match.t1}</span>
                          </div>
                          {match.score[0] && (
                            <span className="font-bold text-sm">
                              {match.score[0].r}/{match.score[0].w}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img src={match.t2img} alt={match.t2} className="h-8 w-8 rounded-full" />
                            <span className="font-medium">{match.t2}</span>
                          </div>
                          {match.score[1] && (
                            <span className="font-bold text-sm">
                              {match.score[1].r}/{match.score[1].w}
                            </span>
                          )}
                        </div>
                      </div>
                      <Link href={`/matches/${match.id}`}>
                        <Button className="w-full" variant="outline">
                          View Results
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No completed matches yet.</p>
                  <p className="text-sm text-muted-foreground mt-2">Completed matches will appear here!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

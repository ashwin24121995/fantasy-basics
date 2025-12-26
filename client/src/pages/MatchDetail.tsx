import { useRoute, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Trophy, Clock, Zap } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function MatchDetail() {
  const [, params] = useRoute("/matches/:matchId");
  const matchId = params?.matchId || "";
  const { isAuthenticated } = useAuth();

  const { data: match, isLoading: loadingMatch } = trpc.matches.getMatchById.useQuery(
    { matchId },
    { enabled: !!matchId }
  );

  const { data: contests, isLoading: loadingContests } = trpc.contests.getContestsByMatch.useQuery(
    { matchId },
    { enabled: !!matchId }
  );

  if (loadingMatch) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-32 bg-muted rounded"></div>
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

  const isLive = match.matchState === "live";
  const isUpcoming = match.matchState === "fixture";
  const isCompleted = match.matchState === "result";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container py-6">
          <Link href="/matches">
            <Button variant="ghost" size="sm" className="gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Matches
            </Button>
          </Link>

          {/* Match Info Card */}
          <Card className={isLive ? "border-accent" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                {isLive && (
                  <Badge variant="destructive" className="animate-pulse">
                    LIVE
                  </Badge>
                )}
                {isUpcoming && <Badge variant="secondary">Upcoming</Badge>}
                {isCompleted && <Badge variant="outline">Completed</Badge>}
                <span className="text-sm text-muted-foreground">{match.matchType?.toUpperCase()}</span>
              </div>
              <CardTitle className="text-2xl">{match.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                {isUpcoming && (
                  <>
                    <Clock className="h-4 w-4" />
                    {new Date(match.dateTimeGMT).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </>
                )}
                {(isLive || isCompleted) && match.status}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Team 1 */}
                <div className="flex items-center gap-4">
                  <img src={match.team1Img || ""} alt={match.team1 || ""} className="h-16 w-16 rounded-full" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{match.team1}</h3>
                    {match.scoreData && JSON.parse(match.scoreData)[0] && (
                      <p className="text-2xl font-bold">
                        {JSON.parse(match.scoreData)[0].r}/{JSON.parse(match.scoreData)[0].w}
                        <span className="text-sm text-muted-foreground ml-2">
                          ({JSON.parse(match.scoreData)[0].o} ov)
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Team 2 */}
                <div className="flex items-center gap-4">
                  <img src={match.team2Img || ""} alt={match.team2 || ""} className="h-16 w-16 rounded-full" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{match.team2}</h3>
                    {match.scoreData && JSON.parse(match.scoreData)[1] && (
                      <p className="text-2xl font-bold">
                        {JSON.parse(match.scoreData)[1].r}/{JSON.parse(match.scoreData)[1].w}
                        <span className="text-sm text-muted-foreground ml-2">
                          ({JSON.parse(match.scoreData)[1].o} ov)
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {isLive && (
                <Link href={`/matches/${matchId}/live`}>
                  <Button className="w-full mt-6" size="lg">
                    <Zap className="h-5 w-5 mr-2" />
                    Watch Live Match
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contests Section */}
      <div className="container py-8">
        <h2 className="text-2xl font-bold mb-6">Available Contests</h2>

        {loadingContests ? (
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-1/3"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : contests && contests.length > 0 ? (
          <div className="grid gap-4">
            {contests.map((contest) => {
              const spotsLeft = contest.maxEntries - contest.currentEntries;
              const percentFilled = (contest.currentEntries / contest.maxEntries) * 100;

              return (
                <Card key={contest.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{contest.name}</CardTitle>
                        {contest.description && <CardDescription>{contest.description}</CardDescription>}
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="text-lg px-4 py-2">
                          <Trophy className="h-5 w-5 mr-2" />
                          Free Contest
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Spots Left</p>
                        <p className="text-lg font-semibold flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {spotsLeft} / {contest.maxEntries}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <Badge variant={contest.status === "upcoming" ? "secondary" : "outline"}>
                          {contest.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent transition-all"
                          style={{ width: `${percentFilled}%` }}
                        ></div>
                      </div>
                    </div>

                    {isAuthenticated ? (
                      <Link href={`/matches/${matchId}/team-builder?contestId=${contest.id}`}>
                        <Button className="w-full" disabled={spotsLeft === 0 || !isUpcoming}>
                          {spotsLeft === 0 ? "Contest Full" : !isUpcoming ? "Contest Closed" : "Create Team & Join"}
                        </Button>
                      </Link>
                    ) : (
                      <a href={getLoginUrl()}>
                        <Button className="w-full">Login to Join Contest</Button>
                      </a>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No contests available for this match yet.</p>
              <p className="text-sm text-muted-foreground mt-2">Check back soon!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

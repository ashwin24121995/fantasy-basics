import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Trophy, Users, Calendar, LogOut, ArrowLeft } from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { data: userTeams, isLoading: loadingTeams } = trpc.teams.getUserTeams.useQuery();
  const { data: userContests, isLoading: loadingContests } = trpc.contests.getUserContests.useQuery();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Please login to view your dashboard</p>
            <Link href="/">
              <Button className="mt-4">Go to Homepage</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container py-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userTeams?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Teams created</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contests Joined</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userContests?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Active contests</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Account Status</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Badge variant="secondary">Active</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {user.state ? `Location: ${user.state}` : "Profile complete"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Teams and Contests */}
        <Tabs defaultValue="teams">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="teams">My Teams</TabsTrigger>
            <TabsTrigger value="contests">My Contests</TabsTrigger>
          </TabsList>

          {/* My Teams Tab */}
          <TabsContent value="teams" className="mt-6">
            {loadingTeams ? (
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
            ) : userTeams && userTeams.length > 0 ? (
              <div className="grid gap-4">
                {userTeams.map((team) => (
                  <Card key={team.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{team.teamName}</CardTitle>
                        <Badge variant="outline">
                          {parseFloat(team.totalPoints)} pts
                        </Badge>
                      </div>
                      <CardDescription>Match ID: {team.matchId}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Captain</p>
                          <p className="font-medium">{team.captainId}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Vice Captain</p>
                          <p className="font-medium">{team.viceCaptainId}</p>
                        </div>
                      </div>
                      {team.rank && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex items-center gap-2">
                            <Trophy className="h-5 w-5 text-accent" />
                            <span className="font-semibold">Rank: #{team.rank}</span>
                          </div>
                        </div>
                      )}
                      <Link href={`/matches/${team.matchId}`}>
                        <Button className="w-full mt-4" variant="outline">
                          View Match
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">You haven't created any teams yet.</p>
                  <Link href="/matches">
                    <Button className="mt-4">Browse Matches</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* My Contests Tab */}
          <TabsContent value="contests" className="mt-6">
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
            ) : userContests && userContests.length > 0 ? (
              <div className="grid gap-4">
                {userContests.map((entry) => (
                  <Card key={entry.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Contest #{entry.contestId}</CardTitle>
                        {entry.finalRank && (
                          <Badge variant="default">Rank #{entry.finalRank}</Badge>
                        )}
                      </div>
                      <CardDescription>
                        Entry Fee: {parseFloat(entry.entryFee) === 0 ? "FREE" : `₹${entry.entryFee}`}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Team ID:</span>
                          <span className="font-medium">#{entry.userTeamId}</span>
                        </div>
                        {parseFloat(entry.winnings) > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Winnings:</span>
                            <span className="font-bold text-accent">₹{entry.winnings}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Joined:</span>
                          <span className="font-medium">
                            {new Date(entry.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">You haven't joined any contests yet.</p>
                  <Link href="/matches">
                    <Button className="mt-4">Join a Contest</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Profile Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{user.name || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email || "Not provided"}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">State</p>
                  <p className="font-medium">{user.state || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Age Verified</p>
                  <p className="font-medium">
                    {user.isAgeVerified ? (
                      <Badge variant="secondary">Verified</Badge>
                    ) : (
                      <Badge variant="outline">Not Verified</Badge>
                    )}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium">
                    {new Date(user.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Login</p>
                  <p className="font-medium">
                    {new Date(user.lastSignedIn).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

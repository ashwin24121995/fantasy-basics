import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, Trophy, Users, Calendar, LogOut, ArrowLeft, TrendingUp, 
  Target, Award, Clock, CheckCircle2, XCircle, Activity, BarChart3,
  Shield, Star, Zap, Medal
} from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { data: userTeams, isLoading: loadingTeams } = trpc.teams.getUserTeams.useQuery();
  const { data: userContests, isLoading: loadingContests } = trpc.contests.getUserContests.useQuery();

  const handleLogout = () => {
    // Clear JWT token from localStorage
    localStorage.removeItem('auth_token');
    logout();
    window.location.href = "/";
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="py-12 text-center">
            <Shield className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Please Login</h2>
            <p className="text-muted-foreground mb-6">You need to be logged in to view your dashboard</p>
            <Link href="/login">
              <Button className="bg-red-600 hover:bg-red-700 text-white font-bold">
                Go to Login
              </Button>
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

  // Calculate user statistics
  const totalTeams = userTeams?.length || 0;
  const totalContests = userContests?.length || 0;
  const totalPoints = userTeams?.reduce((sum, team) => sum + parseFloat(team.totalPoints.toString()), 0) || 0;
  const averagePoints = totalTeams > 0 ? (totalPoints / totalTeams).toFixed(1) : "0.0";
  const topRank = userTeams?.reduce((best, team) => {
    const rank = team.rank ? parseInt(team.rank.toString()) : Infinity;
    return rank < best ? rank : best;
  }, Infinity);
  const bestRank = topRank !== Infinity ? topRank : null;

  // Calculate win rate (contests with rank <= 3)
  const topThreeFinishes = userContests?.filter(c => c.finalRank && parseInt(c.finalRank.toString()) <= 3).length || 0;
  const winRate = totalContests > 0 ? ((topThreeFinishes / totalContests) * 100).toFixed(1) : "0.0";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation activePage="dashboard" />
      
      {/* Hero Section with Angular Design */}
      <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 overflow-hidden">
        {/* Angular diagonal stripe */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 opacity-20 transform rotate-12 translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-32 bg-red-700 opacity-30 transform -skew-y-2"></div>
        
        <div className="container relative z-10 py-12">
          <div className="flex items-center justify-between mb-6">
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout} 
              className="gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
          
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-white/30">
              <AvatarFallback className="text-3xl bg-white text-red-600 font-black">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-black text-white">{user.name}</h1>
                <Badge className="bg-yellow-400 text-slate-900 font-bold">
                  {user.role === 'admin' ? 'ADMIN' : 'PLAYER'}
                </Badge>
              </div>
              <p className="text-white/90 text-lg mb-2">{user.email}</p>
              <div className="flex items-center gap-4 text-sm text-white/80">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(user.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
                </div>
                {user.state && (
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    <span>{user.state}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8 flex-1">
        {/* Performance Overview Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-yellow-400" />
            Performance Overview
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Total Teams */}
            <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-0 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
                <Users className="h-5 w-5 text-blue-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black">{totalTeams}</div>
                <p className="text-xs text-blue-100 mt-1">Teams created</p>
              </CardContent>
            </Card>

            {/* Total Contests */}
            <Card className="bg-gradient-to-br from-green-600 to-green-700 border-0 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contests Joined</CardTitle>
                <Trophy className="h-5 w-5 text-green-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black">{totalContests}</div>
                <p className="text-xs text-green-100 mt-1">Active & completed</p>
              </CardContent>
            </Card>

            {/* Average Points */}
            <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 border-0 text-slate-900">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Points</CardTitle>
                <TrendingUp className="h-5 w-5 text-yellow-800" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black">{averagePoints}</div>
                <p className="text-xs text-slate-800 mt-1">Per team average</p>
              </CardContent>
            </Card>

            {/* Best Rank */}
            <Card className="bg-gradient-to-br from-red-600 to-red-700 border-0 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Best Rank</CardTitle>
                <Award className="h-5 w-5 text-red-200" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black">
                  {bestRank ? `#${bestRank}` : "N/A"}
                </div>
                <p className="text-xs text-red-100 mt-1">Highest achievement</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Statistics */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {/* Total Points Card */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Total Points Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-slate-900 mb-2">
                {totalPoints.toFixed(1)}
              </div>
              <p className="text-sm text-slate-600">
                Accumulated across all {totalTeams} teams
              </p>
            </CardContent>
          </Card>

          {/* Win Rate Card */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Medal className="h-5 w-5 text-green-500" />
                Top 3 Finish Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-slate-900 mb-2">
                {winRate}%
              </div>
              <p className="text-sm text-slate-600">
                {topThreeFinishes} out of {totalContests} contests
              </p>
            </CardContent>
          </Card>

          {/* Account Status Card */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Age Verified</span>
                  {user.isAgeVerified ? (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-red-600">
                      <XCircle className="h-3 w-3 mr-1" />
                      Not Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Account Type</span>
                  <Badge className="bg-blue-100 text-blue-800">
                    {user.role === 'admin' ? 'Administrator' : 'Standard User'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Status</span>
                  <Badge className="bg-green-100 text-green-800">
                    <Activity className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Teams and Contests */}
        <Tabs defaultValue="teams" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-slate-800">
            <TabsTrigger value="teams" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              My Teams ({totalTeams})
            </TabsTrigger>
            <TabsTrigger value="contests" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              My Contests ({totalContests})
            </TabsTrigger>
          </TabsList>

          {/* My Teams Tab */}
          <TabsContent value="teams">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-yellow-400" />
                All Your Teams
              </h3>
              <Link href="/matches">
                <Button className="bg-red-600 hover:bg-red-700 text-white font-bold">
                  Create New Team
                </Button>
              </Link>
            </div>

            {loadingTeams ? (
              <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse bg-slate-800 border-slate-700">
                    <CardHeader>
                      <div className="h-6 bg-slate-700 rounded w-1/3"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-20 bg-slate-700 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : userTeams && userTeams.length > 0 ? (
              <div className="grid gap-4">
                {userTeams.map((team) => (
                  <Card key={team.id} className="bg-white hover:shadow-xl transition-shadow border-2 border-slate-200 hover:border-red-400">
                    <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500" />
                            {team.teamName}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            Match ID: {team.matchId}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-black text-red-600">
                            {parseFloat(team.totalPoints).toFixed(1)}
                          </div>
                          <p className="text-xs text-slate-600 font-medium">POINTS</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 gap-6 mb-4">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <p className="text-xs text-blue-600 font-bold mb-1">CAPTAIN</p>
                          <p className="font-bold text-slate-900">Player #{team.captainId}</p>
                          <p className="text-xs text-slate-600 mt-1">2x Points</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <p className="text-xs text-green-600 font-bold mb-1">VICE CAPTAIN</p>
                          <p className="font-bold text-slate-900">Player #{team.viceCaptainId}</p>
                          <p className="text-xs text-slate-600 mt-1">1.5x Points</p>
                        </div>
                      </div>
                      
                      {team.rank && (
                        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg border-2 border-yellow-300 mb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Trophy className="h-8 w-8 text-yellow-600" />
                              <div>
                                <p className="text-sm text-yellow-800 font-bold">CURRENT RANK</p>
                                <p className="text-2xl font-black text-yellow-900">#{team.rank}</p>
                              </div>
                            </div>
                            <Badge className="bg-yellow-500 text-slate-900 font-bold text-lg px-4 py-2">
                              TOP PERFORMER
                            </Badge>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3">
                        <Link href={`/matches/${team.matchId}`}>
                          <Button className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold">
                            View Match
                          </Button>
                        </Link>
                        <Button variant="outline" className="w-full border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold">
                          View Team Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="py-16 text-center">
                  <Users className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No Teams Yet</h3>
                  <p className="text-slate-400 mb-6 max-w-md mx-auto">
                    Start your fantasy cricket journey by creating your first team. 
                    Choose from upcoming matches and build your dream squad!
                  </p>
                  <Link href="/matches">
                    <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-6 text-lg">
                      Browse Matches & Create Team
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* My Contests Tab */}
          <TabsContent value="contests">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-400" />
                Contest History
              </h3>
              <Link href="/matches">
                <Button className="bg-red-600 hover:bg-red-700 text-white font-bold">
                  Join New Contest
                </Button>
              </Link>
            </div>

            {loadingContests ? (
              <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse bg-slate-800 border-slate-700">
                    <CardHeader>
                      <div className="h-6 bg-slate-700 rounded w-1/3"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-20 bg-slate-700 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : userContests && userContests.length > 0 ? (
              <div className="grid gap-4">
                {userContests.map((entry) => {
                  const rank = entry.finalRank ? parseInt(entry.finalRank.toString()) : null;
                  const isTopThree = rank && rank <= 3;
                  
                  return (
                    <Card key={entry.id} className="bg-white hover:shadow-xl transition-shadow border-2 border-slate-200 hover:border-red-400">
                      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-xl">Contest #{entry.contestId}</CardTitle>
                            <CardDescription className="mt-1">
                              Free Contest • Team #{entry.userTeamId}
                            </CardDescription>
                          </div>
                          {rank && (
                            <Badge className={`text-lg px-4 py-2 font-bold ${
                              isTopThree 
                                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900' 
                                : 'bg-slate-200 text-slate-700'
                            }`}>
                              {isTopThree && <Medal className="h-4 w-4 mr-1" />}
                              Rank #{rank}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                            <p className="text-xs text-slate-600 font-bold mb-1">JOINED DATE</p>
                            <p className="font-bold text-slate-900">
                              {new Date(entry.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric"
                              })}
                            </p>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                            <p className="text-xs text-slate-600 font-bold mb-1">CONTEST TYPE</p>
                            <p className="font-bold text-slate-900">100% Free</p>
                          </div>
                        </div>

                        {isTopThree && (
                          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border-2 border-green-300 mb-4">
                            <div className="flex items-center gap-3">
                              <Award className="h-8 w-8 text-green-600" />
                              <div>
                                <p className="text-sm text-green-800 font-bold">TOP 3 FINISH!</p>
                                <p className="text-xs text-green-700">Great performance in this contest</p>
                              </div>
                            </div>
                          </div>
                        )}

                        <Button variant="outline" className="w-full border-2 border-slate-300 hover:border-red-600 hover:text-red-600 font-bold">
                          View Contest Details
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="py-16 text-center">
                  <Trophy className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No Contests Yet</h3>
                  <p className="text-slate-400 mb-6 max-w-md mx-auto">
                    Join free contests and compete with other cricket enthusiasts. 
                    Test your skills and climb the leaderboards!
                  </p>
                  <Link href="/matches">
                    <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-6 text-lg">
                      Browse Contests & Join Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Profile Information Section */}
        <Card className="mt-8 bg-white">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100">
            <CardTitle className="text-2xl flex items-center gap-2">
              <User className="h-6 w-6 text-blue-600" />
              Profile Information
            </CardTitle>
            <CardDescription>Your complete account details and verification status</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-600 font-bold mb-2">FULL NAME</p>
                  <p className="text-lg font-bold text-slate-900">{user.name || "Not provided"}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-600 font-bold mb-2">EMAIL ADDRESS</p>
                  <p className="text-lg font-bold text-slate-900">{user.email || "Not provided"}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-600 font-bold mb-2">STATE / LOCATION</p>
                  <p className="text-lg font-bold text-slate-900">{user.state || "Not provided"}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-600 font-bold mb-2">AGE VERIFICATION</p>
                  <div className="flex items-center gap-2">
                    {user.isAgeVerified ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-lg font-bold text-green-700">Verified (18+)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-600" />
                        <span className="text-lg font-bold text-red-700">Not Verified</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-600 font-bold mb-2">MEMBER SINCE</p>
                  <p className="text-lg font-bold text-slate-900">
                    {new Date(user.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-sm text-green-600 font-bold mb-2">LAST LOGIN</p>
                  <p className="text-lg font-bold text-slate-900">
                    {new Date(user.lastSignedIn).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Account Security Info */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-300 mt-4">
                <div className="flex items-start gap-4">
                  <Shield className="h-8 w-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-blue-900 mb-2">Account Security</h4>
                    <p className="text-sm text-blue-800 mb-3">
                      Your account is secured with industry-standard encryption. Your password is hashed using bcrypt 
                      and we never store plain text passwords. Your session is protected with JWT tokens.
                    </p>
                    <div className="flex gap-3">
                      <Button size="sm" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                        Change Password
                      </Button>
                      <Button size="sm" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                        Update Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}

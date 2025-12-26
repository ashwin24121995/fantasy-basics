import { useState } from "react";
import { useRoute, Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Trophy, ArrowLeft, Lock, Globe, Shield, TrendingUp } from "lucide-react";
import { toast } from "sonner";

type Contest = {
  id: string;
  name: string;
  type: 'public' | 'private';
  entryFee: number;
  prizePool: number;
  totalSpots: number;
  spotsLeft: number;
  firstPrize: number;
  winners: number;
};

export default function Contests() {
  const [, params] = useRoute("/contests/:matchId");
  const matchId = params?.matchId;
  const { user, isAuthenticated } = useAuth();
  
  const [selectedContest, setSelectedContest] = useState<string | null>(null);
  
  // Fetch match details
  const { data: match, isLoading: matchLoading } = trpc.matches.getMatchById.useQuery(
    { matchId: matchId || "" },
    { enabled: !!matchId }
  );
  
  // Mock contests data (in real app, fetch from API)
  const mockContests: Contest[] = [
    {
      id: '1',
      name: 'Mega Contest',
      type: 'public',
      entryFee: 0,
      prizePool: 10000,
      totalSpots: 10000,
      spotsLeft: 3245,
      firstPrize: 2000,
      winners: 1000,
    },
    {
      id: '2',
      name: 'Winner Takes All',
      type: 'public',
      entryFee: 0,
      prizePool: 5000,
      totalSpots: 5000,
      spotsLeft: 1234,
      firstPrize: 5000,
      winners: 1,
    },
    {
      id: '3',
      name: 'Practice Contest',
      type: 'public',
      entryFee: 0,
      prizePool: 1000,
      totalSpots: 1000,
      spotsLeft: 567,
      firstPrize: 200,
      winners: 100,
    },
    {
      id: '4',
      name: 'Head to Head',
      type: 'public',
      entryFee: 0,
      prizePool: 100,
      totalSpots: 2,
      spotsLeft: 1,
      firstPrize: 100,
      winners: 1,
    },
    {
      id: '5',
      name: 'Small League',
      type: 'public',
      entryFee: 0,
      prizePool: 500,
      totalSpots: 100,
      spotsLeft: 45,
      firstPrize: 150,
      winners: 25,
    },
  ];
  
  const handleJoinContest = (contestId: string) => {
    if (!isAuthenticated) {
      toast.error("Please login to join contests");
      window.location.href = "/login";
      return;
    }
    
    setSelectedContest(contestId);
    toast.success("Joined contest successfully!");
    
    // In real app, save to backend
    // Navigate to My Teams page
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1500);
  };
  
  const getContestIcon = (type: string) => {
    return type === 'public' ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />;
  };
  
  const getSpotsFillPercentage = (contest: Contest) => {
    return ((contest.totalSpots - contest.spotsLeft) / contest.totalSpots) * 100;
  };
  
  if (matchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground mt-4">Loading contests...</p>
        </div>
      </div>
    );
  }
  
  if (!match) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Match not found</h2>
            <Link href="/matches">
              <Button>Back to Matches</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-red-yellow py-6">
        <div className="container">
          <Link href="/matches">
            <Button variant="ghost" className="text-white hover:bg-white/20 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Matches
            </Button>
          </Link>
          <h1 className="text-3xl font-black text-white mb-2">Join a Contest</h1>
          <p className="text-white/90">{match.team1} vs {match.team2}</p>
        </div>
      </div>
      
      {/* Info Banner */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="container py-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-600" />
            <p className="text-sm text-blue-900">
              <strong>100% Free to Play!</strong> No entry fees, no real money. Just pure cricket entertainment and bragging rights.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container py-8 flex-1">
        <Tabs defaultValue="public" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
            <TabsTrigger value="public">
              <Globe className="w-4 h-4 mr-2" />
              Public Contests
            </TabsTrigger>
            <TabsTrigger value="private">
              <Lock className="w-4 h-4 mr-2" />
              Private Contests
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="public" className="space-y-4">
            {mockContests.filter(c => c.type === 'public').map(contest => {
              const fillPercentage = getSpotsFillPercentage(contest);
              const isAlmostFull = fillPercentage > 80;
              
              return (
                <Card key={contest.id} className="card-angular hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-black text-foreground">{contest.name}</h3>
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            {getContestIcon(contest.type)}
                            <span className="ml-1">{contest.type.toUpperCase()}</span>
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">Prize Pool</div>
                            <div className="text-lg font-black text-foreground flex items-center gap-1">
                              <Trophy className="w-4 h-4 text-yellow-500" />
                              {contest.prizePool.toLocaleString()} pts
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">Entry Fee</div>
                            <div className="text-lg font-black text-green-600">FREE</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">First Prize</div>
                            <div className="text-lg font-black text-foreground">
                              {contest.firstPrize.toLocaleString()} pts
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">Winners</div>
                            <div className="text-lg font-black text-foreground">
                              {contest.winners.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        
                        {/* Spots Progress */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground">
                              {contest.spotsLeft.toLocaleString()} spots left
                            </span>
                            <span className={`font-bold ${isAlmostFull ? 'text-orange-600' : 'text-muted-foreground'}`}>
                              {contest.totalSpots.toLocaleString()} spots
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full transition-all ${isAlmostFull ? 'bg-orange-500' : 'bg-primary'}`}
                              style={{ width: `${fillPercentage}%` }}
                            />
                          </div>
                        </div>
                        
                        {isAlmostFull && (
                          <Badge variant="destructive" className="mb-2">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Filling Fast!
                          </Badge>
                        )}
                      </div>
                      
                      <Button 
                        onClick={() => handleJoinContest(contest.id)}
                        disabled={contest.spotsLeft === 0}
                        className="ml-4 bg-primary hover:bg-primary/90 text-white font-bold px-8"
                      >
                        {contest.spotsLeft === 0 ? 'Contest Full' : 'Join Contest'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
          
          <TabsContent value="private" className="space-y-4">
            <Card className="card-angular">
              <CardContent className="p-12 text-center">
                <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-bold mb-2">Private Contests</h3>
                <p className="text-muted-foreground mb-6">
                  Create private contests and invite your friends to compete!
                </p>
                <Button className="bg-primary hover:bg-primary/90 text-white font-bold">
                  Create Private Contest
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Help Section */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <CardContent className="p-6">
            <h3 className="font-black text-lg mb-3">How to Join a Contest?</h3>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">1.</span>
                <span>Create your team by selecting 11 players within the credit limit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">2.</span>
                <span>Choose a contest from the list above and click "Join Contest"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">3.</span>
                <span>Watch the live match and track your team's performance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">4.</span>
                <span>Check the leaderboard after the match to see your rank!</span>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}

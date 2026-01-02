import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, Trophy, Calendar, TrendingUp, Target, Zap, 
  ArrowRight, Lock, Globe, Shield, Star, Award 
} from "lucide-react";

export default function ContestsList() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "live">("all");
  
  // Fetch all matches with contests
  const { data: matches, isLoading: matchesLoading } = trpc.matches.getUpcomingMatches.useQuery();

  if (matchesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Navigation />
        <div className="container py-20 text-center">
          <div className="animate-pulse">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <p className="text-white">Loading contests...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="container relative py-16">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-red-600 hover:bg-red-700 text-white mb-4">
              <Trophy className="h-3 w-3 mr-1" />
              ALL CONTESTS
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
              JOIN <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600">EXCITING</span> CONTESTS
            </h1>
            
            <p className="text-lg text-slate-300 mb-8">
              Browse all available contests across upcoming matches. Choose your contest, build your team, and compete for glory!
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-blue-600/20 rounded-lg">
                    <Users className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-slate-400">Total Contests</p>
                    <p className="text-lg font-bold text-white">{matches?.length || 0}+</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-green-600/20 rounded-lg">
                    <Trophy className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-slate-400">Prize Pool</p>
                    <p className="text-lg font-bold text-white">100% Free</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-yellow-600/20 rounded-lg">
                    <Star className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-slate-400">Active Players</p>
                    <p className="text-lg font-bold text-white">10,000+</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Contests Section */}
      <div className="container py-12">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-slate-800 border border-slate-700">
            <TabsTrigger value="all" className="data-[state=active]:bg-red-600">
              All Matches
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-red-600">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="live" className="data-[state=active]:bg-red-600">
              Live Now
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            {!matches || matches.length === 0 ? (
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
                <CardContent className="py-16 text-center">
                  <Calendar className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No Contests Available</h3>
                  <p className="text-slate-400 mb-6">
                    Check back soon for upcoming matches and contests!
                  </p>
                  <Link href="/">
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      Go to Homepage
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {matches.map((match) => (
                  <Card 
                    key={match.id} 
                    className="bg-slate-800/50 border-slate-700 backdrop-blur hover:border-red-600 transition-all group"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/50">
                          {match.matchType.toUpperCase()}
                        </Badge>
                        <Badge className="bg-green-600/20 text-green-400 border-green-600/50">
                          <Globe className="h-3 w-3 mr-1" />
                          Live
                        </Badge>
                      </div>
                      
                      <CardTitle className="text-white group-hover:text-red-500 transition-colors">
                        {match.teams.join(' vs ')}
                      </CardTitle>
                      
                      <CardDescription className="text-slate-400 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(match.dateTimeGMT).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                          timeZone: 'Asia/Kolkata'
                        })} IST
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Target className="h-4 w-4" />
                          <span>Multiple Contests</span>
                        </div>
                        <div className="flex items-center gap-2 text-yellow-400">
                          <Trophy className="h-4 w-4" />
                          <span className="font-bold">100% Free</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-slate-900/50 rounded-lg p-2">
                          <p className="text-xs text-slate-400">Entry</p>
                          <p className="text-sm font-bold text-green-400">₹0</p>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-2">
                          <p className="text-xs text-slate-400">Spots</p>
                          <p className="text-sm font-bold text-blue-400">10K+</p>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-2">
                          <p className="text-xs text-slate-400">Winners</p>
                          <p className="text-sm font-bold text-yellow-400">1000+</p>
                        </div>
                      </div>

                      <Link href={`/contests/${match.id}`}>
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold group-hover:scale-105 transition-transform">
                          View Contests
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="mt-8">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
              <CardContent className="py-16 text-center">
                <Calendar className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Upcoming Contests</h3>
                <p className="text-slate-400">
                  Contests for matches starting in the next 24 hours will appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="live" className="mt-8">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
              <CardContent className="py-16 text-center">
                <Zap className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Live Contests</h3>
                <p className="text-slate-400">
                  Currently running contests will appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* CTA Section */}
      {!isAuthenticated && (
        <div className="container py-16">
          <Card className="bg-gradient-to-r from-red-600 to-yellow-600 border-0">
            <CardContent className="py-12 text-center">
              <Award className="h-16 w-16 text-white mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Join the Action?
              </h2>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Create your free account and start competing in contests. No entry fees, no real money - just pure cricket entertainment!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register">
                  <Button size="lg" className="bg-white text-red-600 hover:bg-slate-100 font-bold">
                    Register Now - It's Free!
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
}

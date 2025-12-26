import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Trophy, Users, TrendingUp, Shield, Clock, Target, CheckCircle, Star, Zap, Award, BarChart3, Globe, Lock } from "lucide-react";
import { Link } from "wouter";
import ProfileCompletion from "@/components/ProfileCompletion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();
  const { data: upcomingMatches, isLoading: matchesLoading } = trpc.matches.getUpcomingMatches.useQuery();
  
  // Show profile completion if user is authenticated but profile is incomplete
  if (isAuthenticated && user && (!user.dateOfBirth || !user.state)) {
    return <ProfileCompletion onComplete={() => window.location.reload()} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation activePage="home" />

      {/* Hero Section with New Image */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 -mt-8 pt-8">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: 'url(/hero-cricket.jpg)' }}
        ></div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent"></div>
        
        {/* Angular Yellow Stripes */}
        <div className="absolute top-0 right-0 w-1/3 h-full">
          <div className="absolute top-0 right-0 w-32 h-full bg-secondary transform skew-x-12 translate-x-16 opacity-80"></div>
          <div className="absolute top-0 right-24 w-24 h-full bg-primary transform skew-x-12 translate-x-16 opacity-80"></div>
          <div className="absolute top-0 right-40 w-16 h-full bg-secondary transform skew-x-12 translate-x-16 opacity-60"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block bg-secondary/20 backdrop-blur-sm border-2 border-secondary px-4 py-2 mb-6 rounded-lg">
              <span className="text-secondary font-black text-sm tracking-wider">🏏 INDIA'S #1 FREE FANTASY CRICKET PLATFORM</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              PLAY FANTASY<br />
              CRICKET - <span className="text-secondary">100% FREE</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4 font-semibold">
              Build your dream team, compete with friends, and prove your cricket knowledge!
            </p>
            <p className="text-lg text-white/80 mb-8">
              No entry fees. No real money. No cash prizes. Just pure cricket entertainment and bragging rights. Join thousands of cricket enthusiasts in India's most transparent fantasy cricket platform.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-6 shadow-lg"
                onClick={() => window.location.href = isAuthenticated ? "/matches" : "/register"}
              >
                {isAuthenticated ? "PLAY NOW" : "START PLAYING FREE"}
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent border-4 border-white text-white hover:bg-white hover:text-primary font-bold text-lg px-8 py-6"
                onClick={() => window.location.href = isAuthenticated ? "/how-to-play" : "/login"}
              >
                {isAuthenticated ? "HOW TO PLAY" : "LOGIN"}
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <span className="font-semibold">100% Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <span className="font-semibold">Real-Time Data</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <span className="font-semibold">Fair Play Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Angular Bottom Cut */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 50%)' }}></div>
      </section>

      {/* Cricket Matches Section */}
      <section className="py-16 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                Cricket Matches
              </h2>
              <p className="text-gray-600">Create your fantasy team for upcoming matches</p>
            </div>
            <Button 
              variant="outline" 
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold"
              onClick={() => window.location.href = "/matches"}
            >
              View All →
            </Button>
          </div>

          {matchesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-32 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : upcomingMatches && upcomingMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingMatches.slice(0, 6).map((match: any) => (
                <Card key={match.id} className="border-2 border-gray-200 hover:border-primary hover:shadow-lg transition-all cursor-pointer" onClick={() => window.location.href = `/matches/${match.id}`}>
                  <CardContent className="p-6">
                    {/* Match Format Badge */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {match.matchType || 'T20'}
                      </span>
                      <span className="text-xs text-gray-500">{match.seriesName || 'Cricket Match'}</span>
                    </div>

                    {/* Teams */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex flex-col items-center flex-1">
                        <div className="w-16 h-16 mb-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg">
                          {match.teamAShort || match.teamA?.substring(0, 3).toUpperCase()}
                        </div>
                        <span className="text-sm font-bold text-center line-clamp-1">{match.teamA}</span>
                      </div>
                      
                      <div className="px-4 text-center">
                        <span className="text-gray-400 font-bold text-lg">VS</span>
                        <div className="text-xs text-gray-500 mt-1">{match.matchType || 'T20'}</div>
                      </div>
                      
                      <div className="flex flex-col items-center flex-1">
                        <div className="w-16 h-16 mb-2 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg">
                          {match.teamBShort || match.teamB?.substring(0, 3).toUpperCase()}
                        </div>
                        <span className="text-sm font-bold text-center line-clamp-1">{match.teamB}</span>
                      </div>
                    </div>

                    {/* Match Time */}
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(match.dateTimeGMT).toLocaleString('en-IN', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric',
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}</span>
                    </div>

                    {/* Create Team Button */}
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = isAuthenticated ? `/matches/${match.id}/create-team` : getLoginUrl();
                      }}
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      Create Team
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center border-2 border-dashed">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-bold mb-2">No Upcoming Matches</h3>
              <p className="text-gray-600 mb-4">
                There are no upcoming matches at the moment. Check back soon for new contests!
              </p>
            </Card>
          )}
        </div>
      </section>

      {/* Why Choose Fantasy Basics Section */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-primary">
              WHY CHOOSE FANTASY BASICS?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              India's most transparent and user-friendly free fantasy cricket platform. We're different because we put cricket knowledge and fair play first.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Feature 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 transform -skew-y-2 group-hover:-skew-y-3 transition-transform rounded-lg"></div>
              <Card className="relative bg-white border-2 border-gray-200 hover:border-primary transition-colors">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-gray-900">100% Free to Play</h3>
                  <p className="text-gray-600 leading-relaxed">
                    No entry fees, no hidden charges, no real money transactions. Fantasy Basics is completely free forever. Create unlimited teams, join unlimited contests, and compete purely for the love of cricket and bragging rights among friends.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Feature 2 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/10 transform -skew-y-2 group-hover:-skew-y-3 transition-transform rounded-lg"></div>
              <Card className="relative bg-white border-2 border-gray-200 hover:border-secondary transition-colors">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mb-4 bg-secondary/10 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-gray-900">Real-Time Cricket Data</h3>
                  <p className="text-gray-600 leading-relaxed">
                    All match data, player statistics, and fantasy points are sourced directly from Cricket Data API. Every run, wicket, catch, and boundary is tracked in real-time with 100% accuracy. No manual updates, no delays, no manipulation.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Feature 3 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 transform -skew-y-2 group-hover:-skew-y-3 transition-transform rounded-lg"></div>
              <Card className="relative bg-white border-2 border-gray-200 hover:border-primary transition-colors">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-gray-900">Fair Play Guaranteed</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Transparent scoring system, clear contest rules, and equal opportunities for all. We use advanced algorithms to detect cheating, bot usage, and multiple accounts. Our Fair Play Policy ensures every contest is conducted with integrity.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Feature 4 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/10 transform -skew-y-2 group-hover:-skew-y-3 transition-transform rounded-lg"></div>
              <Card className="relative bg-white border-2 border-gray-200 hover:border-secondary transition-colors">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mb-4 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-gray-900">Easy Team Building</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Intuitive team builder with player statistics, recent form, and performance insights. Select your captain and vice-captain, balance your budget, and create your dream playing XI in minutes. Perfect for both beginners and experts.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Feature 5 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 transform -skew-y-2 group-hover:-skew-y-3 transition-transform rounded-lg"></div>
              <Card className="relative bg-white border-2 border-gray-200 hover:border-primary transition-colors">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-gray-900">Live Match Tracking</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Follow your team's performance ball-by-ball with live scorecard updates, instant fantasy points calculation, and real-time leaderboards. Watch your ranking change as the match unfolds. Never miss a moment of action.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Feature 6 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/10 transform -skew-y-2 group-hover:-skew-y-3 transition-transform rounded-lg"></div>
              <Card className="relative bg-white border-2 border-gray-200 hover:border-secondary transition-colors">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mb-4 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Lock className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-gray-900">Safe & Responsible</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Age verification (18+), geographic restrictions compliance, and responsible gaming guidelines. Your data is protected with industry-standard security. We're registered in India and fully transparent about our operations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
          <div className="absolute top-0 right-0 w-32 h-full bg-secondary transform skew-x-[-12deg]"></div>
          <div className="absolute top-0 right-24 w-24 h-full bg-primary transform skew-x-[-12deg]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-primary">
              HOW IT WORKS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started with Fantasy Basics is simple. Follow these four easy steps to start your fantasy cricket journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl font-black text-white">1</span>
              </div>
              <Card className="pt-8 border-2 border-gray-200 hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-black mb-3 text-gray-900">Sign Up Free</h3>
                  <p className="text-gray-600">
                    Create your free account using Manus OAuth. No credit card required. Verify your age (18+) and state to comply with Indian regulations.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-secondary rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl font-black text-secondary-foreground">2</span>
              </div>
              <Card className="pt-8 border-2 border-gray-200 hover:border-secondary transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mb-4 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-black mb-3 text-gray-900">Choose a Match</h3>
                  <p className="text-gray-600">
                    Browse upcoming T20, ODI, and Test matches from international and domestic cricket. Select the match you want to play.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl font-black text-white">3</span>
              </div>
              <Card className="pt-8 border-2 border-gray-200 hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-black mb-3 text-gray-900">Build Your Team</h3>
                  <p className="text-gray-600">
                    Select 11 players within the 100-credit budget. Choose your captain (2x points) and vice-captain (1.5x points). Create multiple teams if you want.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-secondary rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl font-black text-secondary-foreground">4</span>
              </div>
              <Card className="pt-8 border-2 border-gray-200 hover:border-secondary transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mb-4 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-black mb-3 text-gray-900">Compete & Win</h3>
                  <p className="text-gray-600">
                    Join free contests, track live scores, and watch your team climb the leaderboard. Compete with friends and cricket fans across India!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/how-to-play">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8">
                VIEW DETAILED GUIDE
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Matches Section */}
      {upcomingMatches && upcomingMatches.length > 0 && (
        <section className="py-20 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-primary">
                UPCOMING MATCHES
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join contests for these upcoming cricket matches. Create your dream team and compete with thousands of cricket enthusiasts.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {upcomingMatches.slice(0, 6).map((match: any) => (
                <Card key={match.id} className="border-2 border-gray-200 hover:border-primary transition-colors hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1 text-center">
                        <div className="text-2xl font-black text-foreground">{match.teamA}</div>
                      </div>
                      <div className="px-4">
                        <div className="text-xl font-black text-primary">VS</div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="text-2xl font-black text-foreground">{match.teamB}</div>
                      </div>
                    </div>
                    
                    <div className="text-center mb-4">
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-1">
                        <Clock className="w-4 h-4" />
                        <span className="font-semibold">{new Date(match.matchDate).toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">{match.venue}</div>
                    </div>
                    
                    <Link href={`/matches/${match.id}`}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold">
                        VIEW CONTESTS
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Link href="/matches">
                <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold text-lg px-8">
                  VIEW ALL MATCHES
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Scoring System Highlight */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-secondary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 right-0 w-64 h-full bg-white transform skew-x-[-12deg]"></div>
          <div className="absolute top-0 right-48 w-48 h-full bg-white transform skew-x-[-12deg]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              TRANSPARENT SCORING SYSTEM
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Every run, wicket, catch, and boundary is converted into fantasy points using our clear, publicly available scoring system. No hidden calculations, no surprises.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border-2 border-white/20">
                <div className="text-4xl font-black mb-2">+1</div>
                <div className="text-sm font-semibold">Per Run Scored</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border-2 border-white/20">
                <div className="text-4xl font-black mb-2">+25</div>
                <div className="text-sm font-semibold">Per Wicket</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border-2 border-white/20">
                <div className="text-4xl font-black mb-2">+8</div>
                <div className="text-sm font-semibold">Per Catch</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border-2 border-white/20">
                <div className="text-4xl font-black mb-2">+2</div>
                <div className="text-sm font-semibold">Per Boundary</div>
              </div>
            </div>

            <Link href="/how-to-play">
              <Button size="lg" variant="outline" className="bg-transparent border-4 border-white text-white hover:bg-white hover:text-primary font-bold text-lg px-8">
                VIEW FULL SCORING GUIDE
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-secondary/10 border-2 border-secondary px-6 py-3 mb-6 rounded-lg">
              <span className="text-secondary font-black text-lg tracking-wider">🎯 READY TO START?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
              Join India's Most Trusted<br />Free Fantasy Cricket Platform
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              No entry fees. No real money. No cash prizes. Just pure cricket entertainment, strategic gameplay, and bragging rights among friends. Start your fantasy cricket journey today!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-10 py-6 shadow-lg"
                onClick={() => window.location.href = isAuthenticated ? "/matches" : getLoginUrl()}
              >
                {isAuthenticated ? "BROWSE MATCHES" : "CREATE FREE ACCOUNT"}
              </Button>
              <Link href="/about">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary font-bold text-lg px-10 py-6"
                >
                  LEARN MORE ABOUT US
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="text-sm font-semibold text-gray-700">Registered in India</span>
              </div>
              <div className="flex items-center justify-center gap-3 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="text-sm font-semibold text-gray-700">Age Verified (18+)</span>
              </div>
              <div className="flex items-center justify-center gap-3 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="text-sm font-semibold text-gray-700">100% Transparent</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

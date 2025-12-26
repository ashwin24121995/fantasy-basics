import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Trophy, Users, TrendingUp, Shield, Clock, Target } from "lucide-react";
import { Link } from "wouter";
import ProfileCompletion from "@/components/ProfileCompletion";

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();
  const { data: upcomingMatches, isLoading: matchesLoading } = trpc.matches.getUpcomingMatches.useQuery();
  
  // Show profile completion if user is authenticated but profile is incomplete
  if (isAuthenticated && user && (!user.dateOfBirth || !user.state)) {
    return <ProfileCompletion onComplete={() => window.location.reload()} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Angular Navigation Bar - Cricket Clash Style */}
      <nav className="bg-white relative z-50 shadow-md">
        <div className="container mx-auto px-4 py-0 flex items-center justify-between">
          <Link href="/" className="py-4">
            <img src="/logo-new.webp" alt="Fantasy Basics" className="h-14 w-auto cursor-pointer" />
          </Link>
          
          <div className="hidden md:flex items-stretch h-16">
            <Link href="/" className="relative px-6 flex items-center justify-center font-bold text-sm text-white bg-primary hover:bg-primary/90 transition-colors" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
              <span className="relative z-10">HOME</span>
            </Link>
            <Link href="/matches" className="relative px-6 flex items-center justify-center font-bold text-sm text-foreground hover:text-primary bg-gray-100 hover:bg-gray-200 transition-colors -ml-4" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
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

      {/* Hero Section with Angular Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: 'url(/hero-cricket-action.webp)' }}
        ></div>
        
        {/* Angular Yellow Stripes */}
        <div className="absolute top-0 right-0 w-1/3 h-full">
          <div className="absolute top-0 right-0 w-32 h-full bg-secondary transform skew-x-12 translate-x-16 opacity-90"></div>
          <div className="absolute top-0 right-24 w-24 h-full bg-primary transform skew-x-12 translate-x-16 opacity-90"></div>
          <div className="absolute top-0 right-40 w-16 h-full bg-secondary transform skew-x-12 translate-x-16 opacity-70"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 text-shadow-strong leading-tight">
              PLAY FANTASY<br />
              CRICKET - <span className="text-secondary">100% FREE</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 text-shadow-strong font-semibold">
              Build your dream team, compete with friends, and prove your cricket knowledge!
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-6 border-angular"
                onClick={() => window.location.href = isAuthenticated ? "/matches" : getLoginUrl()}
              >
                {isAuthenticated ? "PLAY NOW" : "REGISTER NOW"}
              </Button>
              <Link href="/how-to-play">
                <Button 
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-4 border-white text-white hover:bg-white hover:text-primary font-bold text-lg px-8 py-6"
                >
                  HOW TO PLAY
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Angular Bottom Cut */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 50%)' }}></div>
      </section>

      {/* Feature Highlights Section */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-primary">
            FEATURE HIGHLIGHTS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Daily Contests - Yellow */}
            <div className="relative group">
              <div className="absolute inset-0 bg-secondary transform -skew-y-2 group-hover:-skew-y-3 transition-transform"></div>
              <Card className="relative bg-secondary border-0 overflow-hidden card-angular">
                <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-secondary-foreground">DAILY CONTESTS</h3>
                  <p className="text-secondary-foreground/80 font-semibold">
                    Join exciting daily matches and compete for glory - 100% free to play!
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Create Your Team - Blue */}
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500 transform -skew-y-2 group-hover:-skew-y-3 transition-transform"></div>
              <Card className="relative bg-blue-500 border-0 overflow-hidden card-angular">
                <div className="absolute top-0 left-0 w-full h-2 bg-secondary"></div>
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                    <Users className="w-10 h-10 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-white">CREATE YOUR TEAM</h3>
                  <p className="text-white/90 font-semibold">
                    Build your dream playing XI from top players and lead them to victory!
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Live Scoring - Red */}
            <div className="relative group">
              <div className="absolute inset-0 bg-primary transform -skew-y-2 group-hover:-skew-y-3 transition-transform"></div>
              <Card className="relative bg-primary border-0 overflow-hidden card-angular">
                <div className="absolute top-0 left-0 w-full h-2 bg-secondary"></div>
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                    <TrendingUp className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-white">LIVE SCORING</h3>
                  <p className="text-white/90 font-semibold">
                    Track your team's performance in real-time with ball-by-ball updates!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Matches Section */}
      {upcomingMatches && upcomingMatches.length > 0 && (
        <section className="py-16 bg-gray-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-full bg-gradient-yellow-red opacity-5 diagonal-stripe"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-primary">
              UPCOMING MATCHES
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingMatches.slice(0, 6).map((match: any) => (
                <Card key={match.id} className="card-angular border-2 border-gray-200 hover:border-primary transition-colors">
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
                    
                    <Link href={`/match/${match.id}`}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold">
                        CREATE TEAM
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link href="/matches">
                <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold">
                  VIEW ALL MATCHES
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-primary">
            WHY FANTASY BASICS?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">100% Free to Play</h3>
              <p className="text-muted-foreground">No entry fees, no hidden costs. Pure entertainment!</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
                <Target className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Skill-Based Gaming</h3>
              <p className="text-muted-foreground">Test your cricket knowledge and strategy skills</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-Time Updates</h3>
              <p className="text-muted-foreground">Live scores and fantasy points tracking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Angular Design */}
      <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
        {/* Angular Yellow/Red Stripes */}
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

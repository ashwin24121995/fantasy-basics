import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Trophy, Users, Zap, Shield, ArrowRight, Calendar, Clock } from "lucide-react";
import ProfileCompletion from "@/components/ProfileCompletion";
import { useState } from "react";

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);

  // Check if profile is complete
  const { data: profileStatus } = trpc.user.isProfileComplete.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Fetch upcoming and live matches
  const { data: upcomingMatches, isLoading: loadingUpcoming } = trpc.matches.getUpcomingMatches.useQuery();
  const { data: liveMatches, isLoading: loadingLive } = trpc.matches.getLiveMatches.useQuery();

  // Show profile completion if user is authenticated but profile is incomplete
  if (isAuthenticated && profileStatus && !profileStatus.isComplete && !showProfileCompletion) {
    setShowProfileCompletion(true);
  }

  if (showProfileCompletion && isAuthenticated) {
    return <ProfileCompletion onComplete={() => setShowProfileCompletion(false)} />;
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Fantasy Basics" className="h-10" />
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/matches" className="text-sm font-medium hover:text-primary transition-colors">
                Matches
              </Link>
              <Link href="/how-to-play" className="text-sm font-medium hover:text-primary transition-colors">
                How to Play
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </Link>
            </div>
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm">
                      Dashboard
                    </Button>
                  </Link>
                  <span className="text-sm font-medium">{user?.name}</span>
                </>
              ) : (
                <>
                  <a href={getLoginUrl()}>
                    <Button variant="outline" size="sm">
                      Login
                    </Button>
                  </a>
                  <a href={getLoginUrl()}>
                    <Button size="sm">Sign Up</Button>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/hero-cricket.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Play Fantasy Cricket. Win Real Prizes.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Create your dream team, compete with friends, and win exciting prizes in India's most engaging fantasy cricket platform.
            </p>
            <div className="flex flex-wrap gap-4">
              {isAuthenticated ? (
                <Link href="/matches">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Play Now <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <a href={getLoginUrl()}>
                  <Button size="lg" variant="secondary" className="gap-2">
                    Get Started <ArrowRight className="h-5 w-5" />
                  </Button>
                </a>
              )}
              <Link href="/how-to-play">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 hover:bg-white/20 text-white">
                  How to Play
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Matches Section */}
      {liveMatches && liveMatches.length > 0 && (
        <section className="py-12 bg-accent/5">
          <div className="container">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <Zap className="h-8 w-8 text-accent" />
                Live Matches
              </h2>
              <Link href="/matches?filter=live">
                <Button variant="link" className="gap-1">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {liveMatches.slice(0, 3).map((match) => (
                <Card key={match.id} className="hover:shadow-lg transition-shadow">
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
                    <div className="space-y-3">
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
                    <Link href={`/matches/${match.id}`}>
                      <Button className="w-full mt-4" variant="outline">
                        View Contests
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Matches Section */}
      <section className="py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Calendar className="h-8 w-8 text-primary" />
              Upcoming Matches
            </h2>
            <Link href="/matches">
              <Button variant="link" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          {loadingUpcoming ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                    <div className="h-6 bg-muted rounded w-2/3"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-20 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : upcomingMatches && upcomingMatches.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingMatches.slice(0, 6).map((match) => (
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
                    <div className="space-y-2">
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
                      <Button className="w-full mt-4">Create Team</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No upcoming matches at the moment. Check back soon!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Fantasy Basics?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center">
              <CardHeader>
                <Trophy className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Win Big Prizes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Compete in free contests and win exciting prizes based on your team's performance.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Play with Friends</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create private contests and challenge your friends to see who's the best fantasy manager.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Zap className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Real-Time Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get live scores and fantasy points updates as the match progresses.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Fair Play Guaranteed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We ensure fair play and transparency in all contests with strict regulations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-16 bg-primary text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Playing?</h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of cricket fans and start your fantasy cricket journey today!
            </p>
            <a href={getLoginUrl()}>
              <Button size="lg" variant="secondary" className="gap-2">
                Sign Up Now <ArrowRight className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-muted/50 py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <img src="/logo.png" alt="Fantasy Basics" className="h-10 mb-4" />
              <p className="text-sm text-muted-foreground">
                India's premier fantasy cricket platform. Play responsibly.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/how-to-play" className="text-muted-foreground hover:text-foreground">
                    How to Play
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/responsible-gaming" className="text-muted-foreground hover:text-foreground">
                    Responsible Gaming
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/fair-play" className="text-muted-foreground hover:text-foreground">
                    Fair Play
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2025 Fantasy Basics by KAVERAMMA COFFEE CURING WORKS PRIVATE LIMITED. All rights reserved.</p>
            <p className="mt-2">
              Fantasy sports are not available in Telangana, Andhra Pradesh, Assam, and Odisha. Players must be 18+.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

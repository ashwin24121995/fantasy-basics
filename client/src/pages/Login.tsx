import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "../lib/trpc";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { toast } from "sonner";
import { Trophy, TrendingUp, Users, Shield, Loader2, Lock } from "lucide-react";

export function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: () => {
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.message || "Login failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Red diagonal stripe at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 transform -skew-y-2 origin-bottom-left"></div>
      
      {/* Yellow diagonal accent top */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 opacity-20 transform rotate-12 translate-x-32 -translate-y-32"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)]">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-block bg-yellow-400 text-slate-900 px-4 py-2 rounded-md font-bold text-sm mb-4">
                WELCOME BACK
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                LOGIN TO
                <br />
                <span className="text-yellow-400">FANTASY BASICS</span>
              </h1>
              <p className="text-slate-300 text-lg max-w-xl">
                Continue your fantasy cricket journey! Access your teams, track your performance, and compete with players across India—completely free.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1 - Red */}
              <Card className="bg-gradient-to-br from-red-600 to-red-700 border-0 p-6 text-white">
                <Trophy className="w-10 h-10 mb-3" />
                <h3 className="font-bold text-lg mb-2">Your Teams</h3>
                <p className="text-sm text-red-100">Access all your created teams and ongoing contests</p>
              </Card>

              {/* Card 2 - Blue */}
              <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-0 p-6 text-white">
                <TrendingUp className="w-10 h-10 mb-3" />
                <h3 className="font-bold text-lg mb-2">Track Stats</h3>
                <p className="text-sm text-blue-100">Monitor your performance and leaderboard rankings</p>
              </Card>

              {/* Card 3 - Green */}
              <Card className="bg-gradient-to-br from-green-600 to-green-700 border-0 p-6 text-white">
                <Users className="w-10 h-10 mb-3" />
                <h3 className="font-bold text-lg mb-2">Join Contests</h3>
                <p className="text-sm text-green-100">Participate in daily free contests and leagues</p>
              </Card>

              {/* Card 4 - Yellow */}
              <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 border-0 p-6 text-slate-900">
                <Shield className="w-10 h-10 mb-3" />
                <h3 className="font-bold text-lg mb-2">100% Safe</h3>
                <p className="text-sm text-slate-800">Secure login with encrypted password protection</p>
              </Card>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md bg-white p-8 shadow-2xl">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Login to Your Account</h2>
                <p className="text-slate-600 text-sm">Enter your credentials to access your dashboard</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loginMutation.isPending}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loginMutation.isPending}
                    className="mt-1.5"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 text-slate-600 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300" />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 text-lg"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "LOGIN NOW"
                  )}
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-slate-500">OR</span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-slate-600">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setLocation("/register")}
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Register Now
                    </button>
                  </p>
                </div>

                <div className="flex items-start space-x-2 text-sm text-slate-600 bg-blue-50 p-3 rounded-md border border-blue-200">
                  <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-blue-900">Secure Login</strong><br />
                    Your password is encrypted using industry-standard bcrypt hashing. We never store plain text passwords.
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

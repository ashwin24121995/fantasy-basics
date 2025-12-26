import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "../lib/trpc";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { toast } from "sonner";
import { CheckCircle2, Trophy, TrendingUp, Users, Shield, Loader2 } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export function Register() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Password strength calculation
  const calculatePasswordStrength = (password: string): { strength: number; label: string; color: string } => {
    if (!password) return { strength: 0, label: "", color: "" };
    
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 15;
    if (/[a-z]/.test(password)) strength += 15;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 15;
    
    if (strength < 40) return { strength, label: "Weak", color: "bg-red-500" };
    if (strength < 70) return { strength, label: "Medium", color: "bg-yellow-500" };
    return { strength, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: () => {
      toast.success("Registration successful! Redirecting to dashboard...");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.message || "Registration failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    registerMutation.mutate({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Yellow diagonal stripe at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-r from-yellow-400 via-yellow-500 to-red-500 transform -skew-y-2 origin-bottom-left"></div>
      
      {/* Red diagonal accent top */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-red-600 opacity-20 transform -rotate-12 -translate-x-32 -translate-y-32"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)]">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-block bg-yellow-400 text-slate-900 px-4 py-2 rounded-md font-bold text-sm mb-4">
                JOIN FREE TODAY
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                START YOUR
                <br />
                <span className="text-yellow-400">CRICKET JOURNEY</span>
              </h1>
              <p className="text-slate-300 text-lg max-w-xl">
                Create your free account and join thousands of cricket fans playing fantasy cricket without spending a single rupee. Learn, compete, and master your skills!
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1 - Red */}
              <Card className="bg-gradient-to-br from-red-600 to-red-700 border-0 p-6 text-white">
                <Trophy className="w-10 h-10 mb-3" />
                <h3 className="font-bold text-lg mb-2">100% Free Forever</h3>
                <p className="text-sm text-red-100">No deposits, no payments, no hidden charges. Completely free to play.</p>
              </Card>

              {/* Card 2 - Blue */}
              <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-0 p-6 text-white">
                <TrendingUp className="w-10 h-10 mb-3" />
                <h3 className="font-bold text-lg mb-2">Educational Platform</h3>
                <p className="text-sm text-blue-100">Learn cricket strategy, player analysis, and team building skills.</p>
              </Card>

              {/* Card 3 - Green */}
              <Card className="bg-gradient-to-br from-green-600 to-green-700 border-0 p-6 text-white">
                <Users className="w-10 h-10 mb-3" />
                <h3 className="font-bold text-lg mb-2">Active Community</h3>
                <p className="text-sm text-green-100">Join thousands of cricket enthusiasts and compete with friends.</p>
              </Card>

              {/* Card 4 - Yellow */}
              <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 border-0 p-6 text-slate-900">
                <Shield className="w-10 h-10 mb-3" />
                <h3 className="font-bold text-lg mb-2">Safe & Secure</h3>
                <p className="text-sm text-slate-800">Your data is encrypted and protected with industry-standard security.</p>
              </Card>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md bg-white p-8 shadow-2xl">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Create Your Free Account</h2>
                <p className="text-slate-600 text-sm">Fill in your details to get started</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-slate-700 font-medium">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={registerMutation.isPending}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-slate-700 font-medium">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={registerMutation.isPending}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-slate-700 font-medium">Password * (Min 8 characters)</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    minLength={8}
                    disabled={registerMutation.isPending}
                    className="mt-1.5"
                  />
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-600">Password Strength:</span>
                        <span className={`text-xs font-semibold ${
                          passwordStrength.label === "Weak" ? "text-red-600" :
                          passwordStrength.label === "Medium" ? "text-yellow-600" :
                          "text-green-600"
                        }`}>{passwordStrength.label}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: `${passwordStrength.strength}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 text-xs text-slate-600 space-y-1">
                        <div className="flex items-center gap-1">
                          {formData.password.length >= 8 ? 
                            <CheckCircle2 className="w-3 h-3 text-green-600" /> : 
                            <span className="w-3 h-3 rounded-full border border-slate-300"></span>
                          }
                          <span>At least 8 characters</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {/[A-Z]/.test(formData.password) ? 
                            <CheckCircle2 className="w-3 h-3 text-green-600" /> : 
                            <span className="w-3 h-3 rounded-full border border-slate-300"></span>
                          }
                          <span>One uppercase letter</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {/[0-9]/.test(formData.password) ? 
                            <CheckCircle2 className="w-3 h-3 text-green-600" /> : 
                            <span className="w-3 h-3 rounded-full border border-slate-300"></span>
                          }
                          <span>One number</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {/[^a-zA-Z0-9]/.test(formData.password) ? 
                            <CheckCircle2 className="w-3 h-3 text-green-600" /> : 
                            <span className="w-3 h-3 rounded-full border border-slate-300"></span>
                          }
                          <span>One special character</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-slate-700 font-medium">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    minLength={8}
                    disabled={registerMutation.isPending}
                    className="mt-1.5"
                  />
                </div>

                <div className="flex items-start space-x-2 text-sm text-slate-600 bg-slate-50 p-3 rounded-md">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p>
                    I confirm that I am 18 years or older and agree to the{" "}
                    <a href="/terms" className="text-blue-600 hover:underline">Terms & Conditions</a> and{" "}
                    <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-lg"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "CREATE FREE ACCOUNT"
                  )}
                </Button>

                <div className="text-center pt-4 border-t">
                  <p className="text-slate-600">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setLocation("/login")}
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Login Here
                    </button>
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

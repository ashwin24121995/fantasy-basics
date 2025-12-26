import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

interface NavigationProps {
  activePage?: string;
}

export default function Navigation({ activePage = "home" }: NavigationProps) {
  const { isAuthenticated, logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <nav className="bg-white relative z-50 shadow-md">
      <div className="container mx-auto px-4 py-0 flex items-center justify-between">
        <Link href="/" className="py-4">
          <img src="/kavera-logo.png" alt="Kavera" className="h-14 w-auto cursor-pointer" />
        </Link>
        
        <div className="hidden md:flex items-stretch h-16">
          <Link 
            href="/" 
            className={`relative px-6 flex items-center justify-center font-bold text-sm transition-colors -ml-0 ${
              activePage === "home" 
                ? "text-white bg-primary hover:bg-primary/90" 
                : "text-foreground hover:text-primary bg-gray-100 hover:bg-gray-200"
            }`}
            style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}
          >
            <span className="relative z-10">HOME</span>
          </Link>
          <Link 
            href="/matches" 
            className={`relative px-6 flex items-center justify-center font-bold text-sm transition-colors -ml-4 ${
              activePage === "contests" 
                ? "text-white bg-primary hover:bg-primary/90" 
                : "text-foreground hover:text-primary bg-gray-100 hover:bg-gray-200"
            }`}
            style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}
          >
            <span className="relative z-10">CONTESTS</span>
          </Link>
          <Link 
            href="/how-to-play" 
            className={`relative px-6 flex items-center justify-center font-bold text-sm transition-colors -ml-4 ${
              activePage === "how-to-play" 
                ? "text-white bg-primary hover:bg-primary/90" 
                : "text-foreground hover:text-primary bg-gray-100 hover:bg-gray-200"
            }`}
            style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}
          >
            <span className="relative z-10">HOW TO PLAY</span>
          </Link>
          {isAuthenticated && (
            <Link 
              href="/dashboard" 
              className={`relative px-6 flex items-center justify-center font-bold text-sm transition-colors -ml-4 ${
                activePage === "dashboard" 
                  ? "text-white bg-primary hover:bg-primary/90" 
                  : "text-foreground hover:text-primary bg-gray-100 hover:bg-gray-200"
              }`}
              style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}
            >
              <span className="relative z-10">MY TEAMS</span>
            </Link>
          )}
          <Link 
            href="/about" 
            className={`relative px-6 flex items-center justify-center font-bold text-sm transition-colors -ml-4 ${
              activePage === "about" 
                ? "text-white bg-primary hover:bg-primary/90" 
                : "text-foreground hover:text-primary bg-gray-100 hover:bg-gray-200"
            }`}
            style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' }}
          >
            <span className="relative z-10">ABOUT</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-3 py-4">
          {!isAuthenticated ? (
            <>
              <Button 
                variant="outline" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold text-sm"
                onClick={() => window.location.href = "/login"}
                disabled={loading}
              >
                LOGIN
              </Button>
              <Button 
                className="bg-primary hover:bg-primary/90 text-white font-bold px-6 text-sm"
                onClick={() => window.location.href = "/register"}
                disabled={loading}
              >
                REGISTER NOW
              </Button>
            </>
          ) : (
            <>
              <Link href="/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm" disabled={loading}>
                  DASHBOARD
                </Button>
              </Link>
              <Button 
                variant="outline"
                className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold text-sm"
                onClick={handleLogout}
                disabled={loading}
              >
                {loading ? "LOGGING OUT..." : "LOGOUT"}
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

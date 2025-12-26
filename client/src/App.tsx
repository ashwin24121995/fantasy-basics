import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import MatchDetail from "./pages/MatchDetail";
import TeamBuilder from "./pages/TeamBuilder";
import LiveMatch from "./pages/LiveMatch";
import Dashboard from "./pages/Dashboard";
import { AboutPage } from "./pages/StaticPages";
import FairPlayPage from "./pages/FairPlay";
import ResponsibleGamingPage from "./pages/ResponsibleGaming";
import ContactPage from "./pages/Contact";
import HowToPlayPage from "./pages/HowToPlay";
import FAQPage from "./pages/FAQ";
import TermsPage from "./pages/Terms";
import PrivacyPage from "./pages/Privacy";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/matches" component={Matches} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/about" component={AboutPage} />
      <Route path="/how-to-play" component={HowToPlayPage} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/responsible-gaming" component={ResponsibleGamingPage} />
      <Route path="/fair-play" component={FairPlayPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/matches/:matchId/team-builder" component={TeamBuilder} />
      <Route path="/matches/:matchId/live" component={LiveMatch} />
      <Route path="/matches/:matchId" component={MatchDetail} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

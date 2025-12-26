import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Trophy, Star, Shield, Target, Zap, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";

// Player type definition
type Player = {
  id: string;
  name: string;
  role: 'BAT' | 'BOWL' | 'ALL' | 'WK';
  team: string;
  credits: number;
  points?: number;
  selected?: boolean;
};

export default function CreateTeam() {
  const [, params] = useRoute("/create-team/:matchId");
  const matchId = params?.matchId;
  const { user, isAuthenticated } = useAuth();
  
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [captain, setCaptain] = useState<string | null>(null);
  const [viceCaptain, setViceCaptain] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const TOTAL_CREDITS = 100;
  const MAX_PLAYERS = 11;
  const MIN_PLAYERS_PER_TEAM = 1;
  const MAX_PLAYERS_PER_TEAM = 7;
  
  // Fetch match details
  const { data: match, isLoading: matchLoading } = trpc.matches.getMatchById.useQuery(
    { matchId: matchId || "" },
    { enabled: !!matchId }
  );
  
  // Mock players data (in real app, fetch from API based on match teams)
  const mockPlayers: Player[] = match ? [
    // Team 1 - Batsmen
    { id: '1', name: 'Virat Kohli', role: 'BAT', team: match.team1 || '', credits: 10.5 },
    { id: '2', name: 'Rohit Sharma', role: 'BAT', team: match.team1 || '', credits: 10 },
    { id: '3', name: 'Shubman Gill', role: 'BAT', team: match.team1 || '', credits: 9.5 },
    // Team 1 - Bowlers
    { id: '4', name: 'Jasprit Bumrah', role: 'BOWL', team: match.team1 || '', credits: 10 },
    { id: '5', name: 'Mohammed Shami', role: 'BOWL', team: match.team1 || '', credits: 9 },
    { id: '6', name: 'Kuldeep Yadav', role: 'BOWL', team: match.team1 || '', credits: 8.5 },
    // Team 1 - All-rounders
    { id: '7', name: 'Hardik Pandya', role: 'ALL', team: match.team1 || '', credits: 9.5 },
    { id: '8', name: 'Ravindra Jadeja', role: 'ALL', team: match.team1 || '', credits: 9 },
    // Team 1 - Wicket-keeper
    { id: '9', name: 'KL Rahul', role: 'WK', team: match.team1 || '', credits: 9 },
    
    // Team 2 - Batsmen
    { id: '10', name: 'Babar Azam', role: 'BAT', team: match.team2 || '', credits: 10 },
    { id: '11', name: 'Mohammad Rizwan', role: 'BAT', team: match.team2 || '', credits: 9.5 },
    { id: '12', name: 'Fakhar Zaman', role: 'BAT', team: match.team2 || '', credits: 8.5 },
    // Team 2 - Bowlers
    { id: '13', name: 'Shaheen Afridi', role: 'BOWL', team: match.team2 || '', credits: 9.5 },
    { id: '14', name: 'Haris Rauf', role: 'BOWL', team: match.team2 || '', credits: 8.5 },
    { id: '15', name: 'Shadab Khan', role: 'BOWL', team: match.team2 || '', credits: 8 },
    // Team 2 - All-rounders
    { id: '16', name: 'Mohammad Nawaz', role: 'ALL', team: match.team2 || '', credits: 8.5 },
    { id: '17', name: 'Faheem Ashraf', role: 'ALL', team: match.team2 || '', credits: 7.5 },
    // Team 2 - Wicket-keeper
    { id: '18', name: 'Sarfaraz Ahmed', role: 'WK', team: match.team2 || '', credits: 8 },
  ] : [];
  
  const usedCredits = selectedPlayers.reduce((sum, p) => sum + p.credits, 0);
  const remainingCredits = TOTAL_CREDITS - usedCredits;
  
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'BAT': return <Target className="w-4 h-4" />;
      case 'BOWL': return <Zap className="w-4 h-4" />;
      case 'ALL': return <Star className="w-4 h-4" />;
      case 'WK': return <Shield className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };
  
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'BAT': return 'Batsman';
      case 'BOWL': return 'Bowler';
      case 'ALL': return 'All-rounder';
      case 'WK': return 'Wicket-keeper';
      default: return role;
    }
  };
  
  const getPlayersByRole = (role: string) => {
    if (role === 'all') return mockPlayers;
    return mockPlayers.filter(p => p.role === role);
  };
  
  const getPlayersByTeam = (team: string) => {
    return selectedPlayers.filter(p => p.team === team).length;
  };
  
  const canSelectPlayer = (player: Player) => {
    if (selectedPlayers.length >= MAX_PLAYERS) return false;
    if (player.credits > remainingCredits) return false;
    const teamCount = getPlayersByTeam(player.team);
    if (teamCount >= MAX_PLAYERS_PER_TEAM) return false;
    return true;
  };
  
  const togglePlayerSelection = (player: Player) => {
    const isSelected = selectedPlayers.some(p => p.id === player.id);
    
    if (isSelected) {
      setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
      if (captain === player.id) setCaptain(null);
      if (viceCaptain === player.id) setViceCaptain(null);
    } else {
      if (canSelectPlayer(player)) {
        setSelectedPlayers([...selectedPlayers, player]);
      } else {
        if (selectedPlayers.length >= MAX_PLAYERS) {
          toast.error("You can only select 11 players");
        } else if (player.credits > remainingCredits) {
          toast.error("Not enough credits");
        } else {
          toast.error(`Maximum ${MAX_PLAYERS_PER_TEAM} players from one team`);
        }
      }
    }
  };
  
  const canSaveTeam = () => {
    if (selectedPlayers.length !== MAX_PLAYERS) return false;
    if (!captain || !viceCaptain) return false;
    if (captain === viceCaptain) return false;
    
    // Check minimum players per role
    const wkCount = selectedPlayers.filter(p => p.role === 'WK').length;
    const batCount = selectedPlayers.filter(p => p.role === 'BAT').length;
    const allCount = selectedPlayers.filter(p => p.role === 'ALL').length;
    const bowlCount = selectedPlayers.filter(p => p.role === 'BOWL').length;
    
    return wkCount >= 1 && batCount >= 3 && allCount >= 1 && bowlCount >= 3;
  };
  
  const handleSaveTeam = () => {
    if (!canSaveTeam()) {
      toast.error("Please complete your team selection");
      return;
    }
    
    toast.success("Team created successfully!");
    // In real app, save team to backend
    // Navigate to contest selection
    window.location.href = `/contests/${matchId}`;
  };
  
  if (matchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground mt-4">Loading match details...</p>
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
          <h1 className="text-3xl font-black text-white mb-2">Create Your Team</h1>
          <p className="text-white/90">{match.team1} vs {match.team2}</p>
        </div>
      </div>
      
      {/* Team Summary Bar */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-sm text-muted-foreground">Players</div>
                <div className="text-2xl font-black text-foreground">
                  {selectedPlayers.length}/{MAX_PLAYERS}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Credits Left</div>
                <div className={`text-2xl font-black ${remainingCredits < 0 ? 'text-destructive' : 'text-foreground'}`}>
                  {remainingCredits.toFixed(1)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Captain</div>
                <div className="text-lg font-bold text-foreground">
                  {captain ? selectedPlayers.find(p => p.id === captain)?.name.split(' ')[1] : '-'}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Vice Captain</div>
                <div className="text-lg font-bold text-foreground">
                  {viceCaptain ? selectedPlayers.find(p => p.id === viceCaptain)?.name.split(' ')[1] : '-'}
                </div>
              </div>
            </div>
            <Button 
              onClick={handleSaveTeam}
              disabled={!canSaveTeam()}
              className="bg-primary hover:bg-primary/90 text-white font-bold px-8"
            >
              Save Team & Continue
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Player Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-5 w-full mb-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="WK">WK</TabsTrigger>
                    <TabsTrigger value="BAT">BAT</TabsTrigger>
                    <TabsTrigger value="ALL">ALL</TabsTrigger>
                    <TabsTrigger value="BOWL">BOWL</TabsTrigger>
                  </TabsList>
                  
                  {['all', 'WK', 'BAT', 'ALL', 'BOWL'].map(role => (
                    <TabsContent key={role} value={role} className="space-y-2">
                      {getPlayersByRole(role).map(player => {
                        const isSelected = selectedPlayers.some(p => p.id === player.id);
                        const isCaptain = captain === player.id;
                        const isViceCaptain = viceCaptain === player.id;
                        
                        return (
                          <div
                            key={player.id}
                            className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all cursor-pointer ${
                              isSelected 
                                ? 'border-primary bg-primary/5' 
                                : 'border-gray-200 hover:border-primary/50'
                            }`}
                            onClick={() => togglePlayerSelection(player)}
                          >
                            <div className="flex items-center gap-4 flex-1">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {getRoleIcon(player.role)}
                              </div>
                              <div className="flex-1">
                                <div className="font-bold text-foreground">{player.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {getRoleLabel(player.role)} • {player.team}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              {isSelected && (
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant={isCaptain ? "default" : "outline"}
                                    className={isCaptain ? "bg-primary" : ""}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setCaptain(player.id);
                                    }}
                                  >
                                    C
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant={isViceCaptain ? "default" : "outline"}
                                    className={isViceCaptain ? "bg-primary" : ""}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setViceCaptain(player.id);
                                    }}
                                  >
                                    VC
                                  </Button>
                                </div>
                              )}
                              <div className="text-lg font-black text-foreground">
                                {player.credits}
                              </div>
                              {isSelected && (
                                <Check className="w-5 h-5 text-primary" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Selected Team Preview */}
          <div>
            <Card className="sticky top-32">
              <CardContent className="p-6">
                <h3 className="font-black text-lg mb-4">Selected Team</h3>
                
                {selectedPlayers.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No players selected yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedPlayers.map(player => {
                      const isCaptain = captain === player.id;
                      const isViceCaptain = viceCaptain === player.id;
                      
                      return (
                        <div key={player.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                              {getRoleIcon(player.role)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-bold truncate">{player.name}</div>
                              {(isCaptain || isViceCaptain) && (
                                <Badge variant="secondary" className="text-xs">
                                  {isCaptain ? 'Captain' : 'Vice Captain'}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-sm font-bold">{player.credits}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {/* Team Composition Rules */}
                <div className="mt-6 pt-6 border-t space-y-2">
                  <h4 className="font-bold text-sm mb-3">Team Requirements</h4>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div>• Min 1 Wicket-keeper</div>
                    <div>• Min 3 Batsmen</div>
                    <div>• Min 1 All-rounder</div>
                    <div>• Min 3 Bowlers</div>
                    <div>• Max 7 players from one team</div>
                    <div>• Select Captain & Vice Captain</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

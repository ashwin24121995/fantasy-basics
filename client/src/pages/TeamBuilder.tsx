import { useState, useMemo } from "react";
import { useRoute, useLocation, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Users, Trophy, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface SelectedPlayer {
  id: string;
  name: string;
  role: string;
  isCaptain: boolean;
  isViceCaptain: boolean;
}

export default function TeamBuilder() {
  const [, params] = useRoute("/matches/:matchId/team-builder");
  const [location] = useLocation();
  const matchId = params?.matchId || "";
  
  // Get contestId from URL query params
  const searchParams = new URLSearchParams(location.split("?")[1]);
  const contestId = searchParams.get("contestId");

  const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayer[]>([]);
  const [teamName, setTeamName] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

  const { data: match } = trpc.matches.getMatchById.useQuery({ matchId }, { enabled: !!matchId });
  const { data: squad, isLoading: loadingSquad } = trpc.matches.getFantasySquad.useQuery(
    { matchId },
    { enabled: !!matchId }
  );

  const createTeamMutation = trpc.teams.createTeam.useMutation({
    onSuccess: () => {
      toast.success("Team created successfully!");
      // Redirect to contest page or dashboard
      window.location.href = `/matches/${matchId}`;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Get all players from squad
  const allPlayers = useMemo(() => {
    if (!squad || !squad.players) return [];
    
    const playersList: any[] = [];
    Object.keys(squad.players).forEach((teamName) => {
      squad.players[teamName].forEach((player: any) => {
        playersList.push({
          ...player,
          teamName,
        });
      });
    });
    
    return playersList;
  }, [squad]);

  // Filter players by role
  const playersByRole = useMemo(() => {
    const roles: Record<string, any[]> = {
      all: allPlayers,
      batsman: [],
      bowler: [],
      allrounder: [],
      wicketkeeper: [],
    };

    allPlayers.forEach((player) => {
      const role = player.role?.toLowerCase() || "";
      if (role.includes("batsman") || role.includes("batting")) {
        roles.batsman.push(player);
      } else if (role.includes("bowler") || role.includes("bowling")) {
        roles.bowler.push(player);
      } else if (role.includes("allrounder") || role.includes("all-rounder")) {
        roles.allrounder.push(player);
      } else if (role.includes("wicket") || role.includes("wk")) {
        roles.wicketkeeper.push(player);
      }
    });

    return roles;
  }, [allPlayers]);

  const isPlayerSelected = (playerId: string) => {
    return selectedPlayers.some((p) => p.id === playerId);
  };

  const handlePlayerToggle = (player: any) => {
    if (isPlayerSelected(player.id)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id));
    } else {
      if (selectedPlayers.length >= 11) {
        toast.error("You can only select 11 players");
        return;
      }
      setSelectedPlayers([
        ...selectedPlayers,
        {
          id: player.id,
          name: player.name,
          role: player.role,
          isCaptain: false,
          isViceCaptain: false,
        },
      ]);
    }
  };

  const handleSetCaptain = (playerId: string) => {
    setSelectedPlayers(
      selectedPlayers.map((p) => ({
        ...p,
        isCaptain: p.id === playerId,
        isViceCaptain: p.id === playerId ? false : p.isViceCaptain,
      }))
    );
  };

  const handleSetViceCaptain = (playerId: string) => {
    setSelectedPlayers(
      selectedPlayers.map((p) => ({
        ...p,
        isViceCaptain: p.id === playerId,
        isCaptain: p.id === playerId ? false : p.isCaptain,
      }))
    );
  };

  const captain = selectedPlayers.find((p) => p.isCaptain);
  const viceCaptain = selectedPlayers.find((p) => p.isViceCaptain);

  const canSubmit = selectedPlayers.length === 11 && captain && viceCaptain && teamName.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit || !contestId) {
      toast.error("Please complete your team selection");
      return;
    }

    createTeamMutation.mutate({
      contestId: parseInt(contestId),
      matchId,
      teamName,
      captainId: captain!.id,
      viceCaptainId: viceCaptain!.id,
      players: selectedPlayers.map((p) => ({
        playerId: p.id,
        role: p.role,
      })),
    });
  };

  if (loadingSquad) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!squad || allPlayers.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <Card>
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Squad not available for this match yet.</p>
              <Link href={`/matches/${matchId}`}>
                <Button className="mt-4">Back to Match</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/matches/${matchId}`}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">Create Your Team</h1>
                <p className="text-sm text-muted-foreground">{match?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Players Selected</p>
                <p className="text-2xl font-bold">
                  {selectedPlayers.length}
                  <span className="text-sm text-muted-foreground">/11</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Player Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Select Players</CardTitle>
                <CardDescription>Choose 11 players for your fantasy team</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="batsman">Batsmen</TabsTrigger>
                    <TabsTrigger value="bowler">Bowlers</TabsTrigger>
                    <TabsTrigger value="allrounder">All-rounders</TabsTrigger>
                    <TabsTrigger value="wicketkeeper">WK</TabsTrigger>
                  </TabsList>

                  {Object.keys(playersByRole).map((role) => (
                    <TabsContent key={role} value={role} className="mt-4">
                      <div className="space-y-2 max-h-[600px] overflow-y-auto">
                        {playersByRole[role].map((player: any) => {
                          const selected = isPlayerSelected(player.id);
                          return (
                            <div
                              key={player.id}
                              className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                                selected ? "bg-primary/10 border-primary" : "hover:bg-muted"
                              }`}
                              onClick={() => handlePlayerToggle(player)}
                            >
                              <div className="flex items-center gap-3">
                                {player.playerImg && (
                                  <img
                                    src={player.playerImg}
                                    alt={player.name}
                                    className="h-10 w-10 rounded-full object-cover"
                                  />
                                )}
                                <div>
                                  <p className="font-medium">{player.name}</p>
                                  <p className="text-sm text-muted-foreground">{player.role}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{player.teamName}</Badge>
                                {selected && <CheckCircle2 className="h-5 w-5 text-primary" />}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Selected Team */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Your Team</CardTitle>
                <CardDescription>{selectedPlayers.length}/11 players selected</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Team Name */}
                <div className="space-y-2">
                  <Label htmlFor="teamName">Team Name</Label>
                  <Input
                    id="teamName"
                    placeholder="Enter team name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </div>

                {/* Selected Players List */}
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {selectedPlayers.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No players selected yet
                    </p>
                  ) : (
                    selectedPlayers.map((player) => (
                      <div key={player.id} className="flex items-center justify-between p-2 rounded border">
                        <div>
                          <p className="text-sm font-medium">{player.name}</p>
                          <p className="text-xs text-muted-foreground">{player.role}</p>
                        </div>
                        <div className="flex gap-1">
                          {player.isCaptain && <Badge variant="default">C</Badge>}
                          {player.isViceCaptain && <Badge variant="secondary">VC</Badge>}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Captain & Vice Captain Selection */}
                {selectedPlayers.length > 0 && (
                  <div className="space-y-3 pt-4 border-t">
                    <div className="space-y-2">
                      <Label>Select Captain (2x points)</Label>
                      <select
                        className="w-full p-2 rounded border"
                        value={captain?.id || ""}
                        onChange={(e) => handleSetCaptain(e.target.value)}
                      >
                        <option value="">Choose Captain</option>
                        {selectedPlayers.map((player) => (
                          <option key={player.id} value={player.id}>
                            {player.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label>Select Vice Captain (1.5x points)</Label>
                      <select
                        className="w-full p-2 rounded border"
                        value={viceCaptain?.id || ""}
                        onChange={(e) => handleSetViceCaptain(e.target.value)}
                      >
                        <option value="">Choose Vice Captain</option>
                        {selectedPlayers.map((player) => (
                          <option key={player.id} value={player.id}>
                            {player.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={!canSubmit || createTeamMutation.isPending}
                >
                  {createTeamMutation.isPending ? "Creating Team..." : "Create Team & Join Contest"}
                </Button>

                {!canSubmit && selectedPlayers.length > 0 && (
                  <p className="text-xs text-muted-foreground text-center">
                    {selectedPlayers.length < 11 && "Select 11 players. "}
                    {!captain && "Choose a captain. "}
                    {!viceCaptain && "Choose a vice captain. "}
                    {!teamName && "Enter team name."}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

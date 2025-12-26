import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { INDIAN_STATES, MINIMUM_AGE } from "@shared/constants";

interface ProfileCompletionProps {
  onComplete: () => void;
}

export default function ProfileCompletion({ onComplete }: ProfileCompletionProps) {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [state, setState] = useState("");

  const completeProfileMutation = trpc.user.completeProfile.useMutation({
    onSuccess: () => {
      toast.success("Profile completed successfully!");
      onComplete();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!dateOfBirth || !state) {
      toast.error("Please fill in all fields");
      return;
    }

    completeProfileMutation.mutate({
      dateOfBirth,
      state,
    });
  };

  // Calculate max date (18 years ago from today)
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - MINIMUM_AGE);
  const maxDateString = maxDate.toISOString().split("T")[0];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>
            We need some information to verify your eligibility for fantasy sports in India.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                max={maxDateString}
                required
              />
              <p className="text-sm text-muted-foreground">
                You must be at least {MINIMUM_AGE} years old to participate.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State/Union Territory</Label>
              <Select value={state} onValueChange={setState} required>
                <SelectTrigger id="state">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {INDIAN_STATES.map((stateName) => (
                    <SelectItem key={stateName} value={stateName}>
                      {stateName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Fantasy sports are restricted in some states as per Indian regulations.
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={completeProfileMutation.isPending}>
              {completeProfileMutation.isPending ? "Verifying..." : "Complete Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

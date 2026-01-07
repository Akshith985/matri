"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { updateUserProfile } from "@/lib/firebase/firestore";
import { pregnancyPhases, type PregnancyPhase } from "@/lib/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface PhaseSelectorProps {
  currentPhase: PregnancyPhase;
  onPhaseChange: (phase: PregnancyPhase) => void;
}

export default function PhaseSelector({ currentPhase, onPhaseChange }: PhaseSelectorProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [localPhase, setLocalPhase] = useState(currentPhase);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleValueChange = async (phase: string) => {
    if (!user || isUpdating) return;

    setIsUpdating(true);
    const newPhase = phase as PregnancyPhase;
    setLocalPhase(newPhase);

    try {
      await updateUserProfile(user.uid, { phase: newPhase });
      onPhaseChange(newPhase); // Notify parent component
      toast({
        title: "Phase Updated",
        description: `Your dashboard is now tailored for the ${newPhase}-Pregnancy phase.`,
      });
    } catch (error) {
      console.error(error);
      setLocalPhase(currentPhase); // Revert on error
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Could not update your phase. Please try again.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">My Current Phase</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={localPhase} onValueChange={handleValueChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {pregnancyPhases.map((phase) => (
              <TabsTrigger key={phase} value={phase} disabled={isUpdating}>
                {phase}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  );
}

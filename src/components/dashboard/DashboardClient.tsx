"use client";

import { useState } from "react";
import Header from "@/components/shared/Header";
import PhaseSelector from "@/components/dashboard/PhaseSelector";
import AiSuggestions from "@/components/dashboard/AiSuggestions";
import { useAuth } from "@/hooks/useAuth";
import type { PregnancyPhase } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardClient() {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const [phase, setPhase] = useState<PregnancyPhase | null>(userProfile?.phase ?? null);

  const handlePhaseChange = (newPhase: PregnancyPhase) => {
    setPhase(newPhase);
  };
  
  if (!userProfile || !phase) {
    return (
      <div>
        <Header />
        <main className="container mx-auto p-4 md:p-8 space-y-8">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-40 w-full" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="space-y-8">
          <Card className="bg-primary/10 border-primary/20">
            <CardHeader>
              <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary-foreground">
                Welcome, {user?.email}!
              </h1>
              <p className="text-primary-foreground/80">Here's your personalized space for a healthy journey.</p>
            </CardHeader>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <Calendar className="text-primary" />
                  Book an Appointment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Schedule your next check-up with a specialist.</p>
                <Button onClick={() => router.push('/appointments')}>Book Now</Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <MapPin className="text-primary" />
                  Find Nearby Care
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Locate hospitals and clinics near you.</p>
                <Button onClick={() => router.push('/locations')}>Find Locations</Button>
              </CardContent>
            </Card>
          </div>
          
          <PhaseSelector currentPhase={phase} onPhaseChange={handlePhaseChange} />

          <AiSuggestions phase={phase} />
        </div>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/shared/Header";
import PhaseSelector from "@/components/dashboard/PhaseSelector";
import AiSuggestions from "@/components/dashboard/AiSuggestions";
import { useAuth } from "@/hooks/useAuth";
import type { PregnancyPhase } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardClient() {
  const { user, userProfile } = useAuth();
  const [phase, setPhase] = useState<PregnancyPhase | null>(userProfile?.phase ?? null);

  const welcomeImage = PlaceHolderImages.find(img => img.id === 'dashboard-welcome');

  const handlePhaseChange = (newPhase: PregnancyPhase) => {
    setPhase(newPhase);
  };
  
  // This state is managed from the page component's loading check
  // But we add a skeleton for a better UX while profile data loads
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
          <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden shadow-sm">
            {welcomeImage && (
                <Image 
                    src={welcomeImage.imageUrl} 
                    alt={welcomeImage.description} 
                    fill 
                    className="object-cover"
                    data-ai-hint={welcomeImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-black/30 flex items-end p-6">
                <h1 className="text-3xl md:text-4xl font-bold font-headline text-white">
                    Welcome, {user?.email}!
                </h1>
            </div>
          </div>
          
          <PhaseSelector currentPhase={phase} onPhaseChange={handlePhaseChange} />

          <AiSuggestions phase={phase} />
        </div>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import { aiSuggestsCustomizedRecommendations } from "@/ai/flows/ai-suggests-customized-recommendations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2 } from "lucide-react";
import type { PregnancyPhase } from "@/lib/types";

interface AiSuggestionsProps {
  phase: PregnancyPhase;
}

export default function AiSuggestions({ phase }: AiSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getSuggestions = async () => {
    setIsLoading(true);
    setSuggestions(null);
    try {
      const result = await aiSuggestsCustomizedRecommendations({
        pregnancyPhase: phase,
      });
      setSuggestions(result.suggestions);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch AI suggestions. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Wand2 className="text-primary" />
            Personalized Health Suggestions
        </CardTitle>
        <CardDescription>
          Get AI-powered tips and recommendations tailored to your current phase.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={getSuggestions} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Get Suggestions"
          )}
        </Button>
        
        {suggestions && !isLoading && (
            <Card className="bg-accent/50">
                <CardContent className="p-6">
                    <p className="whitespace-pre-wrap">{suggestions}</p>
                </CardContent>
            </Card>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/hooks/useAuth";
import { pregnancyPhases, type PregnancyPhase } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Header from "@/components/shared/Header";

const profileSchema = z.object({
  phase: z.enum(pregnancyPhases, {
    required_error: "You need to select a pregnancy phase.",
  }),
});

export default function ProfilePage() {
  const { user, userProfile, loading: authLoading, updatePhase } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
    if (!authLoading && user && userProfile?.phase) {
      router.replace('/dashboard');
    }
  }, [user, userProfile, authLoading, router]);
  
  const onSubmit = (data: z.infer<typeof profileSchema>) => {
    if (!user) return;
    setIsSubmitting(true);
    
    updatePhase(data.phase as PregnancyPhase);
    
    toast({
      title: "Profile Updated!",
      description: "Your dashboard is now being personalized.",
    });
    
    router.push("/dashboard");
  };

  if (authLoading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Welcome to BloomCare!</CardTitle>
            <CardDescription>
              To get started, please select your current phase. This will help us personalize your experience.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="phase"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base">My Current Phase</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {pregnancyPhases.map((phase) => (
                            <FormItem key={phase} className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value={phase} />
                              </FormControl>
                              <FormLabel className="font-normal">{phase}-Pregnancy</FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save and Continue
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

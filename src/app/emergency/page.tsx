
"use client";

import Header from "@/components/shared/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, ShieldAlert, HeartPulse } from "lucide-react";

export default function EmergencyPage() {
  const ambulanceNumber = "911";
  const helplineNumber = "211";

  return (
    <>
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col items-center text-center">
          <ShieldAlert className="h-16 w-16 text-destructive mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-destructive">Emergency Services</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            In case of a medical emergency, please use the options below immediately. Your health and safety are our top priority.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
          <Card className="border-destructive/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-headline">
                <Phone className="h-6 w-6 text-destructive" />
                Call Ambulance
              </CardTitle>
              <CardDescription>
                For immediate medical assistance. Connects you to local emergency services.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="destructive" className="w-full text-lg py-6">
                <a href={`tel:${ambulanceNumber}`}>
                  <Phone className="mr-2 h-5 w-5" /> Call {ambulanceNumber}
                </a>
              </Button>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-headline">
                <HeartPulse className="h-6 w-6 text-primary" />
                Pregnancy Helpline
              </CardTitle>
              <CardDescription>
                For urgent questions and non-emergency support from a professional.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild className="w-full text-lg py-6">
                    <a href={`tel:${helplineNumber}`}>
                    <Phone className="mr-2 h-5 w-5" /> Call {helplineNumber}
                    </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Header from "@/components/shared/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LocationsPage() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [manualAddress, setManualAddress] = useState("");
  const [mapQuery, setMapQuery] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { toast } = useToast();

  const getMapEmbedUrl = (query: string) => {
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "Geolocation Not Supported",
        description: "Your browser doesn't support geolocation.",
      });
      return;
    }
    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setMapQuery(`prenatal care near ${latitude},${longitude}`);
        setIsLoadingLocation(false);
        toast({
          title: "Location Found",
          description: "Showing care centers near you.",
        });
      },
      () => {
        toast({
          variant: "destructive",
          title: "Unable to retrieve your location",
          description: "Please enable location services or enter an address manually.",
        });
        setIsLoadingLocation(false);
      }
    );
  };

  const handleManualSearch = () => {
    if (!manualAddress.trim()) {
      toast({
        variant: "destructive",
        title: "Address Required",
        description: "Please enter an address or area to search.",
      });
      return;
    }
    setLocation(null); // Clear geolocation
    setMapQuery(`prenatal care near ${manualAddress}`);
  };
  
  useEffect(() => {
    // Set a default view when the page loads for the first time
    if (!mapQuery) {
        setMapQuery("prenatal care");
    }
  }, [mapQuery]);

  return (
    <>
      <Header />
      <main className="container mx-auto p-4 md:p-8 flex flex-col items-center">
        <div className="text-center mb-8 w-full max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Find Care Near You</h1>
          <p className="text-muted-foreground mt-2">Discover trusted partner clinics and hospitals on the map below.</p>
        </div>

        <Card className="w-full max-w-4xl mb-8">
          <CardHeader>
            <CardTitle>Search for Care Centers</CardTitle>
            <CardDescription>
              Automatically find centers near you or enter an address to search manually.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4">
            <Button onClick={handleGetCurrentLocation} disabled={isLoadingLocation} className="w-full md:w-auto">
              {isLoadingLocation ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <MapPin className="mr-2 h-4 w-4" />
              )}
              Use My Current Location
            </Button>
            <div className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Enter city, state, or zip code"
                value={manualAddress}
                onChange={(e) => setManualAddress(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
              />
              <Button onClick={handleManualSearch}>Search</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full max-w-4xl h-[60vh] shadow-lg">
          {mapQuery ? (
            <iframe
              src={getMapEmbedUrl(mapQuery)}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
              title="Nearby Care Centers Map"
            ></iframe>
          ) : (
             <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Please provide a location to see the map.</p>
             </div>
          )}
        </Card>
      </main>
    </>
  );
}

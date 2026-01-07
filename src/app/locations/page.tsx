"use client";

import Header from "@/components/shared/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone } from "lucide-react";

const locations = [
  {
    name: "BloomCare Wellness Center",
    address: "123 Blossom Lane, Harmony City, 45678",
    phone: "(555) 123-4567",
  },
  {
    name: "Serenity Prenatal Clinic",
    address: "456 Tranquil Ave, Meadowbrook, 12345",
    phone: "(555) 987-6543",
  },
  {
    name: "The Mother-Baby Hub",
    address: "789 Nurture Rd, Sunnyside, 87654",
    phone: "(555) 246-8135",
  },
];

export default function LocationsPage() {
  const getMapEmbedUrl = (address: string) => {
    return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Find Care Near You</h1>
          <p className="text-muted-foreground mt-2">Discover our trusted partner clinics and hospitals.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location) => (
            <Card key={location.name} className="flex flex-col">
              <div className="relative w-full h-64">
                <iframe
                  src={getMapEmbedUrl(location.address)}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-t-lg"
                  title={`Map for ${location.name}`}
                ></iframe>
              </div>
              <CardHeader>
                <CardTitle className="font-headline">{location.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-start gap-2 text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mt-1 shrink-0" />
                    <p>{location.address}</p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4 shrink-0" />
                    <p>{location.phone}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`, "_blank")}
                >
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}

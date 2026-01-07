"use client";

import Header from "@/components/shared/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone } from "lucide-react";
import Image from "next/image";

const locations = [
  {
    name: "BloomCare Wellness Center",
    address: "123 Blossom Lane, Harmony City, 45678",
    phone: "(555) 123-4567",
    mapImage: "https://picsum.photos/seed/location1/600/400"
  },
  {
    name: "Serenity Prenatal Clinic",
    address: "456 Tranquil Ave, Meadowbrook, 12345",
    phone: "(555) 987-6543",
    mapImage: "https://picsum.photos/seed/location2/600/400"
  },
  {
    name: "The Mother-Baby Hub",
    address: "789 Nurture Rd, Sunnyside, 87654",
    phone: "(555) 246-8135",
    mapImage: "https://picsum.photos/seed/location3/600/400"
  },
];

export default function LocationsPage() {
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
              <div className="relative w-full h-48">
                <Image
                  src={location.mapImage}
                  alt={`Map for ${location.name}`}
                  fill
                  className="object-cover rounded-t-lg"
                  data-ai-hint="map city"
                />
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
                <Button variant="outline" className="w-full mt-4">Get Directions</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}

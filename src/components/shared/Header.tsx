
"use client";

import Link from "next/link";
import { LogOut, User as UserIcon, Calendar, MapPin, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold font-headline text-2xl text-primary">BloomCare</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
            <Link href="/dashboard" className="text-foreground/70 hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/appointments" className="text-foreground/70 hover:text-foreground">
              Appointments
            </Link>
            <Link href="/locations" className="text-foreground/70 hover:text-foreground">
              Find Care
            </Link>
            <Link href="/emergency" className="text-destructive/70 hover:text-destructive font-semibold">
              Emergency
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user.email ? user.email.charAt(0).toUpperCase() : <UserIcon className="h-5 w-5" />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/appointments')}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>My Appointments</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/locations')}>
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Find Care</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/emergency')} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                  <ShieldAlert className="mr-2 h-4 w-4" />
                  <span>Emergency</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => router.push('/login')} size="sm">Log In</Button>
          )}
        </div>
      </div>
    </header>
  );
}

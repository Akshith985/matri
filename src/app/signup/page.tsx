"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import SignupForm from "@/components/auth/SignupForm";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

export default function SignupPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  const authBgImage = PlaceHolderImages.find(img => img.id === 'auth-background');

  if (loading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold font-headline">Join BloomCare</h1>
            <p className="text-balance text-muted-foreground">
              Enter your information to create an account
            </p>
          </div>
          <SignupForm />
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        {authBgImage && (
            <Image
                src={authBgImage.imageUrl}
                alt={authBgImage.description}
                fill
                className="object-cover"
                data-ai-hint={authBgImage.imageHint}
            />
        )}
      </div>
    </div>
  );
}

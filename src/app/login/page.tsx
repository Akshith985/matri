"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  if (loading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-background p-4">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold font-headline text-primary">Welcome Back</h1>
          <p className="text-balance text-muted-foreground">
            Enter your details to access your dashboard
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

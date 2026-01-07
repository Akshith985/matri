"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useUser } from "@/firebase";
import type { UserProfile } from "@/lib/types";


// This hook is being temporarily adapted.
// It will eventually be replaced entirely by the new `useUser` from `@/firebase`.
export function useAuth() {
  const context = useContext(AuthContext);
  const { user, isUserLoading } = useUser();
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  // Temporary bridge between old context and new hook
  return {
    user: context.user,
    userProfile: context.userProfile,
    loading: context.loading
  };
}

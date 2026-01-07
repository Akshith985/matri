"use client";

import { createContext, useState, useEffect, type ReactNode } from "react";
import type { UserProfile, PregnancyPhase } from "@/lib/types";

interface AuthContextType {
  user: { email: string; uid: string } | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string) => void;
  logout: () => void;
  updateProfile: (data: { phase: PregnancyPhase, displayName: string }) => void;
  createUser: (email: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  login: () => {},
  logout: () => {},
  updateProfile: () => {},
  createUser: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email: string; uid: string } | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("matri.user");
      const storedProfile = localStorage.getItem("matri.profile");
      if (storedUser && storedProfile) {
        setUser(JSON.parse(storedUser));
        setUserProfile(JSON.parse(storedProfile));
      }
    } catch (error) {
        console.error("Failed to parse from localStorage", error);
        localStorage.removeItem("matri.user");
        localStorage.removeItem("matri.profile");
    }
    setLoading(false);
  }, []);

  const login = (email: string) => {
    setLoading(true);
    const mockUser = { email, uid: `mock-uid-${Date.now()}` };
    
    // Check if a profile already exists to persist it across logins
    let existingProfile = null;
    try {
        const storedProfile = localStorage.getItem("matri.profile");
        if (storedProfile) {
            const parsed = JSON.parse(storedProfile);
            if(parsed.email === email) {
                existingProfile = parsed;
            }
        }
    } catch (e) {
        // ignore
    }

    const mockProfile = existingProfile || { uid: mockUser.uid, email, displayName: null, phase: null };
    
    localStorage.setItem("matri.user", JSON.stringify(mockUser));
    localStorage.setItem("matri.profile", JSON.stringify(mockProfile));

    setUser(mockUser);
    setUserProfile(mockProfile);
    setLoading(false);
  };
  
  const createUser = (email: string) => {
    // In this mock version, creating a user is the same as logging in, but we ensure no old profile is kept.
    const mockUser = { email, uid: `mock-uid-${Date.now()}` };
    const mockProfile = { uid: mockUser.uid, email, displayName: null, phase: null };
    
    localStorage.setItem("matri.user", JSON.stringify(mockUser));
    localStorage.setItem("matri.profile", JSON.stringify(mockProfile));

    setUser(mockUser);
    setUserProfile(mockProfile);
  }

  const logout = () => {
    setLoading(true);
    localStorage.removeItem("matri.user");
    // We can choose to remove the profile or not. For a better UX, we can keep it.
    // localStorage.removeItem("matri.profile");
    setUser(null);
    // setUserProfile(null); // Keep profile info for when they log back in
    setLoading(false);
  };

  const updateProfile = (data: { phase: PregnancyPhase, displayName: string }) => {
    if (userProfile) {
      const updatedProfile = { ...userProfile, ...data };
      localStorage.setItem("matri.profile", JSON.stringify(updatedProfile));
      setUserProfile(updatedProfile);
    }
  };

  const value = { user, userProfile, loading, login, logout, updateProfile, createUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

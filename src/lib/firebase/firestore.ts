import { doc, setDoc, getDoc, updateDoc, serverTimestamp, collection } from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "./firebase";
import type { UserProfile, PregnancyPhase } from "@/lib/types";

// This file is being deprecated. The new data functions will be co-located with their components
// or in dedicated service files that use the new `useFirestore` hooks.

export async function createUserProfile(user: User): Promise<void> {
  const userProfileRef = doc(db, "users", user.uid, "profiles", "main");
  const userProfile: UserProfile = {
    uid: user.uid,
    email: user.email!,
    phase: null,
  };
  await setDoc(userProfileRef, userProfile);
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userProfileRef = doc(db, "users", uid, "profiles", "main");
  const docSnap = await getDoc(userProfileRef);
  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  } else {
    return null;
  }
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
    const userProfileRef = doc(db, "users", uid, "profiles", "main");
    await updateDoc(userProfileRef, {
        ...data,
        updatedAt: serverTimestamp(),
    });
}

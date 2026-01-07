import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "./firebase";
import type { UserProfile, PregnancyPhase } from "@/lib/types";

export async function createUserProfile(user: User): Promise<void> {
  const userRef = doc(db, "users", user.uid);
  const userProfile: UserProfile = {
    uid: user.uid,
    email: user.email!,
    phase: null,
  };
  await setDoc(userRef, {
    ...userProfile,
    createdAt: serverTimestamp(),
  });
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  } else {
    return null;
  }
}

export async function updateUserProfile(
  uid: string,
  data: { phase: PregnancyPhase }
): Promise<void> {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

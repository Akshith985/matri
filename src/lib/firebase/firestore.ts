import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "./firebase";
import type { UserProfile } from "@/lib/types";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

// This file is being deprecated. The new data functions will be co-located with their components
// or in dedicated service files that use the new `useFirestore` hooks.

export function createUserProfile(user: User): void {
  const userProfileRef = doc(db, "users", user.uid, "profiles", "main");
  const userProfile: UserProfile = {
    uid: user.uid,
    email: user.email!,
    phase: null,
    userId: user.uid, // Ensure userId is included for security rules
  };

  setDoc(userProfileRef, userProfile).catch(error => {
    const permissionError = new FirestorePermissionError({
        path: userProfileRef.path,
        operation: 'create',
        requestResourceData: userProfile,
    });
    errorEmitter.emit('permission-error', permissionError);
    // We can still re-throw or handle the original error if needed for other logic
    // throw error; 
  });
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userProfileRef = doc(db, "users", uid, "profiles", "main");
  try {
    const docSnap = await getDoc(userProfileRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    } else {
      return null;
    }
  } catch (error) {
    const permissionError = new FirestorePermissionError({
        path: userProfileRef.path,
        operation: 'get',
    });
    errorEmitter.emit('permission-error', permissionError);
    return null; // Return null or re-throw as appropriate
  }
}

export function updateUserProfile(uid: string, data: Partial<UserProfile>): void {
    const userProfileRef = doc(db, "users", uid, "profiles", "main");
    const updateData = {
        ...data,
        updatedAt: serverTimestamp(),
    };
    updateDoc(userProfileRef, updateData).catch(error => {
        const permissionError = new FirestorePermissionError({
            path: userProfileRef.path,
            operation: 'update',
            requestResourceData: updateData,
        });
        errorEmitter.emit('permission-error', permissionError);
    });
}

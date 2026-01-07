export const pregnancyPhases = ['Pre', 'During', 'Post'] as const;

export type PregnancyPhase = (typeof pregnancyPhases)[number];

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  phase: PregnancyPhase | null;
}

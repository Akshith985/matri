export const pregnancyPhases = ['Pre', 'During', 'Post'] as const;

export type PregnancyPhase = (typeof pregnancyPhases)[number];

export interface UserProfile {
  uid: string;
  email: string;
  phase: PregnancyPhase | null;
}

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Profile {
  fullName: string;
  email: string;
  phone: string;
}

interface ProfileState {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
}

// Stored on-device only — there is no account backend yet, so this stands in
// for a real profile record until authentication exists.
export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
    }),
    { name: "vylore-profile" },
  ),
);

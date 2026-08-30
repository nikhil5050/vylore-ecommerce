"use client";

import dynamic from "next/dynamic";

// `ssr: false` requires a Client Component boundary — page.tsx is a Server
// Component, so the dynamic() call has to live here rather than inline
// there. Behavior is unchanged: VyloreExperience's JS chunk loads only on
// the client, with this placeholder shown until it's ready.
export const VyloreExperienceLazy = dynamic(
  () => import("./VyloreExperience").then((mod) => mod.VyloreExperience),
  {
    ssr: false,
    loading: () => (
      <div className="h-[80vh] w-full bg-white" aria-label="Loading experience" />
    ),
  }
);

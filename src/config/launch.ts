// Toggle the whole site into "coming soon" mode: "/" shows ComingSoon and
// every other route redirects back to it (see src/proxy.ts). Set the
// COMING_SOON env var to "false" once ready to launch — no code changes
// needed. Defaults to on, since a missing env var during development should
// fail toward "still gated," not toward exposing an unfinished site.
export const isComingSoon = process.env.COMING_SOON !== "false";

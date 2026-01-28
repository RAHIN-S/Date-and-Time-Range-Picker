import type { TimeInstant } from "../types";

export function formatDate(
  instant: TimeInstant,
  options?: Intl.DateTimeFormatOptions
): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: instant.timeZone,
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  }).format(new Date(instant.utcMillis));
}

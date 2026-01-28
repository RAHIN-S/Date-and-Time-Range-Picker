import type { TimeInstant } from "../types";

export function isEndAfterStart(
  start: TimeInstant,
  end: TimeInstant
): boolean {
  return end.utcMillis > start.utcMillis;
}

import type { TimeInstant, ValidationError } from "../types";
import { isEndAfterStart } from "./dateCompare";

export function validateRange(
  start: TimeInstant,
  end: TimeInstant
): ValidationError | null {
  if (!isEndAfterStart(start, end)) {
    return "END_BEFORE_START";
  }
  return null;
}

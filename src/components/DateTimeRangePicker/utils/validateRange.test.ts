import { describe, it, expect } from "vitest";
import { validateRange } from "./validateRange";

describe("validateRange", () => {
  it("returns null when end is after start", () => {
    const start = { utcMillis: 1000, timeZone: "UTC" };
    const end = { utcMillis: 2000, timeZone: "UTC" };

    expect(validateRange(start, end)).toBeNull();
  });

  it("returns error when end is before start", () => {
    const start = { utcMillis: 2000, timeZone: "UTC" };
    const end = { utcMillis: 1000, timeZone: "UTC" };

    expect(validateRange(start, end)).toBe("END_BEFORE_START");
  });
});

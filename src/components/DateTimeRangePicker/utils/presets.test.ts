import { describe, it, expect } from "vitest";
import { applyPreset } from "./presets";

describe("applyPreset", () => {
  it("creates a valid TODAY preset", () => {
    const now = Date.UTC(2026, 0, 10, 12);
    const { start, end } = applyPreset("TODAY", "UTC", now);

    expect(start.utcMillis).toBeLessThan(end.utcMillis);
  });

  it("creates a valid LAST_7_DAYS preset", () => {
    const now = Date.UTC(2026, 0, 10, 12);
    const { start, end } = applyPreset("LAST_7_DAYS", "UTC", now);

    expect(end.utcMillis - start.utcMillis).toBeGreaterThan(0);
  });
});

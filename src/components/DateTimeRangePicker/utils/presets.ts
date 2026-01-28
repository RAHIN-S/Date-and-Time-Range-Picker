import type { TimeInstant, PresetKey } from "../types";

export function applyPreset(
  preset: PresetKey,
  timeZone: string,
  nowUtcMillis: number
): { start: TimeInstant; end: TimeInstant } {
  switch (preset) {
    case "TODAY": {
      const start = startOfDayUtc(nowUtcMillis);
      const end = start + MS_IN_DAY - 1;

      return {
        start: { utcMillis: start, timeZone },
        end: { utcMillis: end, timeZone },
      };
    }

    case "LAST_7_DAYS": {
      const end = nowUtcMillis;
      const start = end - 7 * MS_IN_DAY;

      return {
        start: { utcMillis: start, timeZone },
        end: { utcMillis: end, timeZone },
      };
    }

    case "NEXT_24_HOURS": {
      const start = nowUtcMillis;
      const end = start + MS_IN_DAY;

      return {
        start: { utcMillis: start, timeZone },
        end: { utcMillis: end, timeZone },
      };
    }

    default:
      throw new Error("Unknown preset");
  }
}

const MS_IN_DAY = 24 * 60 * 60 * 1000;

function startOfDayUtc(utcMillis: number): number {
  const d = new Date(utcMillis);
  return Date.UTC(
    d.getUTCFullYear(),
    d.getUTCMonth(),
    d.getUTCDate()
  );
}

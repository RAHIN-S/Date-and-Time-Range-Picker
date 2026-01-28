import { useState } from "react";
import type { RangeState, TimeInstant } from "./types";
import { CalendarGrid } from "../CalendarGrid";
import { validateRange } from "./utils/validateRange";
import { formatDate } from "./utils/formatDate";
import { applyPreset } from "./utils/presets";

/* ------------------------------------------------------------------ */
/* Timezone configuration                                             */
/* ------------------------------------------------------------------ */

const AVAILABLE_TIMEZONES = [
  "UTC",
  "America/New_York",
  "Europe/London",
  "Asia/Kolkata",
];

/* ------------------------------------------------------------------ */
/* Error message helper (for aria-live feedback)                       */
/* ------------------------------------------------------------------ */

function getErrorMessage(error: string): string {
  switch (error) {
    case "END_BEFORE_START":
      return "End date must be after start date.";
    case "OUT_OF_RANGE":
      return "Selected date is outside the allowed range.";
    default:
      return "Invalid date selection.";
  }
}

/* ------------------------------------------------------------------ */
/* Main Component                                                      */
/* ------------------------------------------------------------------ */

export function DateTimeRangePicker() {
  const [rangeState, setRangeState] = useState<RangeState>({
    status: "empty",
  });

  const [timeZone, setTimeZone] = useState<string>("UTC");

  function handleSelect(date: TimeInstant) {
    if (rangeState.status === "empty") {
      setRangeState({ status: "selecting", start: date });
      return;
    }

    if (rangeState.status === "selecting") {
      const error = validateRange(rangeState.start, date);

      if (error) {
        setRangeState({ status: "invalid", error });
      } else {
        setRangeState({
          status: "complete",
          start: rangeState.start,
          end: date,
        });
      }
      return;
    }

    setRangeState({ status: "selecting", start: date });
  }

  return (
    <div className="space-y-3">
      {/* ---------------- Timezone Selector ---------------- */}
      <label className="flex items-center gap-2">
        <span className="text-sm font-medium">Timezone:</span>
        <select
          className="border border-border rounded px-2 py-1 bg-bg text-fg"
          value={timeZone}
          onChange={(e) => setTimeZone(e.target.value)}
        >
          {AVAILABLE_TIMEZONES.map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </select>
      </label>

      {/* ---------------- Selected Date Display ---------------- */}
      <div className="min-h-[2.5rem] text-sm">
        {rangeState.status === "selecting" && (
          <p>
            <span className="font-medium">Start:</span>{" "}
            {formatDate({ ...rangeState.start, timeZone })}
          </p>
        )}

        {rangeState.status === "complete" && (
          <p>
            <span className="font-medium">Start:</span>{" "}
            {formatDate({ ...rangeState.start, timeZone })}
            <br />
            <span className="font-medium">End:</span>{" "}
            {formatDate({ ...rangeState.end, timeZone })}
          </p>
        )}
      </div>

      {/* ---------------- Presets ---------------- */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Presets:</span>

        <button
          className="px-2 py-1 border border-border rounded bg-bg hover:bg-primarySoft"
          onClick={() => {
            const { start, end } = applyPreset("TODAY", timeZone, Date.now());
            setRangeState({ status: "complete", start, end });
          }}
        >
          Today
        </button>

        <button
          className="px-2 py-1 border border-border rounded bg-bg hover:bg-primarySoft"
          onClick={() => {
            const { start, end } = applyPreset(
              "LAST_7_DAYS",
              timeZone,
              Date.now(),
            );
            setRangeState({ status: "complete", start, end });
          }}
        >
          Last 7 Days
        </button>

        <button
          className="px-2 py-1 border border-border rounded bg-bg hover:bg-primarySoft"
          onClick={() => {
            const { start, end } = applyPreset(
              "NEXT_24_HOURS",
              timeZone,
              Date.now(),
            );
            setRangeState({ status: "complete", start, end });
          }}
        >
          Next 24 Hours
        </button>
      </div>

      {/* ---------------- Calendar ---------------- */}
      <CalendarGrid
        year={2026}
        month={2}
        startUtcMillis={
          rangeState.status === "selecting" || rangeState.status === "complete"
            ? rangeState.start.utcMillis
            : undefined
        }
        endUtcMillis={
          rangeState.status === "complete"
            ? rangeState.end.utcMillis
            : undefined
        }
        onSelectDate={(utcMillis) => handleSelect({ utcMillis, timeZone })}
      />

      {/* ---------------- aria-live Error Feedback ---------------- */}
      <div className="min-h-[1.5rem] text-sm text-danger">
        {rangeState.status === "invalid" && (
          <div role="alert" aria-live="assertive">
            {getErrorMessage(rangeState.error)}
          </div>
        )}
      </div>
    </div>
  );
}

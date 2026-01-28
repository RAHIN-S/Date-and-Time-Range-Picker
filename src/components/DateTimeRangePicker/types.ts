export type TimeInstant = {
  /** Absolute moment in time */
  utcMillis: number;

  /** IANA timezone, e.g. "America/New_York" */
  timeZone: string;
};


export type ValidationError =
  | "END_BEFORE_START"
  | "OUT_OF_RANGE";

export type RangeState =
  | { status: "empty" }
  | { status: "selecting"; start: TimeInstant }
  | { status: "complete"; start: TimeInstant; end: TimeInstant }
  | { status: "invalid"; error: ValidationError };

  export type PresetKey =
  | "TODAY"
  | "LAST_7_DAYS"
  | "NEXT_24_HOURS";

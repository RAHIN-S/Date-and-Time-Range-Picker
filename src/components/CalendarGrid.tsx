import { useState } from "react";

type CalendarGridProps = {
  year: number;
  month: number;
  startUtcMillis?: number;
  endUtcMillis?: number;
  onSelectDate: (utcMillis: number) => void;
};

export function CalendarGrid({
  year,
  month,
  startUtcMillis,
  endUtcMillis,
  onSelectDate,
}: CalendarGridProps) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const [focusedDay, setFocusedDay] = useState(1);

  function handleDayClick(day: number) {
    onSelectDate(Date.UTC(year, month, day));
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>
  ) {
    let next = focusedDay;

    switch (event.key) {
      case "ArrowRight":
        next++;
        break;
      case "ArrowLeft":
        next--;
        break;
      case "ArrowDown":
        next += 7;
        break;
      case "ArrowUp":
        next -= 7;
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        handleDayClick(focusedDay);
        return;
      default:
        return;
    }

    if (next < 1 || next > daysInMonth) return;
    event.preventDefault();
    setFocusedDay(next);
  }

  function isInRange(dayUtc: number) {
    return (
      startUtcMillis != null &&
      endUtcMillis != null &&
      dayUtc > startUtcMillis &&
      dayUtc < endUtcMillis
    );
  }

  return (
    <div
      role="grid"
      className="grid grid-cols-7 gap-1 max-w-xs"
    >
      {Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const utc = Date.UTC(year, month, day);

        const isStart = utc === startUtcMillis;
        const isEnd = utc === endUtcMillis;
        const inRange = isInRange(utc);
        const focused = day === focusedDay;

        let classes =
          "w-9 h-9 flex items-center justify-center " +
          "border border-border rounded cursor-pointer " +
          "focus:outline-none focus:ring-2 focus:ring-focus ";

        if (isStart || isEnd) {
          classes += " bg-primary text-white";
        } else if (inRange) {
          classes += " bg-primarySoft";
        } else {
          classes += " bg-bg";
        }

        return (
          <button
            key={day}
            role="gridcell"
            aria-selected={isStart || isEnd}
            tabIndex={focused ? 0 : -1}
            onClick={() => handleDayClick(day)}
            onKeyDown={handleKeyDown}
            className={classes}
          >
            {day}
          </button>
        );
      })}
    </div>
  );
}

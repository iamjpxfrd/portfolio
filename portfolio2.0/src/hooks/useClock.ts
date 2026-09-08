import { useEffect, useState } from "react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function format(now: Date) {
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  return {
    time: `${hh}:${mm}`,
    dateShort: `${WEEKDAYS[now.getDay()]} ${now.getDate()} ${MONTHS[now.getMonth()]}`,
    dateLong: `${WEEKDAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}`,
  };
}

/** Ticks once a minute — only HH:MM is displayed, so second-level precision is wasted work. */
export function useClock() {
  const [clock, setClock] = useState(() => format(new Date()));

  useEffect(() => {
    const id = setInterval(() => setClock(format(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);

  return clock;
}

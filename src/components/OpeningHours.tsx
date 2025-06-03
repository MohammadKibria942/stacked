"use client";
import React, { useState } from "react";

interface OpeningHoursProps {
  todayHoursString: string;
  allWeekHours: Array<{ day: string; hours: string }>;
}

export function OpeningHours({ todayHoursString, allWeekHours }: OpeningHoursProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full max-w-xs">
      <button
        className="flex items-center gap-1 w-full px-2 py-1 text-xs font-bold bg-transparent rounded transition shadow-none border-none outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="hours-accordion"
        style={{ boxShadow: 'none', border: 'none' }}
      >
        {/* Clock Icon from Lucide React */}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-primary"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"/></svg>
        <span>Opening Hours: {todayHoursString}</span>
        <svg className={`ml-2 transition-transform ${open ? "rotate-180" : "rotate-0"}`} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6"/></svg>
      </button>
      {open && (
        <div id="hours-accordion" className="mt-2 bg-background rounded p-2 text-xs shadow-none border-none">
          <ul>
            {allWeekHours.map((item) => (
              <li key={item.day} className="flex justify-between py-0.5">
                <span>{item.day}:</span>
                <span>{item.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

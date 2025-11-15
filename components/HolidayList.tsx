"use client";

import { Holiday } from "@/types";
import { getUpcomingHolidays } from "@/utils/holidayUtils";
import { formatDate, getDayName } from "@/utils/dateUtils";
import { useMemo, useState } from "react";

interface HolidayListProps {
  holidays: Holiday[];
}

export default function HolidayList({ holidays }: HolidayListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const allUpcomingHolidays = useMemo(() => {
    return getUpcomingHolidays(holidays);
  }, [holidays]);

  const displayedHolidays = useMemo(() => {
    return isExpanded ? allUpcomingHolidays : allUpcomingHolidays.slice(0, 3);
  }, [allUpcomingHolidays, isExpanded]);

  if (allUpcomingHolidays.length === 0) {
    return null;
  }

  const hasMore = allUpcomingHolidays.length > 3;

  return (
    <div className="mt-8 md:mt-12 p-6 md:p-8 bg-white dark:bg-gray-800 rounded-xl max-w-4xl mx-auto transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 shadow-sm dark:shadow-none">
      <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-gray-900 dark:text-gray-100">
        📅 Daftar Libur Nasional Mendatang
      </h3>
      <div className="space-y-3">
        {displayedHolidays.map((holiday, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-900 p-4 md:p-5 rounded-lg border-l-4 border-yellow-500 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20 hover:scale-[1.01] animate-in fade-in slide-in-from-left-4"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
              {holiday.name}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mt-1">
              {getDayName(holiday.date)}, {formatDate(holiday.date)}
            </p>
          </div>
        ))}
      </div>
      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 md:mt-6 w-full py-2.5 md:py-3 px-4 bg-yellow-500/20 hover:bg-yellow-500/30 dark:bg-yellow-500/20 dark:hover:bg-yellow-500/30 text-yellow-700 dark:text-yellow-400 font-semibold rounded-lg border border-yellow-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base"
        >
          {isExpanded ? (
            <span>▲ Tampilkan Lebih Sedikit</span>
          ) : (
            <span>▼ Tampilkan Semua ({allUpcomingHolidays.length} libur)</span>
          )}
        </button>
      )}
    </div>
  );
}

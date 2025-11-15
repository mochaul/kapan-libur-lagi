"use client";

import { Holiday } from "@/types";
import { getUpcomingHolidays } from "@/utils/holidayUtils";
import { formatDate, getDayName } from "@/utils/dateUtils";
import { useMemo } from "react";

interface HolidayListProps {
  holidays: Holiday[];
}

export default function HolidayList({ holidays }: HolidayListProps) {
  const upcomingHolidays = useMemo(() => {
    return getUpcomingHolidays(holidays).slice(0, 3);
  }, [holidays]);

  if (upcomingHolidays.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 p-8 bg-gray-800 rounded-xl max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6 text-gray-100">
        📅 Daftar Libur Nasional Mendatang
      </h3>
      <div className="space-y-3">
        {upcomingHolidays.map((holiday, index) => (
          <div
            key={index}
            className="bg-gray-900 p-4 rounded-lg border-l-4 border-yellow-500"
          >
            <h4 className="text-lg font-semibold text-gray-100">
              {holiday.name}
            </h4>
            <p className="text-gray-400 text-sm mt-1">
              {getDayName(holiday.date)}, {formatDate(holiday.date)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

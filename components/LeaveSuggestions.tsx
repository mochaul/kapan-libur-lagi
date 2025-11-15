"use client";

import { Holiday } from "@/types";
import { getUpcomingHolidays } from "@/utils/holidayUtils";
import { findLeaveSuggestions } from "@/utils/leaveSuggestionUtils";
import { formatDate } from "@/utils/dateUtils";
import { useMemo, useState } from "react";

interface LeaveSuggestionsProps {
  holidays: Holiday[];
}

export default function LeaveSuggestions({ holidays }: LeaveSuggestionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const allSuggestionsData = useMemo(() => {
    const upcomingHolidays = getUpcomingHolidays(holidays);
    const allSuggestions = findLeaveSuggestions(upcomingHolidays);

    // Map all holidays to their leave suggestions
    return upcomingHolidays.map((holiday) => {
      // Find the suggestion that includes this holiday
      const suggestion = allSuggestions.find((s) => {
        const holidayDate = new Date(holiday.date);
        holidayDate.setHours(0, 0, 0, 0);
        const suggestionDate = new Date(s.holidayDate);
        suggestionDate.setHours(0, 0, 0, 0);

        // Check if this holiday's date matches the suggestion's holiday date
        // or if the holiday name is included in the suggestion's holiday names
        return (
          suggestionDate.getTime() === holidayDate.getTime() ||
          s.holidayName.includes(holiday.name)
        );
      });

      return {
        holiday: holiday,
        suggestion: suggestion,
      };
    });
  }, [holidays]);

  // Filter to only show holidays with suggestions
  const suggestionsWithData = allSuggestionsData.filter(
    (item) => item.suggestion !== undefined
  );

  // Show first 3 initially, all when expanded
  const displayedSuggestions = isExpanded
    ? suggestionsWithData
    : suggestionsWithData.slice(0, 3);

  const hasMore = suggestionsWithData.length > 3;

  const hasSuggestions = allSuggestionsData.some(
    (item) => item.suggestion !== undefined
  );

  if (!hasSuggestions) {
    return (
      <div className="mt-8 md:mt-12 p-6 md:p-8 bg-white dark:bg-gray-800 rounded-xl max-w-4xl mx-auto transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 shadow-sm dark:shadow-none">
        <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-blue-600 dark:text-blue-400">
          💡 Rekomendasi Tanggal Cuti
        </h3>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
          Tidak ada rekomendasi cuti untuk libur nasional terdekat.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 md:mt-12 p-6 md:p-8 bg-white dark:bg-gray-800 rounded-xl max-w-4xl mx-auto transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 shadow-sm dark:shadow-none">
      <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-blue-600 dark:text-blue-400">
        💡 Rekomendasi Tanggal Cuti
      </h3>
      <div className="space-y-3 md:space-y-4">
        {displayedSuggestions.map((item, index) => {
          if (!item.suggestion) {
            return null;
          }

          // Get the holiday date
          const holidayDate = new Date(item.holiday.date);
          holidayDate.setHours(0, 0, 0, 0);

          // Calculate distance from each leave date to the holiday date
          // and sort by closest distance, then take top 3
          const leaveDatesWithDistance = item.suggestion.leaveDays.map(
            (leaveDate) => {
              const date = new Date(leaveDate);
              date.setHours(0, 0, 0, 0);
              const distance = Math.abs(date.getTime() - holidayDate.getTime());
              return { date: leaveDate, distance };
            }
          );

          // Sort by distance (closest first) and take top 3
          const top3LeaveDates = leaveDatesWithDistance
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 3)
            .map((item) => formatDate(item.date));

          const leaveDatesStr = top3LeaveDates.join(", ");

          return (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900 p-4 md:p-6 rounded-lg border-l-4 border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02]"
            >
              <h4 className="text-lg md:text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                {item.holiday.name}
              </h4>
              <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                <strong className="text-blue-600 dark:text-blue-400 font-semibold">
                  Rekomendasi Tanggal Cuti:
                </strong>{" "}
                {leaveDatesStr}
              </p>
            </div>
          );
        })}
      </div>
      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 md:mt-6 w-full py-2.5 md:py-3 px-4 bg-blue-500/20 hover:bg-blue-500/30 dark:bg-blue-500/20 dark:hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 font-semibold rounded-lg border border-blue-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base"
        >
          {isExpanded ? (
            <span>▲ Tampilkan Lebih Sedikit</span>
          ) : (
            <span>▼ Tampilkan Semua ({suggestionsWithData.length} libur)</span>
          )}
        </button>
      )}
    </div>
  );
}

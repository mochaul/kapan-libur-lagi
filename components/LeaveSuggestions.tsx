'use client';

import { Holiday } from '@/types';
import { getUpcomingHolidays } from '@/utils/holidayUtils';
import { findLeaveSuggestions } from '@/utils/leaveSuggestionUtils';
import { formatDate } from '@/utils/dateUtils';
import { useMemo } from 'react';

interface LeaveSuggestionsProps {
  holidays: Holiday[];
}

export default function LeaveSuggestions({ holidays }: LeaveSuggestionsProps) {
  const suggestions = useMemo(() => {
    const upcomingHolidays = getUpcomingHolidays(holidays);
    const closest3Holidays = upcomingHolidays.slice(0, 3);
    const allSuggestions = findLeaveSuggestions(upcomingHolidays);
    
    // Map each of the closest 3 holidays to their leave suggestions
    return closest3Holidays.map((holiday) => {
      // Find the suggestion that includes this holiday
      // A suggestion can include multiple holidays, so check if the holiday name is in the suggestion's holiday name
      const suggestion = allSuggestions.find((s) => {
        const holidayDate = new Date(holiday.date);
        holidayDate.setHours(0, 0, 0, 0);
        const suggestionDate = new Date(s.holidayDate);
        suggestionDate.setHours(0, 0, 0, 0);
        
        // Check if this holiday's date matches the suggestion's holiday date
        // or if the holiday name is included in the suggestion's holiday names
        return suggestionDate.getTime() === holidayDate.getTime() ||
               s.holidayName.includes(holiday.name);
      });
      
      return {
        holiday: holiday,
        suggestion: suggestion,
      };
    });
  }, [holidays]);

  const hasSuggestions = suggestions.some((item) => item.suggestion !== undefined);

  if (!hasSuggestions) {
    return (
      <div className="mt-12 p-8 bg-gray-800 rounded-xl max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6 text-blue-400">
          💡 Rekomendasi Tanggal Cuti
        </h3>
        <p className="text-gray-400">
          Tidak ada rekomendasi cuti untuk 3 libur nasional terdekat.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 p-8 bg-gray-800 rounded-xl max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6 text-blue-400">
        💡 Rekomendasi Tanggal Cuti
      </h3>
      <div className="space-y-4">
        {suggestions.map((item, index) => {
          if (!item.suggestion) {
            return null;
          }

          // Get the holiday date
          const holidayDate = new Date(item.holiday.date);
          holidayDate.setHours(0, 0, 0, 0);

          // Calculate distance from each leave date to the holiday date
          // and sort by closest distance, then take top 3
          const leaveDatesWithDistance = item.suggestion.leaveDays.map((leaveDate) => {
            const date = new Date(leaveDate);
            date.setHours(0, 0, 0, 0);
            const distance = Math.abs(date.getTime() - holidayDate.getTime());
            return { date: leaveDate, distance };
          });

          // Sort by distance (closest first) and take top 3
          const top3LeaveDates = leaveDatesWithDistance
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 3)
            .map((item) => formatDate(item.date));

          const leaveDatesStr = top3LeaveDates.join(', ');

          return (
            <div
              key={index}
              className="bg-gray-900 p-6 rounded-lg border-l-4 border-blue-500"
            >
              <h4 className="text-xl font-semibold mb-2 text-gray-100">
                {item.holiday.name}
              </h4>
              <p className="text-gray-300">
                <strong className="text-blue-400 font-semibold">
                  Rekomendasi Tanggal Cuti:
                </strong>{' '}
                {leaveDatesStr}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}


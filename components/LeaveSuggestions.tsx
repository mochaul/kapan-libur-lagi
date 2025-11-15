'use client';

import { Holiday } from '@/types';
import { getUpcomingHolidays } from '@/utils/holidayUtils';
import { findLeaveSuggestions } from '@/utils/leaveSuggestionUtils';
import { formatDate, getDayName } from '@/utils/dateUtils';
import { useMemo } from 'react';

interface LeaveSuggestionsProps {
  holidays: Holiday[];
}

export default function LeaveSuggestions({ holidays }: LeaveSuggestionsProps) {
  const suggestions = useMemo(() => {
    const upcomingHolidays = getUpcomingHolidays(holidays);
    return findLeaveSuggestions(upcomingHolidays).slice(0, 5);
  }, [holidays]);

  if (suggestions.length === 0) {
    return (
      <div className="mt-12 p-8 bg-gray-800 rounded-xl max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6 text-blue-400">
          💡 Saran Cuti untuk Libur Panjang
        </h3>
        <p className="text-gray-400">
          Tidak ada saran cuti yang dapat dibuat untuk libur panjang.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 p-8 bg-gray-800 rounded-xl max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6 text-blue-400">
        💡 Saran Cuti untuk Libur Panjang
      </h3>
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => {
          const leaveDatesStr = suggestion.leaveDays
            .map((d) => `${getDayName(d)}, ${formatDate(d)}`)
            .join(', ');

          const dateRange =
            suggestion.startDate.getTime() === suggestion.endDate.getTime()
              ? `${getDayName(suggestion.holidayDate)}, ${formatDate(
                  suggestion.holidayDate
                )}`
              : `${getDayName(suggestion.startDate)}, ${formatDate(
                  suggestion.startDate
                )} - ${getDayName(suggestion.endDate)}, ${formatDate(
                  suggestion.endDate
                )}`;

          return (
            <div
              key={index}
              className="bg-gray-900 p-6 rounded-lg border-l-4 border-blue-500"
            >
              <h4 className="text-xl font-semibold mb-2 text-gray-100">
                {index + 1}. {suggestion.holidayName}
              </h4>
              <p className="text-gray-300 mb-2">
                <strong>Periode Libur:</strong> {dateRange}
              </p>
              <p className="text-gray-300 mb-2">
                <strong className="text-blue-400 font-semibold">
                  Ambil Cuti:
                </strong>{' '}
                {leaveDatesStr}
              </p>
              <p className="text-gray-300">
                <strong className="text-green-400 font-semibold">
                  Total Libur Berturut-turut: {suggestion.totalDays} hari
                </strong>{' '}
                (dengan {suggestion.leaveDaysCount} hari cuti)
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}


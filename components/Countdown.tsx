'use client';

import { useState, useEffect } from 'react';
import { Holiday } from '@/types';
import { findNextHoliday } from '@/utils/holidayUtils';
import { formatDate, getDayName } from '@/utils/dateUtils';

interface CountdownProps {
  holidays: Holiday[];
}

export default function Countdown({ holidays }: CountdownProps) {
  const [countdown, setCountdown] = useState<{
    days: number;
    holidayName: string;
    holidayDate: Date;
  } | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const nextHoliday = findNextHoliday(holidays);
      const now = new Date();
      const holidayDate = new Date(nextHoliday.date);
      holidayDate.setHours(0, 0, 0, 0);

      const difference = holidayDate.getTime() - now.getTime();

      if (difference <= 0) {
        setCountdown({
          days: 0,
          holidayName: nextHoliday.name,
          holidayDate: holidayDate,
        });
        return;
      }

      // Calculate days only
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));

      setCountdown({
        days,
        holidayName: nextHoliday.name,
        holidayDate: holidayDate,
      });
    };

    // Initialize
    updateCountdown();

    // Update every hour (since we only show days)
    const interval = setInterval(updateCountdown, 3600000);

    return () => clearInterval(interval);
  }, [holidays]);

  if (!countdown) {
    return null;
  }

  const formattedDays = countdown.days.toString().padStart(2, '0');

  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-100">
        {countdown.holidayName}
      </h2>
      <p className="text-xl md:text-2xl text-gray-300 mb-8">
        {getDayName(countdown.holidayDate)}, {formatDate(countdown.holidayDate)}
      </p>
      <div className="text-4xl md:text-5xl font-semibold mb-12">
        {countdown.days === 0 ? (
          <span>Libur sudah tiba!</span>
        ) : (
          <span>
            {formattedDays} hari
          </span>
        )}
      </div>
    </div>
  );
}


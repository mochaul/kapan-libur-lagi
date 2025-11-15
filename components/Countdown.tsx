'use client';

import { useState, useEffect } from 'react';
import { Holiday } from '@/types';
import { findNextHoliday } from '@/utils/holidayUtils';

interface CountdownProps {
  holidays: Holiday[];
}

export default function Countdown({ holidays }: CountdownProps) {
  const [countdown, setCountdown] = useState<{
    days: number;
    hours: number;
    holidayName: string;
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
          hours: 0,
          holidayName: nextHoliday.name,
        });
        return;
      }

      // Calculate days and hours only
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      setCountdown({
        days,
        hours,
        holidayName: nextHoliday.name,
      });
    };

    // Initialize
    updateCountdown();

    // Update every minute (since we only show days and hours)
    const interval = setInterval(updateCountdown, 60000);

    return () => clearInterval(interval);
  }, [holidays]);

  if (!countdown) {
    return null;
  }

  const formattedDays = countdown.days.toString().padStart(2, '0');
  const formattedHours = countdown.hours.toString().padStart(2, '0');

  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-gray-100">
        {countdown.holidayName}
      </h2>
      <div className="text-4xl md:text-5xl font-semibold mb-12">
        {countdown.days === 0 && countdown.hours === 0 ? (
          <span>Libur sudah tiba!</span>
        ) : (
          <span>
            {formattedDays} hari, {formattedHours} jam
          </span>
        )}
      </div>
    </div>
  );
}


'use client';

import { useState, useEffect } from 'react';
import { Holiday } from '@/types';
import { findNextHoliday } from '@/utils/holidayUtils';
import { formatDate, getDayName } from '@/utils/dateUtils';
import CountdownSkeleton from './CountdownSkeleton';

interface CountdownProps {
  holidays: Holiday[];
}

export default function Countdown({ holidays }: CountdownProps) {
  const [countdown, setCountdown] = useState<{
    days: number;
    holidayName: string;
    holidayDate: Date;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
        return;
      }

      // Calculate days only
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));

      setCountdown({
        days,
        holidayName: nextHoliday.name,
        holidayDate: holidayDate,
      });
      setIsLoading(false);
    };

    // Initialize with a small delay to show skeleton
    setIsLoading(true);
    const timeout = setTimeout(() => {
      updateCountdown();
    }, 300);

    // Update every hour (since we only show days)
    const interval = setInterval(updateCountdown, 3600000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [holidays]);

  if (isLoading || !countdown) {
    return <CountdownSkeleton />;
  }

  const formattedDays = countdown.days.toString().padStart(2, '0');

  return (
    <div className="text-center animate-in fade-in slide-in-from-bottom-4">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 md:mb-4 text-gray-900 dark:text-gray-100 transition-all duration-300">
        {countdown.holidayName}
      </h2>
      <p className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-6 md:mb-8 transition-all duration-300">
        {getDayName(countdown.holidayDate)}, {formatDate(countdown.holidayDate)}
      </p>
      <div className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 md:mb-12 transition-all duration-500">
        {countdown.days === 0 ? (
          <span className="text-green-600 dark:text-green-400 animate-pulse">Libur sudah tiba! 🎉</span>
        ) : (
          <span className="text-blue-600 dark:text-blue-400 transition-all duration-500">
            {formattedDays} <span className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-400">hari</span>
          </span>
        )}
      </div>
    </div>
  );
}


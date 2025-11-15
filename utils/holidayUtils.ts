import { Holiday, HolidayWithDate } from '@/types';
import { normalizeDate } from './dateUtils';

export function findNextHoliday(holidays: Holiday[]): Holiday {
  const today = normalizeDate(new Date());

  for (const holiday of holidays) {
    const holidayDate = normalizeDate(new Date(holiday.date));

    if (holidayDate > today) {
      return holiday;
    }
  }

  // If no holiday found (all passed), return the first one from next year
  return holidays[0];
}

export function getUpcomingHolidays(holidays: Holiday[]): HolidayWithDate[] {
  const today = normalizeDate(new Date());

  return holidays
    .map((h) => ({
      name: h.name,
      date: normalizeDate(new Date(h.date)),
    }))
    .filter((h) => h.date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}


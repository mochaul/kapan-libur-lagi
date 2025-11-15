import { HolidayWithDate, LeaveSuggestion } from '@/types';
import { isWeekend, calculateConsecutiveDays, normalizeDate } from './dateUtils';

export function findLeaveSuggestions(
  holidays: HolidayWithDate[]
): LeaveSuggestion[] {
  const today = normalizeDate(new Date());
  const suggestions: LeaveSuggestion[] = [];

  if (holidays.length === 0) {
    return suggestions;
  }

  // Group consecutive holidays together
  const holidayGroups: HolidayWithDate[][] = [];
  let currentGroup = [holidays[0]];

  for (let i = 1; i < holidays.length; i++) {
    const daysDiff =
      (holidays[i].date.getTime() -
        currentGroup[currentGroup.length - 1].date.getTime()) /
      (1000 * 60 * 60 * 24);
    // If holidays are within 3 days of each other, group them
    if (daysDiff <= 3) {
      currentGroup.push(holidays[i]);
    } else {
      holidayGroups.push(currentGroup);
      currentGroup = [holidays[i]];
    }
  }
  if (currentGroup.length > 0) {
    holidayGroups.push(currentGroup);
  }

  // Analyze each holiday group for potential leave opportunities
  for (const group of holidayGroups) {
    const firstHoliday = group[0];
    const lastHoliday = group[group.length - 1];
    const groupStart = new Date(firstHoliday.date);
    const groupEnd = new Date(lastHoliday.date);

    // Check days before the first holiday in the group
    const daysBefore: Date[] = [];
    let checkDate = new Date(groupStart);
    checkDate.setDate(checkDate.getDate() - 1);

    // Check up to 3 working days before
    let workingDaysBefore = 0;
    while (workingDaysBefore < 3 && checkDate >= today) {
      if (!isWeekend(checkDate)) {
        daysBefore.push(new Date(checkDate));
        workingDaysBefore++;
      }
      checkDate.setDate(checkDate.getDate() - 1);
    }

    // Check days after the last holiday in the group
    const daysAfter: Date[] = [];
    checkDate = new Date(groupEnd);
    checkDate.setDate(checkDate.getDate() + 1);

    // Check up to 3 working days after
    let workingDaysAfter = 0;
    const nextHolidayDate = holidays.find((h) => {
      const hDate = normalizeDate(h.date);
      return hDate > groupEnd;
    })?.date;

    while (workingDaysAfter < 3) {
      if (nextHolidayDate && checkDate >= nextHolidayDate) break;
      if (!isWeekend(checkDate)) {
        daysAfter.push(new Date(checkDate));
        workingDaysAfter++;
      }
      checkDate.setDate(checkDate.getDate() + 1);
    }

    // Check for working days between holidays in the group
    const daysBetween: Date[] = [];
    for (let i = 0; i < group.length - 1; i++) {
      const start = new Date(group[i].date);
      const end = new Date(group[i + 1].date);
      let betweenDate = new Date(start);
      betweenDate.setDate(betweenDate.getDate() + 1);

      while (betweenDate < end) {
        if (!isWeekend(betweenDate)) {
          daysBetween.push(new Date(betweenDate));
        }
        betweenDate.setDate(betweenDate.getDate() + 1);
      }
    }

    // Calculate total consecutive days if we take leave
    let leaveDays: Date[] = [];
    let startDate = groupStart;
    let endDate = groupEnd;

    if (
      daysBefore.length > 0 ||
      daysAfter.length > 0 ||
      daysBetween.length > 0
    ) {
      // Combine all potential leave days
      leaveDays = [...daysBefore, ...daysBetween, ...daysAfter];

      if (leaveDays.length > 0) {
        if (daysBefore.length > 0) {
          startDate = new Date(daysBefore[0]);
        }
        if (daysAfter.length > 0) {
          endDate = new Date(daysAfter[daysAfter.length - 1]);
        }

        const totalDays = calculateConsecutiveDays(startDate, endDate);

        // Only suggest if taking leave creates at least 4 consecutive days
        if (totalDays >= 4 && leaveDays.length > 0) {
          const holidayNames = group.map((h) => h.name).join(" & ");
          suggestions.push({
            holidayName: holidayNames,
            holidayDate: groupStart,
            leaveDays: leaveDays.sort((a, b) => a.getTime() - b.getTime()),
            startDate: startDate,
            endDate: endDate,
            totalDays: totalDays,
            leaveDaysCount: leaveDays.length,
          });
        }
      }
    }
  }

  // Sort suggestions by total consecutive days (descending)
  return suggestions.sort((a, b) => b.totalDays - a.totalDays);
}


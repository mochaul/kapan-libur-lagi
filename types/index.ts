export interface Holiday {
  name: string;
  date: string;
}

export interface HolidayWithDate extends Omit<Holiday, 'date'> {
  date: Date;
}

export interface LeaveSuggestion {
  holidayName: string;
  holidayDate: Date;
  leaveDays: Date[];
  startDate: Date;
  endDate: Date;
  totalDays: number;
  leaveDaysCount: number;
}


export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("id-ID", options);
}

export function getDayName(date: Date): string {
  const days = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  return days[date.getDay()];
}

export function calculateConsecutiveDays(
  startDate: Date,
  endDate: Date
): number {
  let count = 0;
  const current = new Date(startDate);
  while (current <= endDate) {
    count++;
    current.setDate(current.getDate() + 1);
  }
  return count;
}

export function normalizeDate(date: Date): Date {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}


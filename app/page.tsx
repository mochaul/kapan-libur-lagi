import { fallbackHolidays } from '@/data/holidays';
import Countdown from '@/components/Countdown';
import HolidayList from '@/components/HolidayList';
import LeaveSuggestions from '@/components/LeaveSuggestions';
import { getHolidays } from '@/utils/holidayFetcher';

export default async function Home() {
  const fetchedHolidays = await getHolidays();
  const holidays = fetchedHolidays.length > 0 ? fetchedHolidays : fallbackHolidays;

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 py-8 md:py-12">
      <div className="text-center w-full max-w-6xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 animate-in fade-in slide-in-from-top-4 text-gray-900 dark:text-gray-100">
          Kapan Libur Lagi?
        </h1>
        <Countdown holidays={holidays} />
        <HolidayList holidays={holidays} />
        <LeaveSuggestions holidays={holidays} />
      </div>
    </div>
  );
}


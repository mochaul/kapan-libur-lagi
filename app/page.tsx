import { holidays } from '@/data/holidays';
import Countdown from '@/components/Countdown';
import HolidayList from '@/components/HolidayList';
import LeaveSuggestions from '@/components/LeaveSuggestions';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5 md:p-8">
      <div className="text-center w-full max-w-6xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-8">Kapan Libur?</h1>
        <Countdown holidays={holidays} />
        <HolidayList holidays={holidays} />
        <LeaveSuggestions holidays={holidays} />
      </div>
    </main>
  );
}


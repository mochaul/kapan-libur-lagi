import { Holiday } from "@/types";

const HOLIDAY_API_URL = "https://raw.githubusercontent.com/guangrei/APIHariLibur_V2/main/holidays.json";

interface RawHolidayData {
    [date: string]: {
        summary: string;
    };
}

export async function getHolidays(): Promise<Holiday[]> {
    try {
        const response = await fetch(HOLIDAY_API_URL, {
            next: { revalidate: 86400 }, // Cache for 24 hours
        } as RequestInit);

        if (!response.ok) {
            throw new Error(`Failed to fetch holidays: ${response.statusText}`);
        }

        const data: RawHolidayData = await response.json();

        const holidays: Holiday[] = Object.entries(data).map(([date, info]) => {
            // Filter out "info" key if it exists in the JSON (based on the sample data seen)
            if (date === 'info') return null;

            return {
                date: date,
                name: info.summary,
            };
        }).filter((item): item is Holiday => item !== null);

        // Sort by date
        return holidays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } catch (error) {
        console.error("Error fetching holidays:", error);
        return [];
    }
}

export default function LeaveSuggestionsSkeleton() {
  return (
    <div className="mt-8 md:mt-12 p-6 md:p-8 bg-white dark:bg-gray-800 rounded-xl max-w-4xl mx-auto animate-pulse shadow-sm dark:shadow-none">
      <div className="h-7 md:h-8 w-64 md:w-80 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4 md:mb-6"></div>
      <div className="space-y-3 md:space-y-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-gray-50 dark:bg-gray-900 p-4 md:p-6 rounded-lg border-l-4 border-gray-300 dark:border-gray-700"
          >
            <div className="h-5 md:h-6 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
            <div className="h-4 md:h-5 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}


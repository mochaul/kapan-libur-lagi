export default function CountdownSkeleton() {
  return (
    <div className="text-center animate-pulse">
      <div className="h-8 md:h-10 lg:h-12 w-3/4 md:w-2/3 mx-auto bg-gray-300 dark:bg-gray-700 rounded-lg mb-3 md:mb-4"></div>
      <div className="h-6 md:h-8 lg:h-10 w-1/2 md:w-2/5 mx-auto bg-gray-300 dark:bg-gray-700 rounded-lg mb-6 md:mb-8"></div>
      <div className="h-12 md:h-16 lg:h-20 w-32 md:w-40 mx-auto bg-gray-300 dark:bg-gray-700 rounded-lg mb-8 md:mb-12"></div>
    </div>
  );
}


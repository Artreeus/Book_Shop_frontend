
export function SkeletonLoader() {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg">
      <div className="relative h-[300px] w-full bg-gray-300 animate-pulse" />
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="w-3/4 h-6 bg-gray-300 rounded mb-2 animate-pulse" />
        <div className="w-1/2 h-4 bg-gray-300 rounded animate-pulse" />
        <div className="mt-6 w-24 h-8 bg-gray-300 rounded animate-pulse" />
        <div className="mt-6 w-24 h-8 bg-gray-300 rounded animate-pulse" />
        <div className="mt-6 w-24 h-8 bg-gray-300 rounded animate-pulse" />
      </div>
    </div>
  );
}

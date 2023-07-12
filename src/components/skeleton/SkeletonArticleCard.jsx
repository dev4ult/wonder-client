function SkeletonArticleCard() {
  return (
    <div className="flex gap-3 items-center">
      <div className="animate-pulse bg-gray-300 rounded w-60 h-36"></div>
      <div className="p-5 w-full">
        <div className="mb-2 flex items-center gap-2">
          <div className="animate-pulse bg-gray-300 w-7 h-7 rounded-full"></div>
          <div className="animate-pulse bg-gray-300 w-10 h-2 rounded-full"></div>
        </div>
        <div className="w-full">
          <div className="animate-pulse bg-gray-300 h-4 w-44 rounded-full"></div>
          <div className="animate-pulse bg-gray-300 h-2 w-full rounded-full mt-4"></div>
          <div className="flex gap-2 mt-2">
            <div className="animate-pulse bg-gray-300 h-2 w-1/2 rounded-full"></div>
            <div className="animate-pulse bg-gray-300 h-2 w-10 rounded-full"></div>
          </div>
        </div>
        <div className="flex gap-3 justify-between items-center mt-4">
          <div className="animate-pulse bg-gray-300 w-4 h-4 rounded-full"></div>
          <div className="animate-pulse bg-gray-300 h-2 w-12 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonArticleCard;

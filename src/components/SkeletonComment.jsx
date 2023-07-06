function SkeletonComment() {
  return (
    <div className="flex gap-4 border-r-2 pr-8 w-full">
      <div>
        <div className="animate-pulse bg-gray-300 w-12 h-12 rounded-full max-h-12"></div>
      </div>
      <div className="w-full">
        <div className="flex justify-between gap-3">
          <div className="animate-pulse bg-gray-300 h-2 w-16 rounded-full "></div>
          <div className="animate-pulse bg-gray-300 h-2 w-12 rounded-full "></div>
        </div>
        <div className="mt-3">
          <div className="animate-pulse bg-gray-300 h-3 my-2 rounded-full w-full"></div>
          <div className="animate-pulse bg-gray-300 h-3 my-2 rounded-full w-full"></div>
          <div className="animate-pulse bg-gray-300 h-3 my-2 rounded-full w-3/4"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonComment;

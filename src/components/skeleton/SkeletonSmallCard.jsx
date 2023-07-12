function SkeletonSmallCard() {
  return (
    <div>
      <div className="animate-pulse bg-gray-300 h-2 w-20 rounded-full"></div>
      <div className="animate-pulse bg-gray-300 h-1 w-full rounded-full mt-2"></div>
      <div className="mt-1 flex gap-1 animate-pulse">
        <div className=" bg-gray-300 h-1 w-1/2 rounded-full"></div>
        <div className=" bg-gray-300 h-1 w-5 rounded-full"></div>
      </div>
      <div className="flex gap-2 mt-3 ">
        <div className="flex gap-1 items-center">
          <div className="animate-pulse bg-gray-300 w-3 h-3 rounded-full"></div>
          <div className="animate-pulse bg-gray-300 w-2 h-1 rounded-full"></div>
        </div>
        <div className="flex gap-1 items-center">
          <div className="animate-pulse bg-gray-300 w-3 h-3 rounded-full"></div>
          <div className="animate-pulse bg-gray-300 w-2 h-1 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonSmallCard;

import NoImage from '../images/no-image.webp';

function SkeletonCard() {
  return (
    <div className="w-full">
      <div className="animate-pulse h-52 bg-gray-300 rounded w-full"></div>
      <div className="py-4">
        <div className="animate-pulse rounded-full h-5 w-3/4 bg-gray-300"></div>
        <div className="mt-3">
          <div className="animate-pulse rounded-full h-2 w-full bg-gray-300"></div>
          <div className="flex gap-3 mt-1">
            <div className="animate-pulse rounded-full h-2 w-1/2 mt-2 bg-gray-300"></div>
            <div className="animate-pulse rounded-full h-2 w-10 mt-2 bg-gray-300"></div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-1 mt-5 text-black/30">
          <div className="flex gap-1 items-center  cursor-pointer">
            <div className="animate-pulse bg-gray-300 w-4 h-4 rounded-full"></div>
            <div className="animate-pulse bg-gray-300 w-3 h-2 rounded-full"></div>
          </div>
          <div className="animate-pulse bg-gray-300 w-14 h-2 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;

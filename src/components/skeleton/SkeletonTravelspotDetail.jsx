function SkeletonTravelspotDetail() {
  const Label = () => {
    return <div className="bg-gray-300 my-1 rounded-full h-3 w-16"></div>;
  };

  const Value = (height = 'h-4', width = 'w-52') => {
    return <div className={`bg-gray-300 my-2 rounded-full ${height} ${width}`}></div>;
  };

  const DivDefaultData = (index) => {
    return (
      <div key={index}>
        {Label()}
        {Value()}
      </div>
    );
  };

  const Datas = () => {
    let list = [];
    for (let i = 0; i < 3; i++) {
      list.push(DivDefaultData(i));
    }
    return <>{list}</>;
  };

  return (
    <div className="animate-pulse">
      <div className="flex gap-3 justify-between">
        <div className="flex gap-3 items-center">
          <div>
            {Value('h-5', 'w-52')}
            {Value('h-5', 'w-36')}
          </div>
        </div>
        <div className="bg-gray-300 w-8 h-8 rounded-full"></div>
      </div>
      <hr className="my-3" />
      <div className="grid grid-flow-row grid-cols-2 gap-2">{Datas()}</div>
      <hr className="my-3" />
      <div>
        {Label()}
        <div className="flex gap-3 mt-2">
          <div className="bg-gray-300 rounded w-44 h-28"></div>
          <div className="bg-gray-300 rounded w-44 h-28"></div>
          <div className="bg-gray-300 rounded w-44 h-28"></div>
        </div>
      </div>
      <hr className="my-3" />
      <div className="modal-action justify-between">
        {Value('h-7', 'w-20')}
        <div className="flex gap-2">
          {Value('h-7', 'w-14')}
          {Value('h-7', 'w-14')}
        </div>
      </div>
    </div>
  );
}

export default SkeletonTravelspotDetail;

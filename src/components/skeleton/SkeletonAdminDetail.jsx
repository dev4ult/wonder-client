function SkeletonAdminDetail() {
  const Label = () => {
    return <div className="bg-gray-300 my-1 rounded-full h-3 w-16"></div>;
  };

  const Value = (height = 'h-4', width = 'w-52') => {
    return <div className={`bg-gray-300 my-2 rounded-full ${height} ${width}`}></div>;
  };

  const DivDefaultData = () => {
    return (
      <div>
        {Label()}
        {Value()}
      </div>
    );
  };

  const Datas = () => {
    let list = [];
    for (let i = 0; i < 6; i++) {
      list.push(<DivDefaultData key={i} />);
    }
    return <>{list}</>;
  };

  return (
    <div className="animate-pulse">
      <div className="flex gap-3 justify-between">
        <div className="flex gap-3 items-center">
          <div className="bg-gray-300 w-14 h-14 rounded"></div>
          <div>
            {Value('h-5', 'w-20')}
            {Value('h-4', 'w-14')}
          </div>
        </div>
        <div className="bg-gray-300 w-8 h-8 rounded-full"></div>
      </div>
      <hr className="my-3" />
      <div className="grid grid-flow-row grid-cols-2 gap-2">{Datas()}</div>
      <hr className="my-3" />
      <div className="modal-action">
        {Value('h-8', 'w-14')}
        {Value('h-8', 'w-14')}
      </div>
    </div>
  );
}

export default SkeletonAdminDetail;

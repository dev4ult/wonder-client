function SkeletonTableData() {
  return (
    <tr className="animate-pulse">
      <td>
        <div className="bg-gray-300 h-4 w-4 rounded-full"></div>
      </td>
      <td>
        <div className="flex items-center space-x-3">
          <div className="bg-gray-300 rounded w-14 h-14"></div>
          <div>
            <div className="bg-gray-300 h-4 rounded-full w-20"></div>
            <div className="bg-gray-300 h-3 mt-2 rounded-full w-16"></div>
          </div>
        </div>
      </td>
      <td>
        <div className="bg-gray-300 h-4 rounded-full w-20"></div>
      </td>
      <td>
        <div className="bg-gray-300 h-4 rounded-full w-10"></div>
      </td>
      <th>
        <div className="bg-gray-300 h-5 rounded w-14"></div>
      </th>
    </tr>
  );
}

export default SkeletonTableData;

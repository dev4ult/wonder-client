import { BsPersonFill } from 'react-icons/bs';

function Comment({
  profileImage = (
    <div className="bg-gray-300 overflow-hidden w-fit h-fit flex-grow-0 rounded-full flex-shrink flex items-center justify-center px-3 py-2">
      <BsPersonFill size="2.2rem" />
    </div>
  ),
  username,
  date,
  comment,
}) {
  return (
    <div className="flex gap-4 border-r-2 pr-8">
      {profileImage}
      <div>
        <div className="flex justify-between gap-3">
          <h3 className="font-semibold text-lg">{username}</h3>
          <span className="text-gray-300">{date}</span>
        </div>
        <p>{comment}</p>
      </div>
    </div>
  );
}

export default Comment;

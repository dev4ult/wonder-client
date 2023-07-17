import { BsPersonFill } from 'react-icons/bs';

const DefaultProfile = () => {
  return (
    <div className="bg-gray-300 p-2 h-fit rounded-full">
      <BsPersonFill size="1.7rem" />
    </div>
  );
};

function Comment({ profileImage = <DefaultProfile />, username, date, comment }) {
  return (
    <div className="flex gap-4 border-r-2 pr-8 ">
      {profileImage != '' ? profileImage : <DefaultProfile />}
      <div className="w-full">
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

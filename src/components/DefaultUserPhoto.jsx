import { BsFillPersonFill } from 'react-icons/bs';

function DefaultUserPhoto({ size }) {
  return (
    <div className="rounded-full p-1 bg-black/30 w-fit">
      <BsFillPersonFill size={size} />
    </div>
  );
}

export default DefaultUserPhoto;

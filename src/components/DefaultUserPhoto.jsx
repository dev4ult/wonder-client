import { BsFillPersonFill } from 'react-icons/bs';

function DefaultUserPhoto({ size, className, isRoundedFull = true }) {
  return (
    <div className={`${className} ${isRoundedFull ? 'rounded-full' : ''} p-1 bg-black/30 w-fit`}>
      <BsFillPersonFill size={size} />
    </div>
  );
}

export default DefaultUserPhoto;

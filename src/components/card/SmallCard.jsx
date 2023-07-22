import { Link } from 'react-router-dom';

import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from 'react-icons/ai';

function SmallCard({ title, date, totalLike, liked = false, totalComment, description, to }) {
  return (
    <Link to={to}>
      <h3 className="font-bold text-base">{title}</h3>
      <p className="text-xs">{description}</p>
      <div className="flex gap-2 mt-2 text-black/50">
        <div className="flex gap-1 items-center">
          {liked ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart />}
          <span className="text-xs">{totalLike}</span>
        </div>
        <div className="flex gap-1 items-center">
          <AiOutlineComment />
          <span className="text-xs">{totalComment}</span>
        </div>
      </div>
    </Link>
  );
}

export default SmallCard;

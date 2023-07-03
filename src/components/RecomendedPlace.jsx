import { Link } from 'react-router-dom';

import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';

function RecomendedPlace({ title, date, description, linkTo }) {
  return (
    <Link to={linkTo}>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-xs">{description}</p>
      <div className="flex gap-2 mt-1 text-black/30">
        <div className="flex gap-1 items-center hover:text-black">
          <AiOutlineHeart />
          <span className="text-xs">17k</span>
        </div>
        <div className="flex gap-1 items-center hover:text-black">
          <AiOutlineComment />
          <span className="text-xs">17k</span>
        </div>
      </div>
    </Link>
  );
}

export default RecomendedPlace;

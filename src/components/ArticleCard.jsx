import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';

import DefaultUserPhoto from './DefaultUserPhoto';

import NoImage from '../images/no-image.webp';

function ArticleCard({ author, title, description, linkTo }) {
  return (
    <div className="flex gap-3 items-center">
      <Link to={linkTo}>
        <img src={NoImage} alt="no" className="max-h-36" />
      </Link>
      <div className="p-5">
        <div className="mb-1 flex items-center gap-2">
          <DefaultUserPhoto size="0.8rem" />
          <span className="font-semibold text-sm font-archivo">{author}</span>
        </div>
        <Link to={linkTo} className="w-full hover:text-blue-700">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm max-w-sm">{description}</p>
        </Link>
        <div className="flex gap-3 justify-between text-black/30 items-center mt-2">
          <AiOutlineHeart size="1.2rem" className="hover:text-black cursor-pointer" />
          <span className="font-medium text-black/30 text-xs">26 Jan 2023</span>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;

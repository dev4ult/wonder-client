import { Link } from 'react-router-dom';

import LikeIcon from '../icons/like.svg';
import CommentIcon from '../icons/comment.svg';
import NoImage from '../images/no-image.jpg';

function Card({ src = NoImage, name, description }) {
  return (
    <Link className="border-2 flex-1 min-w-[15rem] hover:shadow-md" to={'/discover_detail'}>
      <img src={src} alt="Objek Wisata" className="h-44 w-full object-cover" />
      <div className="p-4">
        <div className="flex justify-end items-center gap-1 ">
          <img src={LikeIcon} className="w-6" alt="like" />
          <img src={CommentIcon} className="w-7" alt="comment" />
        </div>
        <h2 className="text-lg font-medium">{name}</h2>
        <h3 className="text-sm">{description}</h3>
      </div>
    </Link>
  );
}

export default Card;

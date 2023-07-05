import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import NoImage from '../../images/no-image.webp';

function Card({ title, description, src = NoImage, likes = 0, linkTo = '/' }) {
  return (
    <div>
      <Link to={linkTo}>
        <img src={src} alt="Objek Wisata" className="h-52 w-full object-cover" />
      </Link>
      <div className="py-4">
        <Link to={linkTo} className="group">
          <h2 className="text-xl font-bold group-hover:text-blue-700">{title}</h2>
          <h3 className="text-sm group-hover:text-blue-700">{description} Read more...</h3>
        </Link>
        <div className="flex justify-between items-center gap-1 mt-3 text-black/30">
          <div className="flex gap-1 items-center hover:text-black cursor-pointer">
            <AiOutlineHeart title="Like" size="1.5rem" />
            <span className="text-sm">{likes}</span>
          </div>
          <span className="text-sm font-medium">26 Jan 2023</span>
        </div>
      </div>
    </div>
  );
}

export default Card;

import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import NoImage from '../images/no-image.webp';

function Card({ name, description, src = NoImage, displayImage = true, linkTo = '/' }) {
  return (
    <div>
      {displayImage ? (
        <Link to={linkTo}>
          <img src={src} alt="Objek Wisata" className="h-52 w-full object-cover" />
        </Link>
      ) : (
        <></>
      )}
      <div className="p-4">
        <div className="flex justify-end items-center gap-1 ">
          <AiOutlineHeart title="Like" className="text-black/50 cursor-pointer hover:text-black" size="1.7rem" />
        </div>
        <Link to={linkTo} className="group">
          <h2 className="text-xl font-bold group-hover:text-blue-700">{name}</h2>
          <h3 className="text-sm group-hover:text-blue-700">{description} Read more...</h3>
        </Link>
      </div>
    </div>
  );
}

export default Card;

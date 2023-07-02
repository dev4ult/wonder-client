import { Link } from 'react-router-dom';

import NoImage from '../images/no-image.jpg';

import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';

function CardWidthFull({ title, description, linkTo }) {
  return (
    <div className="w-full pr-5 flex gap-5 border-r-2 hover:shadow">
      <img src={NoImage} alt="no" className="max-h-72" />
      <div className="relative py-5">
        <Link to={linkTo} className="w-full  hover:text-blue-700">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-lg">{description}</p>
        </Link>
        <div className="absolute bottom-5 right-5 flex gap-3 text-black/50">
          <AiOutlineHeart size="2rem" className="hover:text-black cursor-pointer" />
          <AiOutlineComment size="2rem" className="hover:text-black cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default CardWidthFull;

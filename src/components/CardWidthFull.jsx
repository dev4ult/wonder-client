import { Link } from 'react-router-dom';

import NoImage from '../images/no-image.jpg';

import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';

function CardWidthFull({ title, description, linkTo }) {
  return (
    <div className="w-full pr-5 flex gap-5 border-2 hover:shadow">
      <img src={NoImage} alt="no" className="max-h-72" />
      <div className="relative py-5">
        <Link to={linkTo} className="w-full  hover:text-blue-700">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-lg">{description}</p>
        </Link>
        <div className="absolute bottom-5 left-0 flex gap-3 justify-between text-black/50 items-center w-full">
          <div className="flex gap-3">
            <AiOutlineHeart size="2rem" className="hover:text-black cursor-pointer" />
            <Link to={linkTo + '#comment-section'}>
              <AiOutlineComment size="2rem" className="hover:text-black cursor-pointer" />
            </Link>
          </div>
          <span className="font-medium text-lg text-black/30">26 Jan 2023</span>
        </div>
      </div>
    </div>
  );
}

export default CardWidthFull;

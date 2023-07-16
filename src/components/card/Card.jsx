import { AiOutlineHeart } from 'react-icons/ai';
import NoImage from '../../images/no-image.webp';

function Card({ title, description, src = NoImage, likes = 0, onClick }) {
  return (
    <div>
      <div onClick={onClick} className="cursor-pointer">
        <img src={src == '' ? NoImage : src} alt="Objek Wisata" className="h-52 w-full object-cover" />
      </div>
      <div className="py-4">
        <div onClick={onClick} className="group cursor-pointer">
          <h2 className="text-xl font-bold group-hover:text-blue-700">{title}</h2>
          <h3 className="text-sm group-hover:text-blue-700">{description}. Read more...</h3>
        </div>
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

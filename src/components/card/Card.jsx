import NoImage from '../../images/no-image.webp';

import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from 'react-icons/ai';

function Card({ title, description, src = NoImage, onClick, totalLike, totalComment, type, region, province, liked = false }) {
  return (
    <div>
      <div onClick={onClick} className="cursor-pointer">
        <img src={src == '' ? NoImage : src} alt="Objek Wisata" className="h-52 w-full object-cover" />
      </div>
      <div className="py-4 flex flex-col gap-2 ">
        <div onClick={onClick} className="group cursor-pointer">
          <h2 className="text-xl font-bold group-hover:text-blue-700">{title}</h2>
          <h3 className="text-sm group-hover:text-blue-700">{description}. Lebih lagi...</h3>
        </div>
        <div className="flex justify-between items-center gap-1 mt-3 self-s">
          <div className="flex items-center gap-2 text-black/50">
            <div className="flex gap-1 items-center">
              {liked ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart />}
              <span className="text-sm">{totalLike}</span>
            </div>
            <div className="flex gap-1 items-center">
              <AiOutlineComment />
              <span className="text-sm">{totalComment}</span>
            </div>
          </div>
          <p className="text-sm text-black/50 uppercase">{type == 'nasional' ? province : region}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;

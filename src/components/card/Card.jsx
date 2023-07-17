import NoImage from '../../images/no-image.webp';

function Card({ title, description, src = NoImage, action, onClick }) {
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
        <div className="flex justify-between items-center gap-1 mt-3 self-s">{action}</div>
      </div>
    </div>
  );
}

export default Card;

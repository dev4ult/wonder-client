import { Link } from 'react-router-dom';

import MissingImage from '../images/no-image.jpg';

function Card(props) {
  const { src = MissingImage, name, description } = props;
  return (
    <Link className="border-2 flex-1 min-w-[15rem]" to={'/discover_detail'}>
      <img src={src} alt="Objek Wisata" className="h-44 w-full object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-medium">{name}</h2>
        <h3 className="text-sm">{description}</h3>
      </div>
    </Link>
  );
}

export default Card;

import { Link } from 'react-router-dom';

function FeatureBox({ title, description, linkTo, onClick = () => {} }) {
  return (
    <Link to={linkTo} onClick={onClick} className="p-6 border-2 rounded hover:shadow">
      <h2 className="font-semibold text-lg">{title}</h2>
      <p className="text-sm">{description}</p>
    </Link>
  );
}

export default FeatureBox;

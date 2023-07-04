import { Link } from 'react-router-dom';

function FeatureBox({ title, description, linkTo }) {
  return (
    <Link to={linkTo} className="p-6 border-2 rounded hover:shadow">
      <h2 className="font-semibold text-lg">{title}</h2>
      <p className="text-sm">{description}</p>
    </Link>
  );
}

export default FeatureBox;

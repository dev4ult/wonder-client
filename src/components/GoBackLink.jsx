import { Link } from 'react-router-dom';

import { BsArrowLeft } from 'react-icons/bs';

function GoBackLink({ to }) {
  return (
    <Link to={to} className="btn btn-sm btn-outline rounded-full">
      <BsArrowLeft size="1.3rem" />
    </Link>
  );
}

export default GoBackLink;

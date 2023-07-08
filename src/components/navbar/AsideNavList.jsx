import { Link } from 'react-router-dom';

function AsideNavList({ name, linkTo, children, isOpen = false }) {
  return (
    <Link to={linkTo} className={`${isOpen ? '' : 'absolute top-0'} p-3 hover:bg-black/10 cursor-pointer flex gap-2 tooltip tooltip-left bg-white`} data-tip={name}>
      {children}
    </Link>
  );
}

export default AsideNavList;

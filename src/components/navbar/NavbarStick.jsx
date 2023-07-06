import { Link } from 'react-router-dom';

import { CiSearch } from 'react-icons/ci';
import { BsPersonCircle } from 'react-icons/bs';

function NavbarStick() {
  return (
    <div className="border-y-2 sticky top-0 z-10 bg-white flex gap-8 justify-between w-full py-4">
      <div className="flex gap-8 items-center">
        <Link to={'/'} className="text-lg font-bold uppercase relative font-spacemono">
          Discover
          <div className="w-3 h-3 rounded-full absolute top-0 -right-4 bg-accent"></div>
        </Link>
        <div className="relative">
          <input type="text" placeholder="Cari Wisata..." className="input input-sm border-gray-300 rounded-full peer" />
          <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-black/30 peer-focus:text-black" size="1.3rem" />
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <Link to="/travelspots" className="font-medium text-black/30 hover:text-black">
          Wisata
        </Link>
        <Link to="/articles" className="font-medium text-black/30 hover:text-black">
          Artikel
        </Link>
        <Link to="/auth" className="btn btn-sm btn-accent rounded-full capitalize">
          login
        </Link>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="cursor-pointer">
            <BsPersonCircle className="text-black/30" size="1.8rem" />
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-44 mt-4">
            <li className="">
              <Link to={'/profile'}>Profile</Link>
            </li>
            <li className="bg-red-500 rounded-lg">
              <a className="font-semibold text-white hover:text-white">Logout</a>
            </li>
            <li className="bg-green-500 rounded-lg">
              <Link className="font-semibold text-white hover:text-white" to="/auth">
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavbarStick;

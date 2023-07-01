import { Link } from 'react-router-dom';

import DefaultProfileImg from '../icons/person.svg';

function Navbar() {
  return (
    <div className="flex justify-between my-7 gap-7 items-center ">
      <Link to={'/'} className="text-lg font-bold uppercase relative font-spacemono">
        Discover
        <div className="w-3 h-3 rounded-full absolute top-0 -right-4 bg-accent"></div>
      </Link>
      <div className="flex gap-7 items-center text-lg font-medium">
        <Link to={'/discover'} className="hover:underline">
          Wisata
        </Link>
        <Link to={'/article'} className="hover:underline">
          Artikel
        </Link>
        <div className="join">
          <div>
            <input type="text" placeholder="Cari Wisata..." className="input border-gray-300 rounded-l-full" />
          </div>
          <div className="indicator">
            <button className="btn btn-square rounded-r-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="p-2 px-4 bg-slate-100 flex items-center gap-3 cursor-pointer shadow-sm rounded-full">
            <span className="text-sm font-medium">Guest</span>
            <div className="w-7 h-7 flex items-center justify-center bg-white rounded-full overflow-hidden">
              <img src={DefaultProfileImg} alt="profile" className="w-8 h-8" />
            </div>
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-44">
            <li className="">
              <Link to={'/profile'}>Profile</Link>
            </li>
            <li className="bg-red-500 rounded-lg">
              <a className="font-semibold text-white hover:text-white">Logout</a>
            </li>
            <li className="bg-green-500 rounded-lg">
              <Link className="font-semibold text-white hover:text-white" to="/auth">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

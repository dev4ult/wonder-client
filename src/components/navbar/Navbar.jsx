import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, reset } from '../../features/auth/authSlice';

import { useNavigate, useLocation } from 'react-router-dom';

import { BiLogIn } from 'react-icons/bi';

import DefaultUserPhoto from '../DefaultUserPhoto';
import SearchInput from '../SearchInput';

const UserPhotoUrl = import.meta.env.USERPHOTOURL;

function Navbar({ displaySearch = true }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  function onLogout() {
    dispatch(logout());

    dispatch(reset());

    navigate('/travelspots');
  }

  return (
    <div className="flex justify-between py-7 border-b-2 gap-7 items-center ">
      <Link to="/" className="text-lg font-bold uppercase relative font-spacemono">
        Discover
        <div className="w-3 h-3 rounded-full absolute top-0 -right-4 bg-accent"></div>
      </Link>
      <div className="flex gap-7 items-center text-lg font-medium">
        <Link to="/travelspots" className={location.pathname != '/travelspots' ? 'text-black/30 hover:text-black' : undefined}>
          Wisata
        </Link>
        <Link to="/articles" className={location.pathname != '/articles' ? 'text-black/30 hover:text-black' : undefined}>
          Artikel
        </Link>
        {displaySearch && <SearchInput placeholder="Cari Wisata..." />}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="p-2 px-4 bg-black/10 hover:bg-black/20 flex items-center gap-3 cursor-pointer rounded-full">
            <span className="text-sm font-medium ">{user != null ? user.w_username : 'Guest'}</span>
            {user != null && user.w_foto != null ? <img src={`${UserPhotoUrl}/${user.w_foto}`} alt="" /> : <DefaultUserPhoto />}
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-44 mt-2">
            {user != null ? (
              <>
                <li className="">
                  <Link to={'/profile'}>Profile</Link>
                </li>
                <li className="bg-red-500 rounded-lg">
                  <button type="button" onClick={onLogout} className="font-semibold text-white hover:text-white">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link className="flex gap-1 items-center justify-between" to="/auth">
                  <span>Login</span>
                  <BiLogIn size="1.3rem" />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

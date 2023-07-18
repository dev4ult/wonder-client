import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { useLocation, Link, useNavigate } from 'react-router-dom';

import DefaultUserPhoto from '../DefaultUserPhoto';
import SearchInput from '../SearchInput';

const UserPhotoUrl = import.meta.env.VITE_USERPHOTOURL;

function NavbarStick({ displaySearch = true }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [searchKey, setSearchKey] = useState('');

  function onInputChange(e) {
    const { value } = e.target;

    setSearchKey(value);
  }

  function handleLogout() {
    dispatch(logout());

    dispatch(reset());

    navigate('/travelspots');
  }

  return (
    <div className="border-y-2 sticky top-0 z-10 bg-white flex gap-8 justify-between w-full py-4">
      <div className="flex gap-8 items-center">
        <Link to={'/'} className="text-lg font-bold uppercase relative font-spacemono">
          Discover
          <div className="w-3 h-3 rounded-full absolute top-0 -right-4 bg-accent"></div>
        </Link>
        {displaySearch && (
          <SearchInput
            placeholder="Cari Wisata..."
            size="sm"
            onChange={onInputChange}
            value={searchKey}
            onClick={() => {
              navigate(`/travelspots/${searchKey}`);
            }}
            onKeyDown={(e) => {
              if (e.key == 'Enter') {
                navigate(`/travelspots/${searchKey}`);
              }
            }}
          />
        )}
      </div>
      <div className="flex gap-5 items-center">
        <Link to="/travelspots" className="font-medium text-black/30 hover:text-black">
          Wisata
        </Link>
        {/* <Link to="/articles" className="font-medium text-black/30 hover:text-black">
          Artikel
        </Link> */}
        {user != null ? (
          location.pathname != '/profile' && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="cursor-pointer">
                {user.w_foto != null ? <img src={`${UserPhotoUrl}/${user.w_foto}`} alt="profil" className="rounded-full w-8 h-8 bg-cover" /> : <DefaultUserPhoto size="1.4rem" />}
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-44 mt-4">
                <li className="">
                  <Link to={'/profile'}>Profile</Link>
                </li>
                <li className="bg-red-500 rounded-lg">
                  <button type="button" onClick={handleLogout} className="font-semibold text-white hover:text-white">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )
        ) : (
          <Link to="/auth" className="btn btn-sm btn-accent rounded-full capitalize">
            login
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavbarStick;

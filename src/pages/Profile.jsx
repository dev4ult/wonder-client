import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { toast } from 'react-toastify';

import { getTravelSpots, resetSpots } from '../features/travelspot/travelSpotSlice';
import { setUserDetail, logout, reset } from '../features/auth/authSlice';
import { updateProfile, reset as resetUpdateStatus } from '../features/user/userSlice';

import NavbarStick from '../components/navbar/NavbarStick';
import InputGroup from '../components/InputGroup';
import HistoryBox from '../components/HistoryBox';
import DefaultUserPhoto from '../components/DefaultUserPhoto';

import { AiFillHeart, AiFillSetting } from 'react-icons/ai';

import SmallCard from '../components/card/SmallCard';
import SkeletonSmallCard from '../components/skeleton/SkeletonSmallCard';
import NoImage from '../images/no-image.webp';

const UserPhotoUrl = import.meta.env.VITE_USERPHOTOURL;
const PostPictureUrl = import.meta.env.VITE_POSTPICTUREURL;

function Profile() {
  const { user, isSuccessfull } = useSelector((state) => state.auth);
  const { message, isSuccessfull: userUpdateSuccess, isError, errorMessages } = useSelector((state) => state.user);
  const { travelSpots, isSuccessfull: getTravelspotSuccess } = useSelector((state) => state.travelspot);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    photo: null,
    username: '',
    email: '',
    bio: '',
    role: '',
    new_password: '',
    old_password: '',
  });

  const [travelSpotsData, setTravelSpotsData] = useState(travelSpots);
  const [successLoad, setSuccessLoad] = useState(false);

  function onTextChange(e) {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function onLogout() {
    dispatch(logout());

    dispatch(reset());

    navigate('/travelspots');
  }

  function handleSubmit(e) {
    e.preventDefault();

    const profile_detail = profile;
    const user_id = user.w_user_id;
    const token_id = user.w_token_id;

    dispatch(updateProfile({ profile_detail, user_id, token_id }));

    dispatch(resetUpdateStatus());
  }

  function onUploadPhoto(e) {
    setProfile((prev) => ({
      ...prev,
      photo: e.target.files[0],
    }));
  }

  const SkeletonCards = () => {
    const list = [];

    for (let i = 0; i < 9; i++) {
      list.push(
        <div key={i} className="p-3 border-2 rounded h-fit">
          <div className="w-full h-32 mb-2 rounded bg-gray-300 animate-pulse"></div>
          <SkeletonSmallCard />
        </div>
      );
    }

    return <>{list}</>;
  };

  const LikedTravelSpots = () => {
    return travelSpotsData.length != 0 ? (
      travelSpotsData.map((travelspot, index) => {
        const { id, nama, deskripsi, like, komen, foto } = travelspot.objek_wisata;
        return (
          <div key={index} className="p-3 border-2 rounded hover:shadow">
            <Link to={`/travelspot_detail/${id}`}>
              <img src={foto[0] != '' ? `${PostPictureUrl}/${foto[0]}` : NoImage} alt="gambar" className="h-32 w-full bg-cover mb-1 rounded" />
            </Link>
            <SmallCard title={nama} description={deskripsi} liked={true} to={`/travelspot_detail/${id}`} totalLike={like} totalComment={komen} />
          </div>
        );
      })
    ) : (
      <h1 className="text-lg col-span-3">
        Belum ada <span className="font-bold">Wisata</span> yang disukai
      </h1>
    );
  };

  useEffect(() => {
    if (userUpdateSuccess && message != '') {
      toast.success(message);

      const { w_token_id: token_id, w_user_id: user_id } = user;
      dispatch(setUserDetail({ token_id, user_id }));
    }
  }, [userUpdateSuccess, message]);

  useEffect(() => {
    if (isError && errorMessages.length != 0) {
      errorMessages.forEach((message) => {
        toast.error(message);
      });
    }
  }, [isError, errorMessages]);

  useEffect(() => {
    if (user != null && isSuccessfull) {
      setProfile({
        photo: user.w_foto != null ? `${UserPhotoUrl}/${user.w_foto}` : null,
        username: user.w_username,
        email: user.email,
        role: user.role,
        bio: user.bio != null ? user.bio : '',
        new_password: '',
        old_password: '',
      });

      dispatch(getTravelSpots(user.w_token_id));
    }
  }, [user, isSuccessfull]);

  useEffect(() => {
    if (travelSpots.length != 0 && getTravelspotSuccess) {
      const liked = [];
      travelSpots.map((travelspot) => {
        const { is_like_user } = travelspot.objek_wisata;

        if (is_like_user) {
          liked.push(travelspot);
        }
      });

      setTravelSpotsData(liked);

      setSuccessLoad(true);

      dispatch(resetSpots());
    }
  }, [travelSpots, getTravelspotSuccess]);

  const { username, email, bio, new_password, old_password, photo } = profile;

  return (
    <div>
      <NavbarStick />
      <div className="mt-7 flex gap-8 border-2 py-7">
        <form onSubmit={handleSubmit} className="flex px-8 flex-col gap-5 border-r-2">
          <div className="flex items-center gap-2 justify-between">
            <h2 className="font-semibold text-lg">Profil User</h2>
            <button type="button" onClick={onLogout} className="btn btn-sm btn-error rounded-full capitalize">
              logout
            </button>
          </div>
          <div className="grid grid-flow-row grid-cols-2 gap-5">
            <div className="form-control col-span-2 ">
              <div>
                <label htmlFor="photo" className="label-text text-black/30">
                  Foto
                </label>
                <div className="relative w-fit">
                  {photo != null ? (
                    <img src={typeof photo == 'string' ? photo : URL.createObjectURL(photo)} alt="profil" className="w-[5.5rem] h-[5.5rem] rounded bg-cover" />
                  ) : (
                    <DefaultUserPhoto size="5rem" className="rounded-md" isRoundedFull={false} />
                  )}
                  <div className="tooltip absolute -top-2 -right-2 text-neutral" data-tip="Upload Foto">
                    <label htmlFor="photo" className="cursor-pointer">
                      <AiFillSetting size="1.5rem" className="p-1 bg-accent text-white rounded-full" />
                    </label>
                  </div>
                  <input type="file" accept=".png, .jpg" name="photo" id="photo" onChange={onUploadPhoto} className="hidden" />
                </div>
              </div>
            </div>
            <InputGroup label="Username" name="username" onChange={onTextChange} value={username} placeholder="usernammu" required />
            <InputGroup label="Password Baru" name="new_password" onChange={onTextChange} value={new_password} placeholder="passwordBaru323" />
            <InputGroup label="Email" name="email" onChange={onTextChange} type="email" value={email} placeholder="emailmu@example.com" required />
            <InputGroup label="Konfirmasi Password Lama" name="old_password" onChange={onTextChange} type="password" value={old_password} placeholder="passwordLama342" />
            <InputGroup label="Bio" name="bio" onChange={onTextChange} value={bio} isTextArea={true} placeholder="Petualang ..." />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary btn-outline px-5 btn-sm capitalize rounded-full w-fit">
              simpan perubahan
            </button>
          </div>
        </form>
        <div className="flex flex-col gap-3 pr-8">
          <h2 className="font-semibold text-lg">Histori User</h2>
          <HistoryBox title="Disukai" id="liked" description="Lorem ipsum dolor sit amet consectetur" icon={<AiFillHeart size="1.2rem" className="text-red-500" />} amount={travelSpotsData.length}>
            <h3 className="badge badge-neutral mb-2">Disukai</h3>
            <div className="grid grid-flow-row grid-cols-3 gap-3">{successLoad != 0 ? LikedTravelSpots() : SkeletonCards()}</div>
          </HistoryBox>
        </div>
      </div>
    </div>
  );
}

export default Profile;

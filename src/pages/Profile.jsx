import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { logout, reset } from '../features/auth/authSlice';
import { updateProfile } from '../features/user/userSlice';

import NavbarStick from '../components/navbar/NavbarStick';
import InputGroup from '../components/InputGroup';
import HistoryBox from '../components/HistoryBox';
import DefaultUserPhoto from '../components/DefaultUserPhoto';

import SmallCard from '../components/card/SmallCard';

import { AiFillHeart, AiFillSetting } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { MdArticle } from 'react-icons/md';

const UserPhotoUrl = import.meta.env.VITE_USERPHOTOURL;

function Profile() {
  const { user, isSuccessfull } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [profile, setProfile] = useState({
    photo: null,
    username: '',
    email: '',
    bio: '',
    new_password: '',
    old_password: '',
  });

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

    console.log(profile);
  }

  useEffect(() => {
    if (user != null && isSuccessfull) {
      setProfile({
        photo: `${UserPhotoUrl}/${user.w_foto}`,
        username: user.w_username,
        email: user.email,
        bio: user.bio != null ? user.bio : '',
        new_password: '',
        old_password: '',
      });
    }
  }, [user, isSuccessfull]);

  function onUploadPhoto(file) {
    setProfile((prev) => ({
      ...prev,
      photo: URL.createObjectURL(file),
    }));
  }

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
                <label htmlFor="" className="label-text text-black/30">
                  Foto
                </label>
                <div className="relative w-fit">
                  {photo != null ? <img src={photo} alt="profil" className="w-[5.5rem] h-[5.5rem] rounded bg-cover" /> : <DefaultUserPhoto size="5rem" className="rounded-md" isRoundedFull={false} />}
                  {console.log(photo)}

                  <div className="tooltip absolute -top-2 -right-2 text-neutral" data-tip="Upload Foto">
                    <label htmlFor="profile-photo" className="cursor-pointer">
                      <AiFillSetting size="1.5rem" />
                    </label>
                  </div>
                  <input type="file" name="photo" id="photo" onChange={onUploadPhoto} className="hidden" />
                </div>
              </div>
            </div>
            <InputGroup label="Username" name="username" onChange={onTextChange} value={username} placeholder="usernammu" required />
            <InputGroup label="Password Baru" name="new_password" onChange={onTextChange} type="password" value={new_password} placeholder="passwordBaru323" />
            <InputGroup label="Email" name="email" onChange={onTextChange} type="email" value={email} placeholder="emailmu@example.com" required />
            <InputGroup label="Konfirmasi Password Lama" name="old_password" onChange={onTextChange} type="password" value={old_password} placeholder="passwordLama342" />
            <InputGroup label="Bio" name="bio" onChange={onTextChange} value={bio} isTextArea={true} placeholder="Petualang ..." />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary btn-outline px-5 btn-sm capitalize rounded-full w-fit">
              simpan
            </button>
          </div>
        </form>
        <div className="flex flex-col gap-3 pr-8">
          <h2 className="font-semibold text-lg">Histori User</h2>
          <HistoryBox title="Disukai" id="liked" description="Lorem ipsum dolor sit amet consectetur" icon={<AiFillHeart size="1.2rem" className="text-red-500" />} amount="10">
            <h3 className="text-sm font-medium text-black/30">Objek Wisata</h3>
            <div className="flex gap-5">
              <div className="max-w-[15rem]">
                <SmallCard title="Pulau Melinjo" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, nostrum." />
              </div>
              <div className="max-w-[15rem]">
                <SmallCard title="Pulau Melinjo" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, nostrum." />
              </div>
              <div className="max-w-[15rem]">
                <SmallCard title="Pulau Melinjo" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, nostrum." />
              </div>
            </div>
          </HistoryBox>
          <HistoryBox title="Komentar" id="comments" description="Lorem ipsum dolor sit amet consectetur" icon={<FaComment size="1.1rem" className="text-blue-600" />} amount="10" />
          <HistoryBox title="Artikel Anda" id="articles" description="Lorem ipsum dolor sit amet consectetur" icon={<MdArticle size="1.2rem" className="text-accent" />} amount="10" />
        </div>
      </div>
    </div>
  );
}

export default Profile;

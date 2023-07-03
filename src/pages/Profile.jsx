import Navbar from '../components/Navbar';
import InputUserProfile from '../components/InputUserProfile';
import ProfileHistory from '../components/ProfileHistory';

import { AiFillHeart } from 'react-icons/ai';

function Profile() {
  return (
    <div>
      <Navbar />
      <div className="mt-7 flex gap-8">
        <div className="flex pr-8 flex-col gap-5 w-80 border-r-2">
          <h2 className="font-semibold text-lg">Edit Profil</h2>
          <InputUserProfile label="Username" name="username" value="NibrasAlyassar" />
          <InputUserProfile label="Email" name="email" value="nibras@example.com" />
          <InputUserProfile label="Bio" name="bio" value="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae, iste!" isTextArea={true} />
          <button className="btn btn-primary btn-outline px-5 btn-sm capitalize rounded-full w-fit">simpan</button>
        </div>
        <div className="flex flex-col gap-3">
          <ProfileHistory title="Disukai" description="Lorem ipsum dolor sit amet consectetur" icon={<AiFillHeart />} amount="10" />
        </div>
      </div>
    </div>
  );
}

export default Profile;

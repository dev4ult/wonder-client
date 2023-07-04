import Navbar from '../components/Navbar';
import InputGroup from '../components/InputGroup';
import HistoryBox from '../components/HistoryBox';
import DefaultUserPhoto from '../components/DefaultUserPhoto';

import SmallCard from '../components/SmallCard';
import SmallArticleCard from '../components/SmallArticleCard';

import { AiFillHeart, AiFillSetting } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { MdArticle } from 'react-icons/md';

function Profile() {
  return (
    <div>
      <Navbar />
      <div className="mt-7 flex gap-8">
        <div className="flex px-8 flex-col gap-5 border-r-2">
          <h2 className="font-semibold text-lg">Edit Profil</h2>
          <div className="form-control col-span-2">
            <label htmlFor="" className="label-text text-black/30">
              Foto
            </label>
            <div className="relative w-fit">
              <DefaultUserPhoto size="5rem" className="rounded-md" isRoundedFull={false} />
              <div className="tooltip absolute -top-2 -right-2 text-neutral" data-tip="Upload Foto">
                <label htmlFor="profile-photo" className="cursor-pointer">
                  <AiFillSetting size="1.5rem" />
                </label>
              </div>
              <input type="file" name="profile-photo" id="profile-photo" className="hidden" />
            </div>
          </div>
          <InputGroup label="Username" name="username" value="NibrasAlyassar" />
          <InputGroup label="Email" name="email" value="nibras@example.com" />
          <InputGroup label="Bio" name="bio" value="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae, iste!" isTextArea={true} />
          <button className="btn btn-primary btn-outline px-5 btn-sm capitalize rounded-full w-fit">simpan</button>
        </div>
        <div className="flex flex-col gap-3 pr-8">
          <h2 className="font-semibold text-lg">Histori User</h2>
          <div className="grid grid-flow-row grid-cols-2 gap-5">
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
    </div>
  );
}

export default Profile;

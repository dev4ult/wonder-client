import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

import NoImage from '../images/no-image.webp';

import BeachImage from '../images/beach.webp';
import CampImage from '../images/camp.webp';
import MountainImage from '../images/mountain.webp';
import WaveImage from '../images/wave.webp';

function Home() {
  return (
    <div>
      <Navbar />
      <div id="hero-section" className="border-b-2 py-14 flex gap-5 items-center">
        <div>
          <h1 className="font-black uppercase text-5xl font-archivo">Discover</h1>
          <p className="text-xl font-medium mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, asperiores!</p>
          <div className="flex gap-3 mt-5">
            <Link to="/discover" className="btn btn-md text-base rounded-full btn-primary px-8">
              Temukan Wisata
            </Link>
            <Link to="/article" className="btn btn-md text-base rounded-full btn-primary px-8 btn-outline">
              Bagikan Pengalaman
            </Link>
          </div>
        </div>
        <div className="grid w-[30rem] grid-flow-row grid-cols-2">
          <img src={CampImage} alt="camp" className="border-2  row-span-2" />
          <img src={BeachImage} alt="beach" className="border-2 h-full" />
          <img src={MountainImage} alt="mountain" className="border-2 h-full" />
        </div>
      </div>
      <div className="py-14">
        <h2 className="font-semibold text-xl">Rekomendasi</h2>
        <div className="grid grid-flow-row grid-cols-3 gap-5">
          <div></div>
        </div>
      </div>
      <div className="py-14">
        <h2 className="font-semibold text-xl">Artikel paling banyak disukai</h2>
      </div>
    </div>
  );
}

export default Home;

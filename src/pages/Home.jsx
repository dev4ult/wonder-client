import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

import NoImage from '../images/no-image.jpg';

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
        <div>
          <img src={NoImage} alt="no" className="w-96" />
        </div>
      </div>
    </div>
  );
}

export default Home;

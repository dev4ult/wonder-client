import { useSelector, useDispatch } from 'react-redux';

import { getTravelSpots } from '../features/travelspot/travelSpotSlice';

import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

import { PiArticleMediumDuotone } from 'react-icons/pi';
import { MdTravelExplore } from 'react-icons/md';
import SkeletonSmallCard from '../components/skeleton/SkeletonSmallCard';
import SkeletonArticleCard from '../components/skeleton/SkeletonArticleCard';

function Home() {
  function SkeletonCards() {
    let list = [];
    for (let i = 0; i < 6; i++) {
      list.push(
        <div className="p-5 rounded border-2">
          <SkeletonSmallCard />
        </div>
      );
    }

    return <>{list}</>;
  }

  function SkeletonArticleCards() {
    let list = [];
    for (let i = 0; i < 4; i++) {
      list.push(<SkeletonArticleCard />);
    }

    return <>{list}</>;
  }

  return (
    <div>
      <div>
        <div>
          <Navbar />
          <div id="hero-section" className="border-b-2 py-24 flex gap-5 items-center">
            <div>
              <h1 className="font-black uppercase text-5xl font-archivo">Discover</h1>
              <p className="text-xl font-medium mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, asperiores!</p>
              <div className="flex gap-3 mt-8">
                <Link to="/discover" className="btn btn-md capitalize text-base rounded-full btn-primary px-8 text-white">
                  Temukan Wisata
                </Link>
                <Link to="/article" className="btn btn-md capitalize text-base rounded-full btn-primary px-8 btn-outline">
                  Bagikan Pengalaman
                </Link>
              </div>
            </div>
            <div className="w-[30rem] flex items-center">
              <div className="rounded h-72 w-52 flex items-center justify-center border-2  translate-x-5 -rotate-z-12 shadow-xl">
                <div className="p-5 rounded-full bg-accent">
                  <PiArticleMediumDuotone size="4rem" className="text-white" />
                </div>
              </div>
              <div className="rounded h-72 w-52 flex items-center justify-center bg-accent shadow-xl rotate-z-12">
                <div className="p-5 rounded-full bg-white">
                  <MdTravelExplore size="4rem" className="text-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-14">
        <h2 className="font-semibold text-xl">Rekomendasi Wisata</h2>
        <div className="grid grid-flow-row grid-cols-3 gap-3 mt-8">{SkeletonCards()}</div>
      </div>
      <div className="py-14 border-t-2">
        <h2 className="font-semibold text-xl">Artikel banyak Disukai</h2>
        <div className="grid grid-flow-row grid-cols-2 gap-3 mt-8">{SkeletonArticleCards()}</div>
      </div>
    </div>
  );
}

export default Home;

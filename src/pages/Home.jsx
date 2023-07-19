import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PiArticleMediumDuotone } from 'react-icons/pi';
import { MdTravelExplore } from 'react-icons/md';

import { getTravelSpots, resetSpots } from '../features/travelspot/travelSpotSlice';

import Navbar from '../components/navbar/Navbar';
import SkeletonSmallCard from '../components/skeleton/SkeletonSmallCard';
import SmallCard from '../components/card/SmallCard';

function Home() {
  const { user } = useSelector((state) => state.auth);
  const { travelSpots, isSuccessfull } = useSelector((state) => state.travelspot);
  const dispatch = useDispatch();

  const [travelSpotsData, setTravelSpotsData] = useState(travelSpots);

  useEffect(() => {
    if (user != null) {
      dispatch(getTravelSpots(user.w_token_id));
    } else {
      dispatch(getTravelSpots());
    }
  }, []);

  useEffect(() => {
    if (travelSpots.length != 0 && isSuccessfull) {
      setTravelSpotsData(travelSpots);

      dispatch(resetSpots());
    }
  }, [travelSpots, isSuccessfull]);

  function TravelSpotCards() {
    let list = [];
    const length = travelSpotsData.length >= 6 ? 6 : travelSpotsData.length;

    for (let i = 0; i < length; i++) {
      const { id, nama, like, komen, deskripsi } = travelSpotsData[i].objek_wisata;
      let isLiked = false;

      if (travelSpotsData[i].objek_wisata.hasOwnProperty('is_like_user')) {
        isLiked = travelSpotsData[i].objek_wisata.is_like_user;
      }

      list.push(<SmallCard key={i} title={nama} description={deskripsi} totalLike={like} liked={isLiked} totalComment={komen} to={`/travelspot_detail/${id}`} />);
    }

    return <>{list}</>;
  }

  function SkeletonCards() {
    let list = [];
    for (let i = 0; i < 6; i++) {
      list.push(
        <div key={i} className="p-5 rounded border-2">
          <SkeletonSmallCard />
        </div>
      );
    }

    return <>{list}</>;
  }

  return (
    <>
      <Navbar />
      <div id="hero-section" className="border-b-2 py-24 flex gap-5 items-center">
        <div>
          <h1 className="font-black uppercase text-5xl font-archivo">Discover</h1>
          <p className="text-xl font-medium mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, asperiores!</p>
          <div className="flex gap-3 mt-8">
            <Link to="/travelspots" className="btn btn-md capitalize text-base rounded-full btn-primary px-8 text-white btn-outline">
              Temukan Wisata
            </Link>
            {/* <Link to="/article" className="btn btn-md capitalize text-base rounded-full btn-primary px-8 btn-outline">
              Bagikan Pengalaman
            </Link> */}
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

      <div className="py-14">
        <h2 className="font-semibold text-xl">Rekomendasi Wisata</h2>
        <div className="grid grid-flow-row grid-cols-4 gap-3 mt-8">{travelSpotsData.length != 0 ? TravelSpotCards() : SkeletonCards()}</div>
      </div>
    </>
  );
}

export default Home;

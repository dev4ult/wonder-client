import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { getTravelSpots, reset } from '../features/travelspot/travelSpotSlice';

import Navbar from '../components/Navbar';
import Card from '../components/Card';
import SkeletonCard from '../components/SkeletonCard';
import SmallCard from '../components/SmallCard';
import CategoryButton from '../components/CategoryButton';

import BeachImage from '../images/beach.webp';

function TravelSpots() {
  const { travelSpots, isLoading, isSuccessfull } = useSelector((state) => state.travelspot);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());

    dispatch(getTravelSpots());
  }, []);

  function skeletonCards() {
    let list = [];
    for (let i = 0; i < 10; i++) {
      list.push(<SkeletonCard key={i} />);
    }

    return <>{list}</>;
  }

  function travelSpotCards() {
    return travelSpots.data.map((data) => {
      const { nama, like } = data.objek_wisata;
      return <Card title={nama} src={BeachImage} linkTo="/travelspot_detail" description="Lorem ipsum dolor sit amet, consectetur adipisicing." likes={like} />;
    });
  }

  return (
    <>
      <Navbar />
      <div className="mt-7 flex items-start gap-10 justify-between">
        <div className="grid grid-flow-row grid-cols-2 gap-5 max-w-xl w-full">{isSuccessfull ? travelSpotCards() : skeletonCards()}</div>
        <aside className="sticky top-7">
          <input type="text" placeholder="Cari Wisata..." className="input input-sm border-gray-300 rounded-full" />
          <div className="py-7 border-b-2 ">
            <h3 className="text-black/30 font-medium mb-2 text-sm">Filter</h3>
            <div className="flex flex-wrap gap-2">
              <CategoryButton>Indonesia</CategoryButton>
              <CategoryButton>Internasional</CategoryButton>
              <CategoryButton>Jalan jalan</CategoryButton>
              <CategoryButton>Solo Travel</CategoryButton>
            </div>
          </div>
          <div className="py-7">
            <h3 className="text-black/30 font-medium mb-2 text-sm">Rekomendasi</h3>
            <div className="grid grid-flow-row grid-cols-2 gap-5">
              <SmallCard title="Pulau Melinjo" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit..." date="26 Jan 2023" linkTo="/place_detail" />
              <SmallCard title="Kawah Putih" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit..." date="" linkTo="/place_detail" />
              <SmallCard title="Pantai Indah Kapuk" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit..." date="" linkTo="/place_detail" />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default TravelSpots;

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getTravelSpots, reset } from '../features/travelspot/travelSpotSlice';

import Navbar from '../components/navbar/Navbar';

import Card from '../components/card/Card';
import SkeletonCard from '../components/skeleton/SkeletonCard';
import SmallCard from '../components/card/SmallCard';
import SkeletonSmallCard from '../components/skeleton/SkeletonSmallCard';
import CategoryButton from '../components/CategoryButton';

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import BeachImage from '../images/beach.webp';

function TravelSpots() {
  const { travelSpots, isLoading, isSuccessfull } = useSelector((state) => state.travelspot);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(reset());

    dispatch(getTravelSpots());
  }, []);

  function skeletonSmallCards() {
    let list = [];
    for (let i = 0; i < 3; i++) {
      list.push(<SkeletonSmallCard key={i} />);
    }

    return <>{list}</>;
  }

  function skeletonCards() {
    let list = [];
    for (let i = 0; i < 10; i++) {
      list.push(<SkeletonCard key={i} />);
    }

    return <>{list}</>;
  }

  function travelSpotCards() {
    return travelSpots.map((data, index) => {
      console.log(data);
      const { nama, like, id } = data.objek_wisata;
      return (
        <Card
          key={index}
          title={nama}
          src={BeachImage}
          onClick={navigate.bind(null, `/travelspot_detail/${id}`)}
          description="Lorem ipsum dolor sit amet, consectetur adipisicing."
          action={
            <div>
              <AiOutlineHeart />
            </div>
          }
        />
      );
    });
  }

  function topRangkedTravelSpotCards() {
    let list = [];

    for (let i = 0; i < 3; i++) {
      const { nama, like } = travelSpots[i].objek_wisata;
      list.push(<SmallCard key={i} title={nama} description="Lorem ipsum dolor sit amet, consectetur adipisicing elit..." date="26 Jan 2023" linkTo="/place_detail" />);
    }

    return <>{list}</>;
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
            <h3 className="text-black/30 font-medium mb-2 text-sm">Rekomendasi Wisata</h3>
            <div className="grid grid-flow-row grid-cols-2 gap-5">{isSuccessfull ? topRangkedTravelSpotCards() : skeletonSmallCards()}</div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default TravelSpots;

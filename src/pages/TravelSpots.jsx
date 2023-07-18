import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getTravelSpots, reset as resetTravelspotState } from '../features/travelspot/travelSpotSlice';

import Navbar from '../components/navbar/Navbar';

import Card from '../components/card/Card';
import SkeletonCard from '../components/skeleton/SkeletonCard';
import SmallCard from '../components/card/SmallCard';
import SkeletonSmallCard from '../components/skeleton/SkeletonSmallCard';
import CategoryButton from '../components/CategoryButton';
import SearchInput from '../components/SearchInput';

import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';

const PostPictureUrl = import.meta.env.VITE_POSTPICTUREURL;

function TravelSpots() {
  const { travelSpots, isSuccessfull } = useSelector((state) => state.travelspot);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [travelSpotsData, setTravelSpotsData] = useState([]);

  const { search_key } = useParams();

  const [searchKey, setSearchKey] = useState(search_key != undefined ? search_key : '');

  useEffect(() => {
    console.log(search_key);
    if (user != null) {
      const token_id = user.w_token_id;
      dispatch(getTravelSpots(token_id));
    } else {
      dispatch(getTravelSpots());
    }
    dispatch(resetTravelspotState());
  }, []);

  useEffect(() => {
    if (travelSpots.length != 0 && isSuccessfull) {
      setTravelSpotsData(travelSpots);
    }
  }, [travelSpots, isSuccessfull]);

  const SkeletonSmallCards = () => {
    let list = [];
    for (let i = 0; i < 3; i++) {
      list.push(<SkeletonSmallCard key={i} />);
    }

    return <>{list}</>;
  };

  const SkeletonCards = () => {
    let list = [];
    for (let i = 0; i < 10; i++) {
      list.push(<SkeletonCard key={i} />);
    }

    return <>{list}</>;
  };

  const TravelSpotCards = () => {
    return travelSpotsData.map((data, index) => {
      const { id, deskripsi, nama, provinsi, foto, like, komen } = data.objek_wisata;
      return (
        nama.toLowerCase().match(searchKey.toLowerCase() + '.*') && (
          <Card
            key={index}
            title={nama}
            src={foto && `${PostPictureUrl}/${foto}`}
            onClick={navigate.bind(null, `/travelspot_detail/${id}`)}
            description={deskripsi}
            action={
              <>
                <div className="flex items-center gap-2 text-black/50">
                  <div className="flex gap-1 items-center">
                    <AiOutlineHeart /> <span className="text-sm">{like}</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <AiOutlineComment /> <span className="text-sm">{komen}</span>
                  </div>
                </div>
                <p className="text-sm text-black/50 uppercase">{provinsi}</p>
              </>
            }
          />
        )
      );
    });
  };

  const TopRangkedTravelSpotCards = () => {
    let list = [];

    for (let i = 0; i < 3; i++) {
      const { nama, like, deskripsi } = travelSpotsData[i].objek_wisata;
      list.push(<SmallCard key={i} title={nama} description={deskripsi} date="26 Jan 2023" linkTo="/place_detail" />);
    }

    return <>{list}</>;
  };

  function onInputChange(e) {
    const { value } = e.target;

    setSearchKey(value);
  }

  return (
    <>
      <Navbar displaySearch={false} />
      <div className="mt-7 flex items-start gap-10 justify-between">
        <div className="grid grid-flow-row grid-cols-2 gap-5 max-w-xl w-full">{travelSpotsData.length != 0 ? TravelSpotCards() : SkeletonCards()}</div>
        <aside className="sticky top-7">
          <SearchInput placeholder="Cari Wisata..." size="sm" value={searchKey} onChange={onInputChange} />
          <div className="py-7 border-b-2 ">
            <h3 className="text-black/30 font-medium mb-2 text-sm">Filter</h3>
            <div className="flex flex-wrap gap-2">
              <CategoryButton>Lokal</CategoryButton>
              <CategoryButton>Internasional</CategoryButton>
            </div>
          </div>
          <div className="py-7">
            <h3 className="text-black/30 font-medium mb-2 text-sm">Rekomendasi Wisata</h3>
            <div className="grid grid-flow-row grid-cols-2 gap-5">{travelSpotsData.length != 0 ? TopRangkedTravelSpotCards() : SkeletonSmallCards()}</div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default TravelSpots;

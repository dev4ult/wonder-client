import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getTravelSpotsAdmin, getTravelSpotDetailAdmin, reset } from '../features/travelspot/travelSpotSlice';

import NavbarStick from '../components/navbar/NavbarStick';
import SearchInput from '../components/SearchInput';
import GoBackLink from '../components/GoBackLink';
import Card from '../components/card/Card';
import SkeletonCard from '../components/skeleton/SkeletonCard';
import ModalUpdateTravelspot from '../components/modal/ModalUpdateTravelspot';

function AdminTravelSpots() {
  const { travelSpots, travelSpot, isSuccessfull, message } = useSelector((state) => state.travelspot);
  const { user, isSuccessfull: isUserSet } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [travelSpotsData, setTravelSpotsData] = useState([]);

  const TravelSpotCards = () => {
    return travelSpots.map((travelspot, index) => (
      <Card
        key={travelspot.id}
        title={travelspot.nama}
        description={travelspot.deskripsi}
        likes={travelspot.jumlah_like}
        onClick={() => {
          document.getElementById('modal-detail-travelspot').showModal();

          dispatch(getTravelSpotDetailAdmin({ travelspot_id: travelspot.id, token_id: user.w_token_id }));
          dispatch(reset());
        }}
      />
    ));
  };

  const SkeletonCards = () => {
    const list = [];

    for (let i = 0; i < 15; i++) {
      list.push(<SkeletonCard key={i} />);
    }

    return <>{list}</>;
  };

  useEffect(() => {
    if (user != null && isUserSet) {
      dispatch(getTravelSpotsAdmin(user.w_token_id));
      dispatch(reset());
    }
  }, []);

  useEffect(() => {
    if (isSuccessfull && travelSpots.length != 0) {
      setTravelSpotsData(travelSpots);
    }
  }, [isSuccessfull, travelSpots]);

  useEffect(() => {
    if (isSuccessfull && message != '') {
      toast.success(message);

      dispatch(getTravelSpotsAdmin(user.w_token_id));

      dispatch(reset());
    }
  }, [message, isSuccessfull]);

  return (
    <div>
      <NavbarStick displaySearch={false} />
      <div className="my-7">
        <div className="flex gap-3 justify-between mb-5">
          <div className="flex gap-3 items-center">
            <GoBackLink to="/dashboard" />
            <Link to="/new_travelspot" className="btn btn-primary rounded-full btn-sm capitalize">
              objek wisata +
            </Link>
          </div>
          <SearchInput />
        </div>
        <div className="grid grid-flow-row grid-cols-4 gap-5">{travelSpotsData.length != null ? TravelSpotCards() : SkeletonCards()}</div>
      </div>
      <ModalUpdateTravelspot data={travelSpot} isLoaded={isSuccessfull} />
    </div>
  );
}

export default AdminTravelSpots;

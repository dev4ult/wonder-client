import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';

import { getTravelSpotsAdmin, getTravelSpotDetailAdmin, resetSpots, resetSpot, reset as resetNormalSpot } from '../features/travelspot/travelSpotSlice';
import { getAllAssesments, getAssesmentDetail, reset as resetAssesmentState } from '../features/assesment/assesmentSlice';

import NavbarStick from '../components/navbar/NavbarStick';
import GoBackLink from '../components/GoBackLink';
import Card from '../components/card/Card';
import SkeletonCard from '../components/skeleton/SkeletonCard';
import ModalDetailTravelspot from '../components/modal/ModalDetailTravelspot';

const PostPictureUrl = import.meta.env.VITE_POSTPICTUREURL;

function AdminTravelSpots() {
  const { travelSpots, travelSpot, isSuccessfull: isTravelspotSet, message } = useSelector((state) => state.travelspot);
  const { allAssesments } = useSelector((state) => state.assesment);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [travelSpotsData, setTravelSpotsData] = useState(travelSpots);

  const TravelSpotCards = () => {
    return travelSpots.map((travelspot, index) => (
      <Card
        key={index}
        title={travelspot.nama}
        description={travelspot.deskripsi}
        likes={travelspot.jumlah_like}
        src={travelspot.foto != '' ? `${PostPictureUrl}/${travelspot.foto}` : ''}
        action={
          <>
            <div className="flex items-center gap-2 text-black/50">
              <div className="flex gap-1 items-center">
                <AiOutlineHeart /> <span className="text-sm">{travelspot.jumlah_like}</span>
              </div>
              <div className="flex gap-1 items-center">
                <AiOutlineComment /> <span className="text-sm">{travelspot.jumlah_komen}</span>
              </div>
            </div>
            <p className="text-sm text-black/50 uppercase">{travelspot.provinsi}</p>
          </>
        }
        onClick={() => {
          document.getElementById('modal-detail-travelspot').showModal();

          const travelspot_id = travelspot.id;
          const token_id = user.w_token_id;

          dispatch(getTravelSpotDetailAdmin({ travelspot_id, token_id }));

          if (allAssesments.findIndex((item) => item.id_objek_wisata == travelspot.id) >= 0) {
            dispatch(getAssesmentDetail({ travelspot_id, token_id }));
          }

          dispatch(resetSpot());

          dispatch(resetAssesmentState());
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
    if (user != null) {
      dispatch(getTravelSpotsAdmin(user.w_token_id));
      dispatch(getAllAssesments(user.w_token_id));

      // reset state
      dispatch(resetNormalSpot());
      dispatch(resetAssesmentState());
    }
  }, []);

  useEffect(() => {
    if (travelSpots.length != 0) {
      setTravelSpotsData(travelSpots);
    }
  }, [travelSpots]);

  useEffect(() => {
    if (isTravelspotSet && message != '') {
      toast.success(message);

      dispatch(getTravelSpotsAdmin(user.w_token_id));
      dispatch(resetSpots());
    }
  }, [message, isTravelspotSet]);

  return (
    <div>
      <NavbarStick />
      <div className="my-7">
        <div className="flex gap-3 justify-between mb-5">
          <div className="flex gap-3 items-center">
            <GoBackLink to="/dashboard" />
            <Link to="/new_travelspot" className="btn btn-primary rounded-full btn-sm capitalize">
              objek wisata +
            </Link>
          </div>
        </div>
        <div className="grid grid-flow-row grid-cols-4 gap-5">{travelSpotsData.length != 0 ? TravelSpotCards() : SkeletonCards()}</div>
      </div>
      <ModalDetailTravelspot travelspot={travelSpot} assesments={allAssesments} isLoaded={isTravelspotSet} />
    </div>
  );
}

export default AdminTravelSpots;

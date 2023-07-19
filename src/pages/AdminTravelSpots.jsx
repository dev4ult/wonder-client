import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';

import { getTravelSpotsAdmin, getTravelSpotDetailAdmin, resetSpots, resetSpot } from '../features/travelspot/travelSpotSlice';
import { getAllAssesments, getAssesmentDetail, reset as resetAssesmentState } from '../features/assesment/assesmentSlice';

import NavbarStick from '../components/navbar/NavbarStick';
import GoBackLink from '../components/GoBackLink';
import Card from '../components/card/Card';
import SkeletonCard from '../components/skeleton/SkeletonCard';
import ModalDetailTravelspot from '../components/modal/ModalDetailTravelspot';
import SearchInput from '../components/SearchInput';

const PostPictureUrl = import.meta.env.VITE_POSTPICTUREURL;

function AdminTravelSpots() {
  const { travelSpots, travelSpot, isSuccessfull: isTravelspotSet, message } = useSelector((state) => state.travelspot);
  const { allAssesments } = useSelector((state) => state.assesment);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [travelSpotsData, setTravelSpotsData] = useState(travelSpots);
  const [searchKey, setSearchKey] = useState('');

  function openDetailModal(travelspot) {
    document.getElementById('modal-detail-travelspot').showModal();

    const travelspot_id = travelspot.id;
    const token_id = user.w_token_id;

    dispatch(getTravelSpotDetailAdmin({ travelspot_id, token_id }));

    if (allAssesments.findIndex((item) => item.id_objek_wisata == travelspot.id) >= 0) {
      dispatch(getAssesmentDetail({ travelspot_id, token_id }));
    }

    dispatch(resetSpot());

    dispatch(resetAssesmentState());
  }

  const TravelSpotCards = () => {
    const datas = [];
    travelSpotsData.map((travelspot, index) => {
      const { nama, deskripsi, jumlah_like, jumlah_komen, foto, provinsi } = travelspot;
      nama.toLowerCase().match(searchKey.toLowerCase() + '.*') &&
        datas.push(
          <Card
            key={index}
            title={nama}
            description={deskripsi}
            likes={jumlah_like}
            src={foto != '' ? `${PostPictureUrl}/${foto}` : ''}
            action={
              <>
                <div className="flex items-center gap-2 text-black/50">
                  <div className="flex gap-1 items-center">
                    <AiOutlineHeart /> <span className="text-sm">{jumlah_like}</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <AiOutlineComment /> <span className="text-sm">{jumlah_komen}</span>
                  </div>
                </div>
                <p className="text-sm text-black/50 uppercase">{provinsi}</p>
              </>
            }
            onClick={openDetailModal.bind(null, travelspot)}
          />
        );
    });

    return (
      <>
        {datas.length != 0 ? (
          datas
        ) : (
          <p className="col-span-2">
            Objek Wisata <span className="font-bold text-2xl mx-2">{searchKey}</span> tidak ditemukan...
          </p>
        )}
      </>
    );
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
      dispatch(resetAssesmentState());
    }
  }, []);

  useEffect(() => {
    if (travelSpots.length != 0) {
      setTravelSpotsData(travelSpots);

      dispatch(resetSpots());
    }
  }, [travelSpots]);

  useEffect(() => {
    if (isTravelspotSet && message != '') {
      toast.success(message);

      dispatch(getTravelSpotsAdmin(user.w_token_id));
      dispatch(resetSpots());
    }
  }, [message, isTravelspotSet]);

  function onInputChange(e) {
    const { value } = e.target;

    setSearchKey(value);
  }

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
          <SearchInput placeholder="Cari Wisata..." size="sm" onChange={onInputChange} value={searchKey} />
        </div>
        <div className="grid grid-flow-row grid-cols-4 gap-5">{travelSpotsData.length != 0 ? TravelSpotCards() : SkeletonCards()}</div>
      </div>
      <ModalDetailTravelspot travelspot={travelSpot} assesments={allAssesments} isLoaded={isTravelspotSet} />
    </div>
  );
}

export default AdminTravelSpots;

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import { deleteTravelSpot, reset } from '../../features/travelspot/travelSpotSlice';

import { IoClose } from 'react-icons/io5';
import SkeletonTravelspotDetail from '../skeleton/SkeletonTravelspotDetail';

const PostPictureUrl = import.meta.env.VITE_POSTPICTUREURL;

function ModalDetailTravelspot({ data, isLoaded }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function onConfirmDelete() {
    const travelspot_id = data.id;
    const token_id = user.w_token_id;
    dispatch(deleteTravelSpot({ travelspot_id, token_id }));

    dispatch(reset());
  }

  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  const DeleteConfirmation = () => {
    return (
      <>
        <h2 className="text-error">Apakah anda yakin untuk menghapus Objek Wisata ini?</h2>
        <div className="modal-action">
          <button
            type="button"
            onClick={() => {
              setOpenDeleteConfirm(false);
              document.getElementById('modal-detail-travelspot').close();
              onConfirmDelete();
            }}
            className="btn btn-sm rounded-full capitalize btn-error"
          >
            Iya
          </button>
          <button type="button" onClick={setOpenDeleteConfirm.bind(null, false)} className="btn btn-sm rounded-full capitalize btn-outline">
            Tidak
          </button>
        </div>
      </>
    );
  };

  return (
    <dialog id="modal-detail-travelspot" className="modal">
      <form method="dialog" className={`modal-box ${openDeleteConfirm ? 'max-w-sm' : 'max-w-xl'} relative`}>
        {data != null && isLoaded ? (
          openDeleteConfirm ? (
            DeleteConfirmation()
          ) : (
            <>
              <div className="">
                <h2 className="font-bold text-xl">{data.nama}</h2>
                <h4>
                  {data.provinsi} - {data.kab_kota}
                </h4>
              </div>
              <hr className="my-3" />
              <div className="grid grid-flow-row grid-cols-2 gap-3">
                <div>
                  <label className="text-black/30 text-sm">Alamat</label>
                  <p className="font-medium">{data.alamat_lengkap}</p>
                </div>
                <div>
                  <label className="text-black/30 text-sm">Deskripsi</label>
                  <p className="font-medium">{data.deskripsi}</p>
                </div>
                <div>
                  <label className="text-black/30 text-sm">Fasilitas</label>
                  <ul className="font-medium list-disc ml-5">
                    {data.fasilitas.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <hr className="my-3" />
              <div>
                <label className="text-black/30 text-sm">Gambar / Foto</label>
                <div className="flex gap-3 flex-wrap mt-1">
                  {data.foto[0] != '' ? (
                    data.foto.map((item, index) => <img key={index} src={`${PostPictureUrl}/${item}`} className="w-52 bg-cover" alt="gambar" />)
                  ) : (
                    <p className="text-black/40 font-medium">Tidak ada Gambar atau Foto yang tersedia...</p>
                  )}
                </div>
              </div>
              <hr className="my-3" />
              <div className="modal-action justify-between">
                <Link to={`/travelspot_detail/${data.id}`} className="btn btn-sm btn-primary capitalize rounded-full">
                  postingan
                </Link>
                <div className="flex gap-2">
                  <Link to={`/update_travelspot/${data.id}`} type="button" className="btn btn-sm btn-warning capitalize rounded-full">
                    edit
                  </Link>
                  <button type="button" onClick={setOpenDeleteConfirm.bind(null, true)} className="btn btn-sm btn-error capitalize btn-outline rounded-full">
                    hapus
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById('modal-detail-travelspot').close();
                    }}
                    className="btn btn-sm btn-square btn-neutral btn-outline rounded-full capitalize absolute top-5 right-5"
                  >
                    <IoClose size="1.2rem" />
                  </button>
                </div>
              </div>
            </>
          )
        ) : (
          <SkeletonTravelspotDetail />
        )}
      </form>
    </dialog>
  );
}

export default ModalDetailTravelspot;

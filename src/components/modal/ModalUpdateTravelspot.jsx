import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import { deleteTravelSpot, reset } from '../../features/travelspot/travelSpotSlice';

import { IoClose } from 'react-icons/io5';

function ModalUpdateTravelspot({ data, isLoaded }) {
  const { message, isSuccessfull } = useSelector((state) => state.travelspot);
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
    <dialog id="modal-detail-travelspot" className="modal modal-bottom sm:modal-middle">
      <form method="dialog" className="modal-box relative">
        {data != null && isLoaded ? (
          openDeleteConfirm ? (
            DeleteConfirmation()
          ) : (
            <>
              <h3 className="font-bold text-lg">{data.nama}</h3>
              <p className="py-4">Press ESC key or click the button below to close</p>
              <div className="modal-action justify-between">
                <Link to={`/travelspot_detail/${data.id}`} className="btn btn-sm btn-primary capitalize rounded-full">
                  postingan
                </Link>
                <div className="flex gap-3">
                  <button type="button" className="btn btn-sm btn-warning capitalize rounded-full">
                    edit
                  </button>
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
          ''
        )}
      </form>
    </dialog>
  );
}

export default ModalUpdateTravelspot;

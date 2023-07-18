import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Link } from 'react-router-dom';

import { deleteTravelSpot, resetSpot } from '../../features/travelspot/travelSpotSlice';
import { addAssesment, updateAssesment, getAllAssesments, reset as resetAssesmentState } from '../../features/assesment/assesmentSlice';

import { IoClose } from 'react-icons/io5';
import { BsArrowLeft } from 'react-icons/bs';

import InputGroup from '../InputGroup';
import SelectGroup from '../SelectGroup';
import SkeletonTravelspotDetail from '../skeleton/SkeletonTravelspotDetail';

const PostPictureUrl = import.meta.env.VITE_POSTPICTUREURL;

const initialFormState = {
  attractiveness: '',
  cost: '',
  cleanliness: '',
  facilities: '',
};

function ModalDetailTravelspot({ travelspot, isLoaded }) {
  const { assesment, isSuccessfull: isAssesmentSuccess, isError: isAssesmentFailed, message, errorMessages } = useSelector((state) => state.assesment);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formAsessment, setFormAsessment] = useState(initialFormState);
  const [formUpdateAsessment, setFormUpdateAsessment] = useState(initialFormState);

  const [isFAOpen, setIsFAOpen] = useState(false);
  const [isFAUpdateOpen, setIsFAUpdateOpen] = useState(false);

  // success submit
  useEffect(() => {
    if (isAssesmentSuccess && message != '') {
      toast.success(message);

      document.getElementById('modal-detail-travelspot').close();
      setIsFAOpen(false);
      setIsFAUpdateOpen(false);
      dispatch(getAllAssesments(user.w_token_id));
    }
  }, [isAssesmentSuccess, message]);

  // failed submit
  useEffect(() => {
    if (isAssesmentFailed && errorMessages.length != 0) {
      errorMessages.forEach((message) => {
        toast.error(message);
      });

      document.getElementById('modal-detail-travelspot').close();
      dispatch(resetAssesmentState());
    }
  }, [isAssesmentFailed, errorMessages]);

  function onConfirmDelete() {
    const travelspot_id = travelspot.id;
    const token_id = user.w_token_id;
    dispatch(deleteTravelSpot({ travelspot_id, token_id }));

    // dispatch(resetTravelspotStat());
  }

  useEffect(() => {
    if (assesment != null && isAssesmentSuccess) {
      const { daya_tarik, biaya, kebersihan, sarana_dan_prasarana } = assesment;

      setFormUpdateAsessment({
        attractiveness: daya_tarik,
        cost: biaya,
        cleanliness: kebersihan,
        facilities: sarana_dan_prasarana,
      });
    }
  }, [assesment, isAssesmentSuccess]);

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

  const BackBtn = ({ onClick }) => {
    return (
      <div className="text-right mt-4">
        <button type="button" onClick={onClick} className="btn btn-xs rounded-full btn-outline">
          <BsArrowLeft size="1.1rem" />
        </button>
      </div>
    );
  };

  function onInputChange(e) {
    const { name, value } = e.target;

    setFormAsessment((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function onSubmitAddAssesment(travelspot_id) {
    const token_id = user.w_token_id;
    const assesment_detail = formAsessment;

    dispatch(addAssesment({ assesment_detail, travelspot_id, token_id }));
    dispatch(resetAssesmentState());
  }

  const AssesmentForm = () => {
    return isFAOpen ? (
      <>
        <BackBtn onClick={setIsFAOpen.bind(null, false)} />
        <div className="mt-2 grid grid-flow-row grid-cols-2 gap-3">
          <InputGroup type="number" label="Daya Tarik" name="attractiveness" placeholder="20-100" required onChange={onInputChange} value={attractiveness} />
          <InputGroup type="number" label="Kebersihan" name="cleanliness" placeholder="1-10" required onChange={onInputChange} value={cleanliness} />
          <SelectGroup
            label="Harga"
            name="cost"
            optionList={[
              { id: 20, name: 20 },
              { id: 40, name: 40 },
              { id: 60, name: 60 },
              { id: 80, name: 80 },
              { id: 100, name: 100 },
            ]}
            onChange={onInputChange}
            value={cost}
            required
          />
          <SelectGroup
            label="Sarana Prasarana"
            name="facilities"
            optionList={[
              { id: 0, name: 0 },
              { id: 50, name: 50 },
              { id: 100, name: 100 },
            ]}
            onChange={onInputChange}
            value={facilities}
            required
          />
          <button type="button" onClick={onSubmitAddAssesment.bind(null, travelspot.id)} className="col-span-2 w-full rounded btn btn-success btn-outline capitalize">
            tambah Penilaian
          </button>
        </div>
      </>
    ) : (
      <div>
        <span className="text-black/40 font-medium my-1">Penilaian Kosong</span>
        <button type="button" onClick={setIsFAOpen.bind(null, true)} className="btn btn-sm btn-outline rounded btn-success capitalize ml-3">
          tambah Penilaian
        </button>
      </div>
    );
  };

  function onInputUpdateChange(e) {
    const { name, value } = e.target;

    setFormUpdateAsessment((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function onSubmitUpdateAssesment(travelspot_id) {
    const token_id = user.w_token_id;
    const assesment_detail = formUpdateAsessment;

    dispatch(updateAssesment({ assesment_detail, travelspot_id, token_id }));
    dispatch(resetAssesmentState());
  }

  const { attractiveness: u_attractiveness, cost: u_cost, cleanliness: u_cleanliness, facilities: u_facilities } = formUpdateAsessment;

  const AssesmentDetail = (assesment) => {
    return isFAUpdateOpen ? (
      <>
        <BackBtn onClick={setIsFAUpdateOpen.bind(null, false)} />
        <div className="mt-2 grid grid-flow-row grid-cols-2 gap-3">
          <InputGroup type="number" label="Daya Tarik" name="attractiveness" placeholder="20-100" required onChange={onInputUpdateChange} value={u_attractiveness} />
          <InputGroup type="number" label="Kebersihan" name="cleanliness" placeholder="1-10" required onChange={onInputUpdateChange} value={u_cleanliness} />
          <SelectGroup
            label="Harga"
            name="cost"
            optionList={[
              { id: 20, name: 20 },
              { id: 40, name: 40 },
              { id: 60, name: 60 },
              { id: 80, name: 80 },
              { id: 100, name: 100 },
            ]}
            onChange={onInputUpdateChange}
            value={u_cost}
            required
          />
          <SelectGroup
            label="Sarana Prasarana"
            name="facilities"
            optionList={[
              { id: 0, name: 0 },
              { id: 50, name: 50 },
              { id: 100, name: 100 },
            ]}
            onChange={onInputUpdateChange}
            value={u_facilities}
            required
          />
          <button type="button" onClick={onSubmitUpdateAssesment.bind(null, travelspot.id)} className="col-span-2 w-full rounded btn btn-warning btn-outline capitalize">
            ubah Penilaian
          </button>
        </div>
      </>
    ) : (
      <>
        <div className="flex gap-3 justify-between items-center">
          <label className="text-black/30 text-sm">Penilaian Objek Wisata</label>
          <button type="button" onClick={setIsFAUpdateOpen.bind(null, true)} className="btn btn-xs rounded-full capitalize btn-warning btn-outline">
            ubah penilaian
          </button>
        </div>
        <div className="overflow-x-auto mt-2">
          <table className="table table-zebra border-2">
            <thead>
              <tr className="bg-gray-300">
                <th>Kriteria</th>
                <th>Nilai / Bobot</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Daya Tarik</td>
                <td>{assesment.daya_tarik}</td>
              </tr>
              <tr>
                <td>Biaya</td>
                <td>{assesment.biaya}</td>
              </tr>
              <tr>
                <td>Kebersihan</td>
                <td>{assesment.kebersihan}</td>
              </tr>
              <tr>
                <td>Sarana dan Prasarana</td>
                <td>{assesment.sarana_dan_prasarana}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  };

  const { attractiveness, cost, cleanliness, facilities } = formAsessment;

  return (
    <dialog id="modal-detail-travelspot" className="modal">
      <form method="dialog" className={`modal-box ${openDeleteConfirm ? 'max-w-sm' : 'max-w-xl'} relative`}>
        {travelspot != null && isLoaded ? (
          openDeleteConfirm ? (
            DeleteConfirmation()
          ) : (
            <>
              <div>
                <h2 className="font-bold text-xl">{travelspot.nama}</h2>
                <h4>
                  {travelspot.provinsi} - {travelspot.kab_kota}
                </h4>
              </div>
              <hr className="my-3" />
              <div className="grid grid-flow-row grid-cols-2 gap-3">
                <div>
                  <label className="text-black/30 text-sm">Alamat</label>
                  <p className="font-medium">{travelspot.alamat_lengkap}</p>
                </div>
                <div>
                  <label className="text-black/30 text-sm">Deskripsi</label>
                  <p className="font-medium">{travelspot.deskripsi}</p>
                </div>
                <div>
                  <label className="text-black/30 text-sm">Fasilitas</label>
                  <ul className="font-medium list-disc ml-5">
                    {travelspot.fasilitas.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <hr className="my-3" />
              <div>
                <label className="text-black/30 text-sm">Gambar / Foto</label>
                <div className="flex gap-3 flex-wrap mt-1">
                  {travelspot.foto[0] != '' ? (
                    travelspot.foto.map((item, index) => <img key={index} src={`${PostPictureUrl}/${item}`} className="w-52 bg-cover" alt="gambar" />)
                  ) : (
                    <p className="text-black/40 font-medium">Tidak ada Gambar atau Foto yang tersedia...</p>
                  )}
                </div>
              </div>
              <hr className="my-3" />
              <div>{assesment != null ? AssesmentDetail(assesment) : AssesmentForm()}</div>

              <hr className="my-3" />
              <div className="modal-action justify-between">
                <Link to={`/travelspot_detail/${travelspot.id}`} onClick={dispatch.bind(null, resetSpot())} className="btn btn-sm btn-primary capitalize rounded-full">
                  postingan
                </Link>
                <div className="flex gap-2">
                  <Link to={`/update_travelspot/${travelspot.id}`} className="btn btn-sm btn-warning capitalize rounded-full">
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

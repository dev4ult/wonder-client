import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAdmins, getAdminDetail, reset } from '../features/user/userSlice';

import NavbarStick from '../components/navbar/NavbarStick';
import DefaultUserPhoto from '../components/DefaultUserPhoto';
import SkeletonTableData from '../components/SkeletonTableData';
import SearchInput from '../components/SearchInput';
import InputGroup from '../components/InputGroup';
import SelectGroup from '../components/SelectGroup';

function ManageAdmin() {
  const { users, isSuccessfull, admin } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [admins, setAdmins] = useState(users);
  const [formOpen, setFormOpen] = useState(false);

  const [formUpdate, setFormUpdate] = useState({
    photo: null,
    fullname: '',
    gender: '',
    address: '',
    phone: '',
    nik: '',
  });

  function onClickGetId(e) {
    const admin_id = e.target.id;
    const token_id = user.w_token_id;

    dispatch(getAdminDetail({ admin_id, token_id }));

    document.getElementById('modal').showModal();

    dispatch(reset());
  }

  useEffect(() => {
    if (admin != null) {
      const { nama_lengkap, no_telepon, alamat, jenis_kelamin, nik, foto } = admin;

      setFormUpdate({
        photo: foto,
        fullname: nama_lengkap,
        gender: jenis_kelamin,
        address: alamat,
        phone: no_telepon,
        nik,
      });
    }
  }, [admin]);

  useEffect(() => {
    dispatch(getAdmins(user.w_token_id));
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (users.length != 0) {
      setAdmins(users);
    }
  }, [users]);

  const { photo, fullname, gender, address, phone, nik } = formUpdate;

  function onTextChange(e) {
    const { name, value } = e.target;

    setFormUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function onGenderSelect(e) {
    const { value } = e.target;

    setFormUpdate((prev) => ({
      ...prev,
      gender: value,
    }));
  }

  function onSubmitForm(e) {
    e.preventDefault();
  }

  const OpenUpdateForm = () => {
    return (
      <form onSubmit={onSubmitForm}>
        <h2 className="text-xl font-semibold mb-3">Form Edit Data Admin</h2>
        <div className="grid grid-flow-row grid-cols-2 gap-5">
          <InputGroup label="Nama Lengkap" name="fullname" placeholder="Isi Nama Lengkap" value={fullname} onChange={onTextChange} />
          <InputGroup label="Nomor Telepon" name="phone" placeholder="Isi Nomor Telepon" value={phone} onChange={onTextChange} />
          <InputGroup label="NIK" name="nik" type="number" placeholder="Isi NIK" value={nik} onChange={onTextChange} />
          <SelectGroup
            label="Jenis Kelamin"
            name="gender"
            optionList={[
              { id: 'female', name: 'Perempuan' },
              { id: 'male', name: 'Laki-laki' },
            ]}
            value={gender}
            onChange={onGenderSelect}
          />
          <InputGroup label="Alamat" isTextArea={true} name="fullname" placeholder="Isi Alamat" value={address} onChange={onTextChange} />
        </div>
        <button type="button" onClick={setFormOpen.bind(null, false)} className="btn btn-sm btn-error mt-3 btn-outline">
          cancel
        </button>
      </form>
    );
  };

  const DialogModal = () => {
    return (
      <dialog id="modal" className="modal">
        <form method="dialog" className={`modal-box ${formOpen ? 'max-w-2xl' : undefined}`}>
          {admin != null && isSuccessfull ? (
            formOpen ? (
              OpenUpdateForm()
            ) : (
              <>
                <div className="flex gap-3 items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{admin.nama_lengkap}</h3>
                    <p className="text-sm text-black/30">
                      <span className="badge badge-info">{admin.no_telepon}</span>
                    </p>
                  </div>
                  <DefaultUserPhoto size="3rem" isRoundedFull={false} className="rounded" />
                </div>
                <hr className="my-3" />
                <div className="grid grid-flow-row grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm text-black/30">Username</label>
                    <p className="font-medium">{admin.user.username}</p>
                  </div>
                  <div>
                    <label className="text-sm text-black/30">Email</label>
                    <p className="font-medium">{admin.user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-black/30">NIK</label>
                    <p className="font-medium">{admin.nik}</p>
                  </div>
                  <div>
                    <label className="text-sm text-black/30">Jenis Kelamin</label>
                    <p className="font-medium">{admin.jenis_kelamin}</p>
                  </div>
                  <div>
                    <label className="text-sm text-black/30">Bio</label>
                    <p className="font-medium">{admin.user.bio ? admin.user.bio : '...'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-black/30">Alamat</label>
                    <p className="font-medium">{admin.alamat}</p>
                  </div>
                </div>
                <div className="modal-action">
                  <button type="button" onClick={setFormOpen.bind(null, true)} className="btn btn-sm btn-warning">
                    Edit
                  </button>
                  <button className="btn btn-sm btn-neutral btn-outline">Tutup</button>
                </div>
              </>
            )
          ) : (
            <h2>FETCHING ADMIN DETAIL...</h2>
          )}
        </form>
      </dialog>
    );
  };

  const TableDataAdmins = () => {
    return admins.map((admin) => (
      <tr key={admin.id}>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <DefaultUserPhoto isRoundedFull={false} className="rounded" size="2rem" />
            </div>
            <div>
              <div className="font-bold">{admin.nama_lengkap}</div>
              <div className="text-sm opacity-50">{admin.no_telepon}</div>
            </div>
          </div>
        </td>
        <td>
          <span className="badge badge-ghost">{admin.nik}</span>
        </td>
        <td>{admin.jenis_kelamin == 'male' ? 'Laki-laki' : 'Perempuan'}</td>
        <th>
          <button type="button" onClick={onClickGetId} id={admin.id} className="btn btn-outline btn-xs">
            details
          </button>
        </th>
      </tr>
    ));
  };

  const SkeletonTableDatas = () => {
    let list = [];
    for (let i = 0; i < 10; i++) {
      list.push(<SkeletonTableData key={i} />);
    }
    return <>{list}</>;
  };

  return (
    <div>
      <NavbarStick displaySearch={false} />
      <div className="mt-7">
        <div className="mb-4 flex gap-4 justify-between items-center">
          <button type="button" className="btn btn-sm rounded-full btn-primary">
            registrasi admin +
          </button>
          <SearchInput placeholder="Cari Admin..." size="sm" />
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Nama </th>
                <th>NIK</th>
                <th>Jenis Kelamin</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{admins.length != 0 ? TableDataAdmins() : SkeletonTableDatas()}</tbody>
          </table>
        </div>
      </div>
      {DialogModal()}
    </div>
  );
}

export default ManageAdmin;

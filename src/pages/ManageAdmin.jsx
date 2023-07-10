import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAdmins, getAdminDetail, addAdmin, reset } from '../features/user/userSlice';

import NavbarStick from '../components/navbar/NavbarStick';
import DefaultUserPhoto from '../components/DefaultUserPhoto';
import SkeletonTableData from '../components/SkeletonTableData';
import SearchInput from '../components/SearchInput';
import ModalAddAdmin from '../components/modal/ModalAddAdmin';
import ModalUpdateAdmin from '../components/modal/ModalUpdateAdmin';

function ManageAdmin() {
  const { users, isSuccessfull, admin } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [admins, setAdmins] = useState(users);

  const [formUpdate, setFormUpdate] = useState({
    photo: null,
    fullname: '',
    gender: '',
    address: '',
    phone: '',
    nik: '',
  });

  const [formAdd, setFormAdd] = useState({
    photo: null,
    fullname: '',
    gender: '-1',
    address: '',
    phone: '',
    nik: '',
    username: '',
    email: '',
    password: '',
    role: '-1',
  });

  function onClickGetId(e) {
    const admin_id = e.target.id;
    const token_id = user.w_token_id;

    dispatch(getAdminDetail({ admin_id, token_id }));

    document.getElementById('modal-detail').showModal();

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

  const TableDataAdmins = () => {
    return admins.map((admin, index) => (
      <tr key={index + 1}>
        <td>{index + 1}</td>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <DefaultUserPhoto isRoundedFull={false} className="rounded" size="2.5rem" />
            </div>
            <div>
              <div className="font-bold text-base">{admin.nama_lengkap}</div>
              <div className="text-sm opacity-50">{admin.no_telepon}</div>
            </div>
          </div>
        </td>
        <td>
          <span className="badge badge-ghost badge-lg">{admin.nik}</span>
        </td>
        <td className="text-base">{admin.jenis_kelamin == 'male' ? 'Laki-laki' : 'Perempuan'}</td>
        <th>
          <button type="button" onClick={onClickGetId} id={admin.id} className="btn btn-outline btn-sm capitalize rounded-full">
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

  function onUpdateForm(e) {
    e.preventDefault();
  }

  function onAddForm(e) {
    e.preventDefault();

    dispatch(
      addAdmin({
        admin_detail: formAdd,
        token_id: user.w_token_id,
      })
    );

    dispatch(reset());

    // console.log(formAdd, user.w_token_id);
  }

  return (
    <div>
      <NavbarStick displaySearch={false} />
      <div className="mt-7">
        <div className="mb-4 flex gap-4 justify-between items-center">
          <button
            type="button"
            onClick={() => {
              document.getElementById('modal-add').showModal();
            }}
            className="btn capitalize btn-sm rounded-full btn-primary px-4"
          >
            registrasi admin +
          </button>
          <SearchInput placeholder="Cari Admin..." />
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-base-300">
                <th></th>
                <th className="text-base font-medium">Nama </th>
                <th className="text-base font-medium">NIK</th>
                <th className="text-base font-medium">Jenis Kelamin</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{admins.length != 0 ? TableDataAdmins() : SkeletonTableDatas()}</tbody>
          </table>
        </div>
      </div>
      <ModalAddAdmin form={formAdd} setForm={setFormAdd} onSubmit={onAddForm} />
      <ModalUpdateAdmin data={admin} isLoaded={isSuccessfull} form={formUpdate} setForm={setFormUpdate} onSubmit={onUpdateForm} />
    </div>
  );
}

export default ManageAdmin;

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getAdmins, getAdminDetail, addAdmin, deleteAdmin, updateAdmin, reset } from '../features/user/userSlice';

import NavbarStick from '../components/navbar/NavbarStick';
import SkeletonTableData from '../components/skeleton/SkeletonTableData';
import SearchInput from '../components/SearchInput';
import ModalAddAdmin from '../components/modal/ModalAddAdmin';
import ModalUpdateAdmin from '../components/modal/ModalUpdateAdmin';

const UserPhotoUrl = import.meta.env.VITE_USERPHOTOURL;

const initialFormAddState = {
  photo: null,
  fullname: '',
  gender: '',
  address: '',
  phone: '',
  nik: '',
  username: '',
  email: '',
  password: '',
  role: '',
};

const initialFormUpdateState = {
  id: null,
  photo: null,
  fullname: '',
  gender: '',
  address: '',
  phone: '',
  nik: '',
  username: '',
  email: '',
  role: '',
  bio: '',
};

function ManageAdmin() {
  const { users, isSuccessfull, message, isError, errorMessages, admin } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [admins, setAdmins] = useState(users);

  const [formUpdate, setFormUpdate] = useState(initialFormUpdateState);

  const [formAdd, setFormAdd] = useState(initialFormAddState);

  useEffect(() => {
    if (user != null) {
      dispatch(getAdmins(user.w_token_id));
      dispatch(reset());
    }
  }, []);

  // Open Admin Details
  useEffect(() => {
    if (admin != null) {
      const { id, nama_lengkap, no_telepon, alamat, jenis_kelamin, nik } = admin;
      const { username, email, role, bio, foto } = admin.user;

      setFormUpdate({
        id,
        photo: foto != null ? foto : null,
        fullname: nama_lengkap,
        gender: jenis_kelamin,
        address: alamat,
        phone: no_telepon,
        nik,
        username,
        email,
        role,
        bio,
      });
    }
  }, [admin]);

  useEffect(() => {
    if (users.length != 0) {
      setAdmins(users);
    }
  }, [users]);

  // Success Create new Admin
  useEffect(() => {
    if (isSuccessfull && message != '') {
      toast.success(message);

      if (message == 'Akun berhasil ditambahkan!') {
        setFormAdd(initialFormAddState);
      }

      if (message == `${formUpdate.fullname} berhasil diubah datanya!`) {
        const admin_id = formUpdate.id;
        const token_id = user.w_token_id;

        dispatch(getAdminDetail({ admin_id, token_id }));
      }

      dispatch(getAdmins(user.w_token_id));
      dispatch(reset());
    }
  }, [isSuccessfull, message]);

  // Error Input
  useEffect(() => {
    if (isError && errorMessages.length != 0) {
      errorMessages.forEach((message) => {
        toast.error(message);
      });
    }
  }, [isError, errorMessages]);

  function onUpdateForm(e) {
    e.preventDefault();

    dispatch(
      updateAdmin({
        admin_detail: formUpdate,
        admin_id: formUpdate.id,
        token_id: user.w_token_id,
      })
    );

    dispatch(reset());
  }

  function onAddForm(e) {
    e.preventDefault();

    dispatch(
      addAdmin({
        admin_detail: formAdd,
        token_id: user.w_token_id,
      })
    );

    document.getElementById('modal-add').close();

    dispatch(reset());
  }

  function onDelete() {
    const { id: admin_id } = formUpdate;
    const token_id = user.w_token_id;

    dispatch(deleteAdmin({ admin_id, token_id }));

    dispatch(reset());
  }

  const TableDataAdmins = () => {
    return admins.map((admin, index) => (
      <tr key={index + 1}>
        <td>{index + 1}</td>
        <td>
          <div>
            <div className="font-bold text-base">{admin.nama_lengkap}</div>
            <div className="text-sm opacity-50">{admin.no_telepon}</div>
          </div>
        </td>
        <td>
          <span className="badge badge-ghost badge-lg">{admin.nik}</span>
        </td>
        <td className="text-base">{admin.jenis_kelamin == 'male' ? 'Laki-laki' : 'Perempuan'}</td>
        <th>
          <button type="button" onClick={onClickGetId} id={admin.id} className="btn btn-outline btn-sm capitalize rounded-full">
            detail
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

  function onClickGetId(e) {
    const admin_id = e.target.id;
    const token_id = user.w_token_id;

    dispatch(getAdminDetail({ admin_id, token_id }));

    document.getElementById('modal-detail').showModal();

    dispatch(reset());
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
      <ModalUpdateAdmin data={admin} isLoaded={isSuccessfull} form={formUpdate} setForm={setFormUpdate} onSubmit={onUpdateForm} onConfirmDelete={onDelete} />
    </div>
  );
}

export default ManageAdmin;

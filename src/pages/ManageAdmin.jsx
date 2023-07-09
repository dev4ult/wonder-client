import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAdmins, getAdminDetail, reset } from '../features/user/userSlice';

import NavbarStick from '../components/navbar/NavbarStick';
import DefaultUserPhoto from '../components/DefaultUserPhoto';
import SkeletonTableData from '../components/SkeletonTableData';

function ManageAdmin() {
  const { users, isSuccessfull, admin } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [admins, setAdmins] = useState(users);

  function onClickGetId(e) {
    const admin_id = e.target.id;
    const token_id = user.w_token_id;

    dispatch(getAdminDetail({ admin_id, token_id }));

    document.getElementById('modal').showModal();

    dispatch(reset());
  }

  useEffect(() => {
    dispatch(getAdmins(user.w_token_id));
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (users.length != 0) {
      setAdmins(users);
    }
  }, [users]);

  const DialogModal = () => {
    return (
      <dialog id="modal" className="modal">
        <form method="dialog" className="modal-box">
          {admin != null && isSuccessfull ? (
            <>
              <h3 className="font-bold text-lg">{admin.nama_lengkap}</h3>
              <p className="py-4">Press ESC key or click the button below to close</p>
              <div className="modal-action">
                <button className="btn">Close</button>
              </div>
            </>
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
        <td>{admin.alamat}</td>
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
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Nama </th>
              <th>NIK</th>
              <th>Jenis Kelamin</th>
              <th>Alamat</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{admins.length != 0 ? TableDataAdmins() : SkeletonTableDatas()}</tbody>
        </table>
      </div>
      {DialogModal()}
    </div>
  );
}

export default ManageAdmin;

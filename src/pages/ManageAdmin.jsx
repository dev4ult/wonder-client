import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAdmins } from '../features/user/userSlice';

import NavbarStick from '../components/navbar/NavbarStick';
import DefaultUserPhoto from '../components/DefaultUserPhoto';
import SkeletonTableData from '../components/SkeletonTableData';

function ManageAdmin() {
  const { users, isSuccessfull } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdmins(user.w_token_id));
  }, []);

  function tableDataAdmins() {
    return users.map((admin) => (
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <DefaultUserPhoto isRoundedFull={false} className="rounded" size="2rem" />
            </div>
            <div>
              <div className="font-bold">{admin.nama_lengkap}</div>
              <div className="text-sm opacity-50">guest@example.com</div>
            </div>
          </div>
        </td>
        <td>
          <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
        </td>
        <td>Purple</td>
        <th>
          <button className="btn btn-outline btn-xs">details</button>
        </th>
      </tr>
    ));
  }

  function skeletonTableDatas() {
    let list = [];
    for (let i = 0; i < 10; i++) {
      list.push(<SkeletonTableData key={i} />);
    }
    return <>{list}</>;
  }

  return (
    <div>
      <NavbarStick displaySearch={false} />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Nama / Email</th>
              <th>Bio</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{isSuccessfull ? tableDataAdmins() : skeletonTableDatas()}</tbody>
          <tfoot>
            <tr>
              <th>Nama / Email</th>
              <th>Bio</th>
              <th>Role</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default ManageAdmin;

import NavbarStick from '../components/navbar/NavbarStick';
import DefaultUserPhoto from '../components/DefaultUserPhoto';

function ManageUser() {
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
          <tbody>
            <tr>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <DefaultUserPhoto isRoundedFull={false} className="rounded" size="2rem" />
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
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
          </tbody>
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

export default ManageUser;

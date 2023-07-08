import { useSelector } from 'react-redux';

import NavbarStick from '../components/navbar/NavbarStick';
import FeatureBox from '../components/FeatureBox';

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="relative">
      <NavbarStick displaySearch={false} />
      <div className="mt-7">
        <div>
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <div className="my-5 grid grid-flow-row grid-cols-3 gap-5">
            {user != null && user.role == 'superadmin' && <FeatureBox title="Manajemen Admin" description="Lorem ipsum dolor sit amet consectetur adipisicing." linkTo="/manage_admin" />}
            <FeatureBox title="Artikel" description="Lorem ipsum dolor sit amet consectetur adipisicing." linkTo="/manage_article" />
            <FeatureBox title="Objek Wisata" description="Lorem ipsum dolor sit amet consectetur adipisicing." linkTo="/new_travelspot" />
            <FeatureBox title="Kriteria Penilaian" description="Lorem ipsum dolor sit amet consectetur adipisicing." linkTo="/manage_criteria" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

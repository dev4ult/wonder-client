import { useSelector, useDispatch } from 'react-redux';

import { resetSpots } from '../features/travelspot/travelSpotSlice';

import NavbarStick from '../components/navbar/NavbarStick';
import FeatureBox from '../components/FeatureBox';

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="relative">
      <NavbarStick />
      <div className="mt-7">
        <div>
          <div className="my-5 grid grid-flow-row grid-cols-3 gap-5">
            {user != null && user.role == 'superadmin' && <FeatureBox title="Admin" description="Lorem ipsum dolor sit amet consectetur adipisicing." linkTo="/manage_admin" />}
            {/* <FeatureBox title="Artikel" description="Lorem ipsum dolor sit amet consectetur adipisicing." linkTo="/manage_article" /> */}
            <FeatureBox title="Wisata" description="Lorem ipsum dolor sit amet consectetur adipisicing." linkTo="/manage_travelspot" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

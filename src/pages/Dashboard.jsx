import NavbarStick from '../components/navbar/NavbarStick';
import FeatureBox from '../components/FeatureBox';

function Dashboard() {
  return (
    <div className="relative">
      <NavbarStick displaySearch={false} />
      <div className="mt-7">
        <div>
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <div className="my-5 grid grid-flow-row grid-cols-3 gap-5">
            <FeatureBox title="Manajemen User" description="Lorem ipsum dolor sit amet consectetur adipisicing." linkTo="/manage_user" />
            <FeatureBox title="Artikel" description="Lorem ipsum dolor sit amet consectetur adipisicing." linkTo="/manage_user" />
            <FeatureBox title="Objek Wisata" description="Lorem ipsum dolor sit amet consectetur adipisicing." linkTo="/new_travelspot" />
            <FeatureBox title="Kriteria Penilaian" description="Lorem ipsum dolor sit amet consectetur adipisicing." linkTo="/manage_user" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

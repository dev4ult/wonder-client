import Navbar from '../components/Navbar';
import NoImage from '../images/no-image.jpg';

function DiscoverDetail() {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-200">
        <img src={NoImage} alt="ASD" className="h-[30rem] object-cover mx-auto" />
      </div>
      <div>
        <h1 className="font-semibold text-2xl">Judul</h1>
      </div>
    </div>
  );
}

export default DiscoverDetail;

import Navbar from '../components/Navbar';
import Card from '../components/Card';

import BeachImg from '../images/beach.jpg';

function cards() {
  let cards = [];
  for (let i = 0; i < 10; i++) {
    cards.push(<Card name="Beach asijdis" linkTo="/discover_detail" description="Lorem ipsum dolor sit amet, consectetur adipisicing." />);
  }

  return <>{cards}</>;
}

function Discover() {
  return (
    <div>
      <Navbar />
      <div className="mb-5">
        <h1 className="text-2xl font-semibold">Objek Wisata</h1>
        <p className="">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis assumenda porro dolores dolor modi esse</p>
      </div>
      <div className="flex gap-5 flex-wrap">{cards()}</div>
    </div>
  );
}

export default Discover;

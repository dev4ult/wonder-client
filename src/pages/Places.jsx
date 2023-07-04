import Navbar from '../components/Navbar';
import Card from '../components/Card';
import SmallCard from '../components/SmallCard';
import CategoryButton from '../components/CategoryButton';

function cards() {
  let cards = [];
  for (let i = 0; i < 10; i++) {
    cards.push(<Card name="Beach asijdis" linkTo="/discover_detail" description="Lorem ipsum dolor sit amet, consectetur adipisicing." />);
  }

  return <>{cards}</>;
}

function Places() {
  return (
    <>
      <Navbar />
      <div className="mt-7 flex items-start gap-10 justify-between">
        <div className="grid grid-flow-row grid-cols-2 gap-5 max-w-xl">{cards()}</div>
        <aside className="sticky top-7">
          <input type="text" placeholder="Cari Wisata..." className="input input-sm border-gray-300 rounded-full" />
          <div className="py-7 border-b-2 ">
            <h3 className="text-black/30 font-medium mb-2 text-sm">Filter</h3>
            <div className="flex flex-wrap gap-2">
              <CategoryButton>Indonesia</CategoryButton>
              <CategoryButton>Internasional</CategoryButton>
              <CategoryButton>Jalan jalan</CategoryButton>
              <CategoryButton>Solo Travel</CategoryButton>
            </div>
          </div>
          <div className="py-7">
            <h3 className="text-black/30 font-medium mb-2 text-sm">Rekomendasi</h3>
            <div className="grid grid-flow-row grid-cols-2 gap-5">
              <SmallCard title="Pulau Melinjo" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit..." date="26 Jan 2023" linkTo="/place_detail" />
              <SmallCard title="Kawah Putih" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit..." date="" linkTo="/place_detail" />
              <SmallCard title="Pantai Indah Kapuk" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit..." date="" linkTo="/place_detail" />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default Places;

import Navbar from '../components/Navbar';
import ArticleCard from '../components/ArticleCard';
import CategoryButton from '../components/CategoryButton';

function cards() {
  let cards = [];
  for (let i = 0; i < 10; i++) {
    cards.push(<ArticleCard author="Nibras" title="Beach asijdis" linkTo="/article_detail" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero neque qua..." />);
  }

  return <>{cards}</>;
}

function Article() {
  return (
    <>
      <Navbar />
      <div className="mt-7 flex items-start gap-10 justify-between">
        <aside className="sticky top-7">
          <input type="text" placeholder="Cari Artikel..." className="input input-sm border-2 border-gray-300 rounded-full" />
          <div className="py-7 border-b-2 ">
            <h3 className="text-black/30 ml-2 mb-2 text-sm">Filter</h3>
            <div className="flex flex-wrap gap-2">
              <CategoryButton>Indonesia</CategoryButton>
              <CategoryButton>Internasional</CategoryButton>
              <CategoryButton>Jalan jalan</CategoryButton>
              <CategoryButton>Solo Travel</CategoryButton>
            </div>
          </div>
          <div className="py-7">
            <h3 className="font-medium">Banyak Disukai</h3>
          </div>
        </aside>
        <div className="flex flex-col gap-3">{cards()}</div>
      </div>
    </>
  );
}

export default Article;

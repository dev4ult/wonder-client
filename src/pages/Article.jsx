import Navbar from '../components/Navbar';
import Card from '../components/Card';

function cards() {
  let cards = [];
  for (let i = 0; i < 10; i++) {
    cards.push(<Card name="Beach asijdis" linkTo="/article_detail" description="Lorem ipsum dolor sit amet, consectetur adipisicing." />);
  }

  return <>{cards}</>;
}

function Article() {
  return (
    <div>
      <Navbar />
      <div className="mb-5">
        <h1 className="text-2xl font-semibold">Artikel</h1>
        <p className="">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis assumenda porro dolores dolor modi esse</p>
      </div>
      <div className="flex flex-wrap gap-5">{cards()}</div>
    </div>
  );
}

export default Article;

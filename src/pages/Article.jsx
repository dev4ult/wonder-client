import Navbar from '../components/Navbar';
import Card from '../components/Card';

function cards() {
  let cards = [];
  for (let i = 0; i < 10; i++) {
    cards.push(<Card name="Beach asijdis" description="Lorem ipsum dolor sit amet, consectetur adipisicing." />);
  }

  return <>{cards}</>;
}

function Article() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap gap-5">{cards()}</div>
    </div>
  );
}

export default Article;

import Navbar from '../components/Navbar';
import CardWidthFull from '../components/CardWidthFull';

function cards() {
  let cards = [];
  for (let i = 0; i < 10; i++) {
    cards.push(
      <CardWidthFull
        title="Beach asijdis"
        linkTo="/article_detail"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero neque quam rerum totam. Architecto amet aperiam illum officiis sapiente voluptates, fuga natus id! Explicabo, veniam?"
      />
    );
  }

  return <>{cards}</>;
}

function Article() {
  return (
    <>
      <Navbar />
      <div className="mt-7">
        <div className="mb-7">
          <h1 className="text-2xl font-semibold">Artikel</h1>
          <p className="">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis assumenda porro dolores dolor modi esse</p>
        </div>
        <div className="flex flex-wrap gap-5">{cards()}</div>
      </div>
    </>
  );
}

export default Article;

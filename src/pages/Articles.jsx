import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getArticles, reset } from '../features/article/articleSlice';

import Navbar from '../components/navbar/Navbar';

import ArticleCard from '../components/card/ArticleCard';
import SkeletonArticleCard from '../components/card/SkeletonArticleCard';
import SmallCard from '../components/card/SmallCard';
import SkeletonSmallCard from '../components/card/SkeletonSmallCard';

import CategoryButton from '../components/CategoryButton';

function Articles() {
  const { articles, isLoading, isSuccessfull } = useSelector((state) => state.article);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());

    dispatch(getArticles());
  }, []);

  function skeletonSmallCards() {
    let list = [];
    for (let i = 0; i < 3; i++) {
      list.push(<SkeletonSmallCard key={i} />);
    }

    return <>{list}</>;
  }

  function articleCards() {
    let list = [];
    for (let i = 0; i < 10; i++) {
      list.push(<ArticleCard author="Nibras" key={i} title="Beach asijdis" linkTo="/article_detail" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero neque qua..." />);
    }

    return <>{list}</>;
  }

  function skeletonArticleCards() {
    let list = [];
    for (let i = 0; i < 15; i++) {
      list.push(<SkeletonArticleCard key={i} />);
    }

    return <>{list}</>;
  }

  return (
    <>
      <Navbar />
      <div className="mt-7 flex items-start gap-10 justify-between">
        <aside className="sticky top-7">
          <input type="text" placeholder="Cari Artikel..." className="input input-sm border-2 border-gray-300 rounded-full" />
          <div className="py-7 border-b-2 ">
            <h3 className="text-black/30 mb-2 text-sm">Filter</h3>
            <div className="flex flex-wrap gap-2">
              <CategoryButton>Indonesia</CategoryButton>
              <CategoryButton>Internasional</CategoryButton>
              <CategoryButton>Jalan jalan</CategoryButton>
              <CategoryButton>Solo Travel</CategoryButton>
            </div>
          </div>
          <div className="py-7">
            <h3 className="font-medium text-sm text-black/30 mb-2">Banyak Disukai</h3>
            <div className="grid grid-flow-row grid-cols-2 gap-5">{isSuccessfull ? '' : skeletonSmallCards()}</div>
          </div>
        </aside>
        <div className="flex flex-col gap-3">{isSuccessfull ? '' : skeletonArticleCards()}</div>
      </div>
    </>
  );
}

export default Articles;

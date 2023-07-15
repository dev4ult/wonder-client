import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { getTravelSpotDetail, reset } from '../features/travelspot/travelSpotSlice';

import NavbarStick from '../components/navbar/NavbarStick';
import Comment from '../components/Comment';
import SkeletonPost from '../components/skeleton/SkeletonPost';
import BlogContent from '../components/BlogContent';

import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';
import { BsFillPersonFill, BsSendFill } from 'react-icons/bs';
import NoImage from '../images/no-image.webp';

function TravelSpotDetail() {
  const { travelSpots, isLoading, isSuccessfull } = useSelector((state) => state.travelspot);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(reset());

    dispatch(getTravelSpotDetail(id));
  }, []);

  return (
    <>
      <NavbarStick />
      {isSuccessfull ? (
        <div className="mx-auto max-w-3xl mt-10">
          <div className="mx-auto max-w-3xl mt-10">
            <div className="bg-gray-200">
              <img src={NoImage} alt="ASD" className="h-[30rem] object-cover mx-auto" />
            </div>
            <h1 id="article-title" className="font-extrabold text-4xl my-4 leading-[3rem]">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </h1>
            <div className="flex justify-between gap-5 my-10 border-y-2 py-3 text-black/50">
              <div className="flex gap-5">
                <div className="flex items-center gap-2 hover:text-black cursor-pointer">
                  <AiOutlineHeart title="Like" size="1.7rem" />
                  <span className="text-lg">0</span>
                </div>
                <a href="#comment-section" className="flex items-center gap-2 hover:text-black cursor-pointer">
                  <AiOutlineComment title="Comment" size="1.7rem" />
                  <span className="text-lg">3</span>
                </a>
              </div>
              <Link to={'/profile'} className="flex gap-2 items-center hover:text-black cursor-pointer">
                <div className="p-1 rounded-full bg-black/10 overflow-hidden">
                  <BsFillPersonFill size="1.3rem" />
                </div>
                <span className="font-medium  text-lg ">NibrasAlyassar</span>
              </Link>
            </div>
            <div id="article-content" className="mt-4 text-lg">
              <div>
                <p className="leading-8">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti atque nostrum nam magnam, non harum perspiciatis optio ea dignissimos velit in distinctio soluta architecto molestiae pariatur quas nihil sunt suscipit
                  consequatur nesciunt excepturi dolor? Vero et alias ratione molestias? Maxime vitae laborum fugiat numquam est eius harum hic voluptatem quo.
                </p>
              </div>
              <div>
                <h2 className="font-bold text-2xl mt-10 mb-3">Lorem, ipsum dolor sit amet consectetur adipisicing.</h2>
                <p className="leading-8">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo earum rerum et amet, aut, autem aliquid asperiores excepturi incidunt doloremque sunt quasi. A velit ut voluptatem labore quam amet aspernatur numquam ullam
                  facilis vel rerum corrupti fugiat, deserunt atque deleniti explicabo placeat cumque nostrum iure distinctio similique magni ratione suscipit. At rem qui soluta repudiandae quaerat esse asperiores aspernatur cupiditate!
                  Iusto architecto ullam voluptatum nemo nobis blanditiis a, harum totam aperiam nulla ipsum non vel. Reiciendis deserunt qui possimus voluptas reprehenderit nisi, magnam, quo quam deleniti sapiente, ducimus expedita iste
                  porro accusamus consequatur nihil explicabo fuga numquam enim! Non, in!
                </p>
              </div>
              <div className="bg-gray-200 my-5">
                <img src={NoImage} alt="no" className="mx-auto h-[30rem]" />
              </div>
              <div>
                <h2 className="font-bold text-2xl mt-10 mb-3">Lorem, ipsum dolor sit amet consectetur adipisicing.</h2>
                <p className="leading-8">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo earum rerum et amet, aut, autem aliquid asperiores excepturi incidunt doloremque sunt quasi. A velit ut voluptatem labore quam amet aspernatur numquam ullam
                  facilis vel rerum corrupti fugiat, deserunt atque deleniti explicabo placeat cumque nostrum iure distinctio similique magni ratione suscipit. At rem qui soluta repudiandae quaerat esse asperiores aspernatur cupiditate!
                </p>
              </div>
            </div>
            <div id="comment-section" className="mt-8 py-8 border-t-2 border-neutral">
              <div className="flex gap-3">
                <input type="text" className="input border-neutral input-md rounded-full w-full text-lg" placeholder="Beri komentar..." />
                <button className="btn btn-neutral btn-md rounded-full text-lg capitalize">
                  <BsSendFill size="1.2rem" />
                </button>
              </div>
              <div className="mt-8 py-8">
                <h2 className="text-xl font-bold mb-3">Komentar</h2>
                <div className="flex flex-col gap-7 mt-7 pl-8 border-l-2">
                  <Comment username="Nibras" date="26 Jan 2023" comment="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo earum rerum et amet, aut" />
                  <Comment username="Nibras" date="26 Jan 2023" comment="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo earum rerum et amet, aut" />
                  <Comment username="Nibras" date="26 Jan 2023" comment="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo earum rerum et amet, aut" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SkeletonPost />
      )}
    </>
  );
}

export default TravelSpotDetail;

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getTravelSpotDetail, reset as resetTravelspotState } from '../features/travelspot/travelSpotSlice';
import { likeAPost, reset as resetLikeState } from '../features/like/likeSlice';
import { commentAPost, reset as resetCommentState } from '../features/comment/commentSlice';

import NavbarStick from '../components/navbar/NavbarStick';
import Comment from '../components/Comment';
import SkeletonPost from '../components/skeleton/SkeletonPost';
import BlogContent from '../components/BlogContent';

import { AiOutlineHeart, AiOutlineComment, AiFillHeart } from 'react-icons/ai';
import { BsFillPersonFill, BsSendFill } from 'react-icons/bs';
import NoImage from '../images/no-image.webp';

const PostPictureUrl = import.meta.env.VITE_POSTPICTUREURL;
const UserPhotoUrl = import.meta.env.VITE_USERPHOTOURL;

function TravelSpotDetail() {
  const { travelSpot, isSuccessfull: successGetTravelspot } = useSelector((state) => state.travelspot);
  const { isSuccessfull: successLike, message: likeMessage } = useSelector((state) => state.like);
  const { isSuccessfull: successComment, message: commentMessage } = useSelector((state) => state.comment);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [travelSpotData, setTravelSpotData] = useState(null);

  const [liked, setLiked] = useState(false);
  const [totalLiked, setTotalLiked] = useState(0);

  const [comment, setComment] = useState('');

  const { id: travelspot_id } = useParams();

  useEffect(() => {
    if (user != null) {
      dispatch(getTravelSpotDetail({ travelspot_id, token_id: user.w_token_id }));
    } else {
      dispatch(getTravelSpotDetail({ travelspot_id }));
    }

    dispatch(resetTravelspotState());
  }, []);

  useEffect(() => {
    if (successLike && likeMessage != '') {
      const token_id = user.w_token_id;

      dispatch(getTravelSpotDetail({ travelspot_id, token_id }));
      dispatch(resetTravelspotState());
    }
  }, [likeMessage, successLike]);

  useEffect(() => {
    if (successComment && commentMessage != '') {
      const token_id = user.w_token_id;

      dispatch(getTravelSpotDetail({ travelspot_id, token_id }));
      dispatch(resetTravelspotState());
    }
  }, [commentMessage, successComment]);

  useEffect(() => {
    if (travelSpot != null && successGetTravelspot) {
      setTravelSpotData(travelSpot);
      setLiked(travelSpot.is_like_user != undefined && travelSpot.is_like_user);
      setTotalLiked(travelSpot.jumlah_like);
    }
  }, [travelSpot, successGetTravelspot]);

  function isLiked() {
    return travelSpotData.is_like_user != undefined && travelSpotData.is_like_user;
  }

  function timestampToDate(timestamp) {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  function submitComment(e) {
    e.preventDefault();

    if (comment == '') {
      toast.warning('Komentar tidak bisa kosong!');
    } else if (user == null) {
      toast.warning('Harus login terlebih dahulu sebelum berkomentar');
    } else {
      const token_id = user.w_token_id;

      dispatch(commentAPost({ comment, post_type: 'discover', post_id: travelspot_id, token_id }));
      dispatch(resetCommentState());

      setComment('');
    }
  }

  return (
    <>
      <NavbarStick />
      {travelSpotData != null ? (
        <div className="mx-auto max-w-3xl mt-10">
          <div className="mx-auto max-w-3xl mt-10">
            <div className="bg-gray-200">
              <img src={travelSpotData.foto != '' ? `${PostPictureUrl}/${travelSpotData.foto}` : NoImage} alt="ASD" className="h-[30rem] object-cover mx-auto" />
            </div>
            <h1 id="article-title" className="font-extrabold text-4xl my-4 leading-[3rem]">
              {travelSpotData.nama}
            </h1>
            <div className="flex justify-between gap-5 my-10 border-y-2 py-3 text-black/50">
              <div className="flex gap-5">
                <button
                  type="button"
                  onClick={() => {
                    if (user != null) {
                      const post_id = travelSpotData.id;

                      const token_id = user.w_token_id;
                      const liked = isLiked();

                      setLiked(!liked);
                      setTotalLiked((prev) => (liked ? prev - 1 : prev + 1));

                      dispatch(likeAPost({ like: !liked, post_type: 'discover', post_id, token_id }));

                      dispatch(resetLikeState());
                    } else {
                      toast.warning('Harus login terlebih dahulu sebelum menyukai wisata ini agar tersimpan di histori-mu');
                    }
                  }}
                  className={`flex items-center gap-2 ${liked ? 'text-red-500' : 'hover:text-black'} cursor-pointer`}
                >
                  {liked ? <AiFillHeart title="Like" size="1.7rem" /> : <AiOutlineHeart title="Like" size="1.7rem" />}

                  <span className="text-lg">{totalLiked}</span>
                </button>
                <a href="#comment-section" className="flex items-center gap-2 hover:text-black cursor-pointer">
                  <AiOutlineComment title="Comment" size="1.7rem" />
                  <span className="text-lg">{travelSpotData.jumlah_komen}</span>
                </a>
              </div>
              <Link to={'/profile'} className="flex gap-2 items-center hover:text-black cursor-pointer">
                <div className="p-1 rounded-full bg-black/10 overflow-hidden">
                  <BsFillPersonFill size="1.3rem" />
                </div>
                <span className="font-medium  text-lg ">NibrasAlyassar</span>
              </Link>
            </div>
            <div id="article-content" className="mt-4">
              <BlogContent>{travelSpotData.konten_blog}</BlogContent>
            </div>
            <div id="comment-section" className="mt-8 py-8 border-t-2 border-neutral">
              <form onSubmit={submitComment} className="flex gap-3">
                <input
                  type="text"
                  onChange={(e) => {
                    const { value } = e.target;
                    setComment(value);

                    if (e.key == 'Enter') {
                      if (value == '') {
                        toast.warning('Komentar tidak bisa kosong!');
                      } else if (user == null) {
                        toast.warning('Harus login terlebih dahulu sebelum berkomentar');
                      } else {
                        const token_id = user.w_token_id;
                        dispatch(commentAPost({ comment, post_type: 'discover', post_id: travelspot_id, token_id }));
                        dispatch(resetCommentState());
                      }
                    }
                  }}
                  value={comment}
                  className="input border-neutral input-md rounded-full w-full text-lg"
                  placeholder="Beri komentar..."
                />
                <button type="submit" className="btn btn-neutral btn-md rounded-full text-lg capitalize">
                  <BsSendFill size="1.2rem" />
                </button>
              </form>
              <div className="mt-8 py-8">
                <h2 className="text-xl font-bold mb-3">Komentar</h2>
                <div className="flex flex-col gap-7 mt-7 pl-8 border-l-2">
                  {travelSpotData.comments.length != 0 ? (
                    travelSpotData.comments.map((comment, index) => (
                      <Comment
                        key={index}
                        profileImage={
                          comment.foto != '' ? (
                            <div className="h-fit rounded-full overflow-hidden">
                              <img src={`${UserPhotoUrl}/${comment.foto}`} className="w-12 bg-cover" alt="profil" />
                            </div>
                          ) : (
                            ''
                          )
                        }
                        username={comment.username}
                        date={timestampToDate(comment.created_at)}
                        comment={comment.komentar}
                      />
                    ))
                  ) : (
                    <p className="text-black/50">Belum ada Komentar</p>
                  )}
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

import SkeletonComment from './SkeletonComment';
import { BsSendFill } from 'react-icons/bs';

function SkeletonPost() {
  function LoopParagraphLine(lines) {
    const paragraphs = [];
    for (let i = 0; i < lines; i++) {
      paragraphs.push(<div className="animate-pulse bg-gray-300 rounded-full w-full h-3 my-5"></div>);
    }

    return <>{paragraphs}</>;
  }

  function SkeletonComments() {
    const comments = [];
    for (let i = 0; i < 3; i++) {
      comments.push(<SkeletonComment />);
    }

    return <>{comments}</>;
  }

  return (
    <div className="mx-auto max-w-3xl mt-10">
      <div className="mx-auto max-w-3xl mt-10">
        <div className="animate-pulse bg-gray-300 h-[30rem] w-full rounded"></div>
        <div className="animate-pulse bg-gray-300 h-8 w-full rounded-full mt-7"></div>
        <div className="animate-pulse bg-gray-300 h-8 w-3/4 mt-5 mb-7 rounded-full"></div>

        <div className="flex justify-between gap-5 my-10 border-y-2 py-3">
          <div className="flex gap-5">
            <div className="flex items-center gap-2">
              <div className="animate-pulse bg-gray-300 w-7 h-7 rounded-full"></div>
              <div className="animate-pulse bg-gray-300 h-2 rounded w-5"></div>
            </div>
            <a href="#comment-section" className="flex items-center gap-2">
              <div className="animate-pulse bg-gray-300 w-7 h-7 rounded-full"></div>
              <div className="animate-pulse bg-gray-300 h-2 rounded w-5"></div>
            </a>
          </div>
          <div className="flex gap-2 items-center ">
            <div className="animate-pulse bg-gray-300 w-7 h-7 rounded-full"></div>
            <div className="animate-pulse bg-gray-300 h-2 rounded w-20"></div>
          </div>
        </div>
        <div className="mt-4">
          {LoopParagraphLine(4)}
          <div className="animate-pulse bg-gray-300 rounded-full w-1/2 h-3 my-5"></div>
          <div className="mt-8">
            <div className="animate-pulse bg-gray-300 rounded-full w-3/4 h-6 mb-6"></div>
            {LoopParagraphLine(9)}
            <div className="animate-pulse bg-gray-300 rounded-full w-1/2 h-3 my-5"></div>
          </div>
          <div className="animate-pulse bg-gray-300 h-[30rem] w-full rounded"></div>
          <div className="mt-8">
            <div className="animate-pulse bg-gray-300 rounded-full w-3/4 h-6 mb-6"></div>
            {LoopParagraphLine(7)}
            <div className="animate-pulse bg-gray-300 rounded-full w-1/2 h-3 my-5"></div>
          </div>
        </div>
        <div className="mt-8 py-8 border-t-2 border-neutral">
          <div className="flex gap-3">
            <input type="text" className="input border-neutral input-md rounded-full w-full text-lg" placeholder="Beri komentar..." />
            <button className="btn btn-neutral btn-md rounded-full text-lg capitalize">
              <BsSendFill size="1.2rem" />
            </button>
          </div>
          <div className="mt-8 py-8">
            <h2 className="text-xl font-bold mb-3">Komentar</h2>
            <div className="flex flex-col gap-7 mt-7 pl-8 border-l-2">{SkeletonComments()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonPost;

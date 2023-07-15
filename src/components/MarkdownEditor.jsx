import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function MarkdownEditor({ className = '', name, onChange, value }) {
  const [previewTab, setPreviewTab] = useState(false);

  const Heading1 = ({ children }) => <h1 className="font-bold text-2xl mb-3 mt-7">{children}</h1>;
  const Paragraph = ({ children }) => <p className="leading-8 text-lg">{children}</p>;

  return (
    <div className={className}>
      <div className="flex gap-5 justify-between mb-2 items-end">
        <label htmlFor={name} className="text-sm text-black/30">
          Konten Blog
        </label>
        <label className="swap">
          <input type="checkbox" />
          <div className="btn btn-xs rounded-full btn-neutral capitalize swap-on" onClick={setPreviewTab.bind(null, true)}>
            Edit Draft
          </div>
          <div className="btn btn-xs rounded-full btn-neutral capitalize swap-off" onClick={setPreviewTab.bind(null, false)}>
            Preview
          </div>
        </label>
      </div>
      <textarea id={name} name={name} onChange={onChange} className={`${previewTab ? 'hidden' : undefined} w-full rounded textarea border-2 text-base my-0 border-gray-300 h-[30rem]`} value={value}></textarea>
      <ReactMarkdown
        children={value}
        className={`${!previewTab ? 'hidden' : undefined} p-3 rounded border-2 border-gray-300 h-[30rem] overflow-y-auto`}
        components={{ h1: Heading1, p: Paragraph }}
        remarkPlugins={[remarkGfm]}
        skipHtml={true}
      />
    </div>
  );
}

export default MarkdownEditor;

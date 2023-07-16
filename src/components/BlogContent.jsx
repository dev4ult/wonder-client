import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function BlogContent({ children }) {
  const Heading1 = ({ children }) => <h1 className="font-bold text-2xl mb-3 mt-7">{children}</h1>;
  const Heading2 = ({ children }) => <h1 className="font-bold text-xl mb-3 mt-7">{children}</h1>;
  const Heading3 = ({ children }) => <h1 className="font-semibold text-lg mb-3 mt-7">{children}</h1>;
  const Paragraph = ({ children }) => <p className="leading-8 text-lg">{children}</p>;

  return <ReactMarkdown children={children} remarkPlugins={[remarkGfm]} skipHtml={true} components={{ h1: Heading1, h2: Heading2, h3: Heading3, p: Paragraph }} />;
}

export default BlogContent;

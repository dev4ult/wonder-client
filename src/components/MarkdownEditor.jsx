import { useState } from 'react';
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

function MarkdownEditor({ className = '', name, onChange, value }) {
  const [selectedTab, setSelectedTab] = useState('write');

  return (
    <div className={className}>
      <ReactMde
        value={value}
        name={name}
        onChange={onChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) => Promise.resolve(<ReactMarkdown children={markdown} />)}
        childProps={{
          writeButton: {
            tabIndex: -1,
          },
        }}
      />
    </div>
  );
}

export default MarkdownEditor;

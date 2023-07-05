import React from 'react';

function InputGroup({ label, name, type = 'text', placeholder = '...', value, isTextArea = false }) {
  return (
    <div className="form-control">
      <label className="label-text text-black/30" htmlFor={name}>
        {label}
      </label>
      {isTextArea ? (
        <textarea name={name} id={name} className="textarea border-gray-300 text-base resize-none h-32">
          {value}
        </textarea>
      ) : (
        <input type={type} name={name} id={name} placeholder={placeholder} className="input border-gray-300" value={value} />
      )}
    </div>
  );
}

export default InputGroup;

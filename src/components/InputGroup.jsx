import React from 'react';

function InputGroup({ label, name, type = 'text', placeholder = '...', onChange, value, isTextArea = false, required = false, disabled = false, autoComplete = '' }) {
  return (
    <div className="form-control">
      <label className="label-text text-black/30" htmlFor={name}>
        {label}
      </label>
      {isTextArea ? (
        <textarea name={name} id={name} onChange={onChange} placeholder={placeholder} value={value} className="textarea border-gray-300 text-base resize-none h-32" disabled={disabled} required={required}></textarea>
      ) : (
        <input type={type} name={name} autoComplete={autoComplete} id={name} onChange={onChange} placeholder={placeholder} className="input border-gray-300" value={value} disabled={disabled} required={required} />
      )}
    </div>
  );
}

export default InputGroup;

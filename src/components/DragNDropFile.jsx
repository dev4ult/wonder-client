import { FileUploader } from 'react-drag-drop-files';

function DragNDropFIle({ label, name, onChange, isMultiple = false, types = ['JPG', 'PNG'], isRequired = true }) {
  return (
    <>
      <label htmlFor={name} className="text-sm text-black/30">
        {label}
      </label>
      <div className="p-12 border-2 rounded flex justify-center">
        <FileUploader name={name} handleChange={onChange} classes="drop_area drop_zone" multiple={isMultiple} types={types} required={isRequired} />
      </div>
    </>
  );
}

export default DragNDropFIle;

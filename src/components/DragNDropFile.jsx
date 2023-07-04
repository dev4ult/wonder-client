function DragNDropFIle({ label, name }) {
  return (
    <>
      <label htmlFor={name} className="text-sm text-black/30">
        {label}
      </label>
      <div className="rounded border-2 border-gray-300 border-dashed p-10 flex flex-col gap-3 items-center">
        <label htmlFor={name} className="text-xl font-medium">
          Drag and Drop file here
        </label>
        <span className="text-xl font-medium text-black/30">or</span>
        <label htmlFor={name} className="btn btn-neutral">
          browse file
        </label>
        <input type="file" id={name} name={name} multiple className="hidden" />
      </div>
    </>
  );
}

export default DragNDropFIle;

function SelectGroup({ label, name, optionList, onChange, value, required = false }) {
  const options = (optionList) => {
    return optionList.map((option) => {
      return (
        <option key={`${option.id}-${option.name}`} value={option.id}>
          {option.name}
        </option>
      );
    });
  };

  return (
    <div className="form-control">
      <label htmlFor={name} className="text-sm text-black/30">
        {label}
      </label>
      <select id={name} name={name} onChange={onChange} value={value} className="select border-gray-300" required={required}>
        <option value="" disabled>
          Pilih {label}
        </option>
        {optionList.length != 0 ? (
          options(optionList)
        ) : (
          <option disabled value="0">
            Fetching data...
          </option>
        )}
      </select>
    </div>
  );
}

export default SelectGroup;

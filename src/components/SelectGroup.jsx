function SelectGroup({ label, name, optionList }) {
  const options = (optionList) => {
    let elOptions = [];
    for (let i = 0; i < optionList; i++) {
      const { value, output } = optionList[0];
      elOptions.push(
        <option className="" value={value}>
          {output}
        </option>
      );
    }
    return <>elOptions</>;
  };

  return (
    <div className="form-control">
      <label htmlFor={name} className="text-sm text-black/30">
        {label}
      </label>
      <select id={name} name={name} className="select border-gray-300">
        <option disabled>Pilih</option>
        {options(optionList)}
      </select>
    </div>
  );
}

export default SelectGroup;

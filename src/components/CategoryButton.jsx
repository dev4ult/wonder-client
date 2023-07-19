function CategoryButton({ id, name, selected, onClick }) {
  return (
    <button type="button" id={id} name={name} onClick={onClick} className={`btn btn-sm capitalize btn-neutral ${selected ? undefined : 'btn-outline'}  rounded-full`}>
      {name}
    </button>
  );
}

export default CategoryButton;

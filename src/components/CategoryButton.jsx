function CategoryButton({ children, selected, onClick }) {
  return (
    <button type="button" onClick={onClick} className={`btn btn-sm capitalize btn-neutral ${selected ? undefined : 'btn-outline'}  rounded-full`}>
      {children}
    </button>
  );
}

export default CategoryButton;

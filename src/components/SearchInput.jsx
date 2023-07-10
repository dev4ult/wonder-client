import { CiSearch } from 'react-icons/ci';

function SearchInput({ placeholder = 'Cari...', size = 'md', onChange, value }) {
  return (
    <div className="relative w-fit">
      <input type="text" placeholder={placeholder} onChange={onChange} value={value} className={`input input-${size} text-base font-normal border-gray-300 rounded-full peer`} />
      <CiSearch className={`absolute ${size == 'sm' ? 'right-3' : 'right-5'} top-1/2 -translate-y-1/2 text-black/30 peer-focus:text-black`} size={size == 'sm' ? '1.3rem' : '1.8rem'} />
    </div>
  );
}

export default SearchInput;

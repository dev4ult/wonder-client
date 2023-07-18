import { CiSearch } from 'react-icons/ci';

function SearchInput({ placeholder = 'Cari...', size = 'md', onChange, onKeyDown = () => {}, value, onClick }) {
  return (
    <div className="relative w-fit">
      <input type="text" placeholder={placeholder} onChange={onChange} onKeyDown={onKeyDown} value={value} className={`input input-${size} ${size == 'sm' ? 'text-sm' : 'text-base'} font-normal border-gray-300 rounded-full peer`} />
      <CiSearch onClick={onClick} className={`absolute ${size == 'sm' ? 'right-3' : 'right-5'} cursor-pointer top-1/2 -translate-y-1/2 text-black/30 peer-focus:text-black`} size={size == 'sm' ? '1.3rem' : '1.8rem'} />
    </div>
  );
}

export default SearchInput;

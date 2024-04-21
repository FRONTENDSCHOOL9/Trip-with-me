import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const onClickDetail = () => {
    navigate('/product/search');
  };

  const handleChange = e => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    if (searchValue.trim() !== '') {
      navigate(`/search?q=${searchValue.trim()}`);
    }
  };
  return (
    <div className="flex gap-2 relative font-notosans ml-5">
      <img
        src="../src/assets/icons/icon-search.svg"
        className="w-6 absolute top-2 left-2"
      ></img>
      <input
        type="text"
        placeholder="여행지나 키워드를 검색해보세요."
        className="h-10 w-[350px] rounded-md bg-gray-200 bg-no-repeat pl-10 pr-2 text-gray-700 w-92.5 outline-0.5 outline-main-color"
        value={searchValue}
        onChange={handleChange}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <button type="button" onClick={onClickDetail}>
        <img
          src="../src/assets/icons/icon-search-bar.svg"
          className="w-8"
        ></img>
      </button>
    </div>
  );
};

export default Search;

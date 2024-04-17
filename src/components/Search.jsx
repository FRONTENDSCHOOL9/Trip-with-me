import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const onClickDetail = () => {
    navigate('/product/search');
  };

  return (
    <div className="searhBox">
      <input
        type="search"
        placeholder="여행지나 키워드를 검색해보세요."
        className="searchInput"
      />
      <button type="button" onClick={onClickDetail}>
        {' '}
        <img
          src="../src/assets/icons/icon-search-bar.svg"
          className="img-detailSearch"
        ></img>
      </button>
    </div>
  );
};

export default Search;

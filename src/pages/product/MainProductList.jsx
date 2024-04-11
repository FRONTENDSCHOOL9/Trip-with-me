import Footer from '@components/layout/Footer';
import { Outlet } from 'react-router-dom';
import '@components/style/mainProductList.css';

function MainProductList() {
  return (
    <div className="layout">
      <div className="scrollbar">
        <div className="titleBox">
          <img
            src="../src/assets/icons/icon-plane.svg"
            className="img-title"
          ></img>
          <h1 className="title">Trip with me</h1>
        </div>
        <Outlet />
        <div className="searhBox">
          <input
            type="search"
            placeholder="여행지나 키워드를 검색해보세요."
            className="searchInput"
          />
          <button type="button">
            {' '}
            <img
              src="../src/assets/icons/icon-search-bar.svg"
              className="img-detailSearch"
            ></img>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainProductList;

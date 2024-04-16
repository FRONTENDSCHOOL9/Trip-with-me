import Footer from '@components/layout/Footer';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import MainProductListItem from '@pages/product/MainProductListItem';
import '@components/style/mainProductList.css';

function MainProductList() {
  const navigate = useNavigate();
  const onClickDetail = () => {
    navigate('/product/search');
  };
  const axios = useCustomAxios();
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const response = await axios.get('/products');
      const list = response?.data?.item?.map(item => {
        return <MainProductListItem key={item?._id} item={item} />;
      });
      setProducts(list);
      console.log('list', list);
    } catch (error) {
      console.error('상품 정보 불러오기 실패', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

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
          <button type="button" onClick={onClickDetail}>
            {' '}
            <img
              src="../src/assets/icons/icon-search-bar.svg"
              className="img-detailSearch"
            ></img>
          </button>
        </div>

        <div className="subTitleBox">
          <img
            src="../src/assets/icons/icon-heart-full.svg"
            className="img-heart"
          ></img>
          <h2 className="likeTitle">좋아요 많은 상품</h2>
        </div>

        <div className="productBox">
          <div className="productBox-img">
            {' '}
            <img
              src="https://dategom.com/wp-content/uploads/2024/02/%ED%99%98%EC%8A%B9%EC%97%B0%EC%95%A0-%EC%8B%9C%EC%A6%8C3-%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EC%9E%A5%EC%86%8C-%EC%9D%B8%EC%B2%9C-%ED%95%B4%EB%82%A8-%ED%9A%8C-%EC%A1%B0%EA%B0%9C%EA%B5%AC%EC%9D%B42.webp"
              className="img-product"
            ></img>
          </div>
          <div className="productBox-info">
            <h3 className="productTitle">
              환승연애3 촬영지 을왕리 해수욕장 가실 분
            </h3>
            <div className="productBox-limit">
              {' '}
              <img
                src="../src/assets/icons/icon-group.svg"
                className="img-limit"
              ></img>
              <p className="limit">2/4</p>
            </div>
            <div className="productBox-etc">
              <a href="#" className="tag">
                # 맛집탐방
              </a>
              <a href="#" className="tag">
                # 사진여행
              </a>
              <div className="productBox-etc_like">
                <button type="button">
                  <img
                    src="../src/assets/icons/icon-heart-disabled.svg"
                    className="img-like"
                  ></img>
                </button>
                <p>1,274</p>
              </div>
            </div>
          </div>
        </div>

        <div className="subTitleBox">
          <h2 className="likeTitle">최신글</h2>
        </div>

        <ul>{products}</ul>
      </div>
      <Footer />
    </div>
  );
}

export default MainProductList;

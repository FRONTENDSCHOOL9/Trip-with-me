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
        <div className="productBox">
          <div className="productBox-img">
            {' '}
            <img
              src="https://post-phinf.pstatic.net/MjAxNzA3MjBfMTkg/MDAxNTAwNTQwNDU3NTAw.LJc6YXl6wUgUeKZNFoS9VyCKPEeHwlSH1xy_pCt7Fjsg.paVt4u2k5g0OEvdxlQrY4cy2-AoFXoUm51G7N1V-i-sg.PNG/2.png?type=w1200"
              className="img-product"
            ></img>
          </div>
          <div className="productBox-info">
            <h3 className="productTitle">국토대장정 가즈아아</h3>
            <div className="productBox-limit">
              {' '}
              <img
                src="../src/assets/icons/icon-group.svg"
                className="img-limit"
              ></img>
              <p className="limit">1/6</p>
            </div>
            <div className="productBox-etc">
              <a href="#" className="tag">
                # 이색체험
              </a>
              <a href="#" className="tag">
                # 기타
              </a>
              <div className="productBox-etc_like">
                <button type="button">
                  <img
                    src="../src/assets/icons/icon-heart-disabled.svg"
                    className="img-like"
                  ></img>
                </button>
                <p>16</p>
              </div>
            </div>
          </div>
        </div>

        <div className="productBox">
          <div className="productBox-img">
            {' '}
            <img
              src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fcompany%2F3626%2Fev0rsnmm7mkzydlx__1080_790.jpg&w=700&q=100"
              className="img-product"
            ></img>
          </div>
          <div className="productBox-info">
            <h3 className="productTitle">
              멋쟁이 사자처럼 커피챗 같이 갈 사람
            </h3>
            <div className="productBox-limit">
              {' '}
              <img
                src="../src/assets/icons/icon-group.svg"
                className="img-limit"
              ></img>
              <p className="limit">11/18</p>
            </div>
            <div className="productBox-etc">
              <a href="#" className="tag">
                # 기타
              </a>
              <div className="productBox-etc_like">
                <button type="button">
                  <img
                    src="../src/assets/icons/icon-heart-disabled.svg"
                    className="img-like"
                  ></img>
                </button>
                <p>40</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainProductList;



const PopularProduct = () => {
  return (
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
  )
}

export default PopularProduct
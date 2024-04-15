import { useEffect } from 'react';
import usePageStore from '@zustand/pageName.mjs';
import '@components/style/productSellList.css';

function ProductLikeList() {
  const page = '판매 목록';
  const setPageName = usePageStore(state => state.setPageName);

  useEffect(() => {
    setPageName(page);
  }, []);
  return (
    <div>
      <ul>
        <li className="productBox">
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
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ProductLikeList;

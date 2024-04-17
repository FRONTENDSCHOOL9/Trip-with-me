import Footer from '@components/layout/Footer';
import { useEffect, useState } from 'react';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import MainProductListItem from '@pages/product/MainProductListItem';
import Title from '@components/Title';
import Search from '@components/Search';
import SubTitle from '@components/SubTitle';
import PopularProductList from '@pages/product/PopularProductList';

function MainProductList() {
  const axios = useCustomAxios();
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const response = await axios.get('/products');
      const { item } = response.data; // API 응답에서 item 배열 추출

        // 상품 목록을 최신순(createdAt 기준)으로 정렬
        const sortedProducts = item.sort((a, b) => {
          // 날짜 비교 함수를 사용하여 createdAt 기준으로 내림차순 정렬
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });

        // 정렬된 상품 목록을 MainProductListItem 컴포넌트에 매핑하여 설정
        const productList = sortedProducts.map(product => (
          <MainProductListItem key={product._id} item={product} />
        ));

        setProducts(productList); // 상품 목록 설정
      } catch (error) {
        console.error('상품 정보 불러오기 실패', error);
      }
    };


  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="layout">
      <div className="scrollbar p-4">
        <Title />

        <Search />

        <div>
          <SubTitle
            iconSrc="../src/assets/icons/icon-love.png"
            title="지금 인기있는 여행지"
          />
          <PopularProductList />
        </div>

        <div>
          <SubTitle
            iconSrc="../src/assets/icons/icon-tour-guide.png"
            title="새로 올라왔어요"
          />
          <ul>{products}</ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MainProductList;

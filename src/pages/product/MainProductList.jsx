import Footer from '@components/layout/Footer';
import { useEffect, useState } from 'react';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import MainProductListItem from '@pages/product/MainProductListItem';
import '@components/style/mainProductList.css';
import Title from '@components/Title';
import Search from '@components/Search';
import SubTitle from '@components/SubTitle';

function MainProductList() {
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
        <Title />

        <Search />

        {/* <div>
          <SubTitle
            iconSrc="../src/assets/icons/icon-heart-full.svg"
            title="지금 인기있는 여행지"
          />
          <ul>{products}</ul>
        </div> */}

        <div>
          <SubTitle title="새로 올라왔어요" />
          <ul>{products}</ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MainProductList;

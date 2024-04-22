import Footer from '@components/layout/Footer';
import Title from '@components/Title';
import Search from '@components/Search';
import SubTitle from '@components/SubTitle';
import PopularProductList from '@pages/product/PopularProductList';
import '@components/style/spinners.css';
import NewProduct from '@pages/product/NewProductList';

function MainProductList() {
  return (
    <div className="layout">
      <Title />

      <Search />
      <div className="scrollbar p-4">
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
          <NewProduct />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MainProductList;

import Footer from '@components/layout/Footer';
import Title from '@components/Title';
import Search from '@components/Search';
import SubTitle from '@components/SubTitle';
import PopularProductList from '@pages/product/PopularProductList';
import '@components/style/spinners.css';
import NewProduct from '@pages/product/NewProductList';

function MainProductPage() {
  return (
    <div className="layout">
      <Title />

      <Search />
      <div className="scrollbar px-4 pb-4">
        <div>
          <SubTitle
            iconSrc="/assets/icons/icon-love.png"
            title="지금 인기있는 여행지"
          />
          <PopularProductList />
        </div>
        <hr className="w-full h-[2px] bg-light-gray mt-2" />
        <div className="mt-6">
          <SubTitle
            iconSrc="/assets/icons/icon-tour-guide.png"
            title="새로 올라왔어요"
          />
          <NewProduct />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MainProductPage;

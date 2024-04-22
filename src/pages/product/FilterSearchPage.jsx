import Search from '@components/Search';
import Title from '@components/Title';
import Footer from '@components/layout/Footer';
import MainProductItem from '@pages/product/MainProductItem';

const FilterSearchPage = () => {
  return (
    <div className="layout">
      <Title />
      <Search />
      <div className="scrollbar p-4">
        <ul>
          <MainProductItem key={item._id} item={item} />
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default FilterSearchPage;

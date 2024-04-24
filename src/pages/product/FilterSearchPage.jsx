import Search from '@components/Search';
import Title from '@components/Title';
import Footer from '@components/layout/Footer';
import MainProductItem from '@pages/product/MainProductItem';
import { useLocation } from 'react-router-dom';

const FilterSearchPage = () => {
  const result = useLocation();
  const list = result?.state?.item;

  console.log('result.state', result.state);

  return (
    <div className="layout">
      <Title />
      <Search />
      <div className="scrollbar p-4">
        {list && list.length > 0 ? (
          <ul>
            {list.map(item => (
              <MainProductItem key={item._id} item={item} />
            ))}
          </ul>
        ) : (
          <div className="h-80 p-2 flex items-center justify-center">
            <p className="text-lg">찾는 상품이 없어요😢</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FilterSearchPage;

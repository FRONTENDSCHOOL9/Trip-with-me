import Search from '@components/Search';
import Title from '@components/Title';
import Footer from '@components/layout/Footer';
import MainProductListItem from '@pages/product/MainProductListItem';

const filterSearchResult = () => {
  
  return (
    <div className="layout">
      <Title />
      <Search />
      <div className="scrollbar p-4">
        <ul>
          {searchResults.length === 0 && (
            <div className="h-80 p-2 flex items-center justify-center">
              <p className="text-lg">{noResultsMessage}</p>
            </div>
          )}
          {searchResults.map(item => (
            <MainProductListItem key={item._id} item={item} />
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default filterSearchResult;

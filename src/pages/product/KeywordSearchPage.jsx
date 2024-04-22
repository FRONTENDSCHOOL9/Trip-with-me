import Search from '@components/Search';
import Title from '@components/Title';
import Footer from '@components/layout/Footer';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import MainProductListItem from '@pages/product/MainProductListItem';

const KeywordSearchPage = () => {
  const axios = useCustomAxios();
  const [searchResults, setSearchResults] = useState([]);
  const [noResultsMessage, setNoResultsMessage] = useState('');

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get('q');

  useEffect(() => {
    if (searchTerm) {
      fetchSearchProduct(searchTerm);
    }
  }, [searchTerm]);

  const fetchSearchProduct = async searchTerm => {
    try {
      const response = await axios.get(`/products?keyword=${searchTerm}`);
      const items = response?.data?.item || [];
      setSearchResults(items);

      if (items.length === 0) {
        setNoResultsMessage(`"${searchTerm}"에 맞는 상품이 없어요😢`);
      } else {
        setNoResultsMessage('');
      }
    } catch (error) {
      console.error('검색한 상품 정보 불러오기 실패', error);
      setSearchResults([]);
      setNoResultsMessage('');
    }
  };

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

export default KeywordSearchPage;

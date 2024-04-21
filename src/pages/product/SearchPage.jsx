import Search from '@components/Search';
import Title from '@components/Title';
import Footer from '@components/layout/Footer';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import classNames from 'classnames';
import MainProductListItem from '@pages/product/MainProductListItem';

const SearchPage = () => {
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

export default SearchPage;

{
  /* // <li key={item._id} className="h-80 p-2 mb-1 font-notosans">
            //   <div */
}
//     className={classNames({
//       relative: item.buyQuantity >= item.quantity,
//     })}
//   >
//     {item.buyQuantity >= item.quantity && (
//       <Link
//         to={`/product/${item._id}`}
//         className="absolute inset-0 flex justify-center items-center"
//         style={{ zIndex: 1 }}
//       >
//         <div className="bg-black bg-opacity-45 w-full h-full flex justify-center items-center rounded-lg">
//           <p className="text-zinc-200 text-3xl font-bold">
//             모집 마감되었어요.
//           </p>
//         </div>
//       </Link>
//     )}
//     <div>
//       <div className="w-102.5 h-56 overflow-hidden rounded-[10px]">
//         <Link to={`/product/${item._id}`}>
//           <img
//             className="size-full object-cover"
//             src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${item?.mainImages[0]?.name}`}
//             alt={item.name}
//           />
//         </Link>
//       </div>
//       <div className="p-2 relative">
//         <Link to={`/product/${item._id}`}>
//           <h3 className="text-base font-medium max-w-70 flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
//             {item?.name}
//           </h3>
//         </Link>
//         <div className="flex text-sm">
//           <img
//             src="../src/assets/icons/icon-group.svg"
//             className="w-4 mr-1"
//             alt="icon"
//           />
//           <p>{`${item?.buyQuantity}/${item?.quantity}`}</p>
//         </div>
//         <div className="mt-1">
//           {item.extra?.themes?.map(theme => (
//             <a
//               href="#"
//               className="bg-indigo-100 rounded mr-1 pb-0.5 px-0.5 text-sm font-medium"
//               key={theme.id}
//             >
//               # {theme.name}
//             </a>
//           ))}
//         </div>
//         <div className="absolute top-8 right-7 text-center">
//           <button type="button">
//             <img
//               src="/src/assets/icons/icon-heart-disabled.svg"
//               className="w-8"
//               alt="heart icon"
//             />
//           </button>
//           {/* <p className="-mt-2">{item?.bookmarks}</p> */}
//         </div>
//       </div>
//     </div>
//   </div>
// </li>
// ))}

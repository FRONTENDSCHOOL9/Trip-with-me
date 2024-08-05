import Header from '@components/layout/Header';
import '@components/style/layout.css';
import { useEffect, useState } from 'react';
import ProductImage from './addproduct/ProductImage';
import ProductName from './addproduct/ProductName';
import Calendar from './addproduct/Calendar';
import AddItinerary from './addproduct/AddItinerary';
import ProductSelectSpot from './addproduct/SelectSpot';
import SelectTheme from './addproduct/SelectTheme';
import ProductContent from './addproduct/ProductContent';
import ProductAddModal from './addproduct/ProductAddModal';
import { useNavigate, useParams } from 'react-router-dom';
import usePageStore from '@zustand/pageName.mjs';
import useMemberState from '@zustand/memberState.mjs';

function AddProduct() {
  const { step } = useParams();

  const [productInfo, setProductInfo] = useState({
    price: 0,
    quantity: 0,
    show: true,
    active: true,
    name: '',
    mainImages: [],
    content: '',
    extra: {
      date: [],
      spot: [],
      themes: [],
      itineraryMaps: [],
    },
  });

  const page = '게시물 등록';
  const setPageName = usePageStore(state => state.setPageName);
  const { user } = useMemberState();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setPageName(page);
    } else {
      noUser();
    }
  }, [user, setPageName]);

  function noUser() {
    alert('로그인 후 이용 가능합니다.');
    navigate('/users/login');
  }

  function renderStep() {
    switch (step) {
      case '1':
        return (
          <ProductImage
            productInfo={productInfo}
            setProductInfo={setProductInfo}
          />
        );
      case '2':
        return (
          <ProductName
            productInfo={productInfo}
            setProductInfo={setProductInfo}
          />
        );
      case '3':
        return (
          <Calendar productInfo={productInfo} setProductInfo={setProductInfo} />
        );
      case '4':
        return (
          <AddItinerary
            productInfo={productInfo}
            setProductInfo={setProductInfo}
          />
        );
      case '5':
        return (
          <ProductSelectSpot
            productInfo={productInfo}
            setProductInfo={setProductInfo}
          />
        );
      case '6':
        return (
          <SelectTheme
            productInfo={productInfo}
            setProductInfo={setProductInfo}
          />
        );
      case '7':
        return (
          <ProductContent
            productInfo={productInfo}
            setProductInfo={setProductInfo}
          />
        );
      case '8':
        return (
          <ProductAddModal
            productInfo={productInfo}
            setProductInfo={setProductInfo}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="layout font-notosans">
      <div className="scrollbar">
        <Header />
        {renderStep()}
      </div>
    </div>
  );
}

export default AddProduct;

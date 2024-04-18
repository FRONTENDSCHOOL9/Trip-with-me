import Header from '@components/layout/Header';
import '@components/style/layout.css';
import { useEffect, useState } from 'react';
import ProductImage from './addproduct/ProductImage';
import ProductName from './addproduct/ProductName';
import Calendar from './addproduct/Calendar';
import AddItinerary from './addproduct/AddItinerary';
import ProductSelectSpot from './addproduct/ProductSelectSpot';
import SelectTheme from './addproduct/SelectTheme';
import ProductContent from './addproduct/ProductContent';
import ProductAddModal from './addproduct/ProductAddModal';
import { useNavigate, useParams } from 'react-router-dom';
import usePageStore from '@zustand/pageName.mjs';
import useMemberState from '@zustand/memberState.mjs';

function AddProduct() {
  let { step } = useParams();
  const [components, setComponents] = useState(null);
  let comp = null;
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
  const { user, setUser } = useMemberState();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setPageName(page);
    } else if (!user) {
      noUser();
    }
  }, []);

  function noUser() {
    alert('로그인 후 이용 가능합니다.');
    navigate('/users/login');
  }

  function renderStep() {
    switch (step) {
      case '1':
        comp = (
          <ProductImage
            productInfo={productInfo}
            setProductInfo={setProductInfo}
          />
        );
        return comp;
      case '2':
        comp = (
          <ProductName
            productInfo={productInfo}
            setProductInfo={setProductInfo}
          />
        );
        return comp;
      case '3':
        comp = (
          <Calendar productInfo={productInfo} setProductInfo={setProductInfo} />
        );
        return comp;
      case '4':
        comp = (
          <AddItinerary
            productInfo={productInfo}
            setProductInfo={setProductInfo}
          />
        );
        return comp;
      case '5':
        comp = (
          <ProductSelectSpot
            productInfo={productInfo}
            setProductInfo={setProductInfo}
          />
        );
        return comp;
      case '6':
        comp = (
          <SelectTheme
            productInfo={productInfo}
            setProductInfo={setProductInfo}
          />
        );
        return comp;
      case '7':
        comp = (
          <ProductContent
            productInfo={productInfo}
            setProductInfo={setProductInfo}
          />
        );
        return comp;
      case '8':
        comp = (
          <ProductAddModal
            productInfo={productInfo}
            setProductInfo={setProductInfo}
          />
        );
        return comp;
    }
    setComponents(comp);
  }

  console.log('compo', components);
  useState(() => {}, []);

  return (
    <div className="layout">
      <Header />
      {renderStep()}
    </div>
  );
}

export default AddProduct;

import Header from '@components/layout/Header';
import '@components/style/layout.css';
import { useState } from 'react';
import ProductImage from './addproduct/ProductImage';
import ProductName from './addproduct/ProductName';
import Calendar from './addproduct/Calendar';
import AddItinerary from './addproduct/AddItinerary';
import ProductSelectSpot from './addproduct/ProductSelectSpot';
import SelectTheme from './addproduct/SelectTheme';
import ProductContent from './addproduct/ProductContent';
import ProductAddModal from './addproduct/ProductAddModal';
import { useParams } from 'react-router-dom';

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
  console.log(productInfo);
  return (
    <div className="layout">
      <Header />
      {renderStep()}
    </div>
  );
}

export default AddProduct;

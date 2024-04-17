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

function AddProduct() {
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
  console.log(productInfo);
  return (
    <div className="layout">
      <Header />
      <ProductImage setProductInfo={setProductInfo} />
      <ProductName productInfo={productInfo} setProductInfo={setProductInfo} />
      <Calendar productInfo={productInfo} setProductInfo={setProductInfo} />
      <AddItinerary productInfo={productInfo} setProductInfo={setProductInfo} />
      <ProductSelectSpot
        productInfo={productInfo}
        setProductInfo={setProductInfo}
      />
      <SelectTheme productInfo={productInfo} setProductInfo={setProductInfo} />
      <ProductContent setProductInfo={setProductInfo} />
      <ProductAddModal setProductInfo={setProductInfo} />
    </div>
  );
}

export default AddProduct;

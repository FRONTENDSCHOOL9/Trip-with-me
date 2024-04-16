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
  const [productInfo, setProductInfo] = useState({});

  console.log(productInfo);

  return (
    <div className="layout">
      <Header />
      <ProductImage setProductInfo={setProductInfo} />
      <ProductName setProductInfo={setProductInfo} />
      <Calendar setProductInfo={setProductInfo} />
      <AddItinerary setProductInfo={setProductInfo} />
      <ProductSelectSpot setProductInfo={setProductInfo} />
      <SelectTheme setProductInfo={setProductInfo} />
      <ProductContent setProductInfo={setProductInfo} />
      <ProductAddModal setProductInfo={setProductInfo} />
    </div>
  );
}

export default AddProduct;

import Calendar from './addproduct/Calendar';
import ProductImage from './addproduct/ProductImage';
import ProductContent from './addproduct/ProductContent';
import ProductSelectSpot from './addproduct/ProductSelectSpot';
import Header from '@components/layout/Header';

import '@components/style/layout.css';

function AddProduct() {
  return (
    <div className="layout scrollbar">
      <Header />
      <ProductImage />
      <Calendar />
      <ProductSelectSpot />
      <ProductContent />
    </div>
  );
}

export default AddProduct;

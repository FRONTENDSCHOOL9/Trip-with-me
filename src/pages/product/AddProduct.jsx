import Calendar from './addproduct/Calendar';
import ProductImage from './addproduct/ProductImage';
import ProductContent from './addproduct/ProductContent';
import ProductSelectSpot from './addproduct/ProductSelectSpot';

function AddProduct() {
  return (
    <div>
      <ProductImage />
      <Calendar />
      <ProductSelectSpot />
      <ProductContent />
    </div>
  );
}

export default AddProduct;

<<<<<<< HEAD
function AddProduct() {
  return <div>AddProduct</div>;
=======
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
>>>>>>> 3e5f52c (Feat: AddProduct components 수정)
}

export default AddProduct;

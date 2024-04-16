import Header from '@components/layout/Header';

import '@components/style/layout.css';
import { Outlet } from 'react-router-dom';

function AddProduct() {
  return (
    <div className="layout">
      <Header />
      <Outlet />
    </div>
  );
}

export default AddProduct;

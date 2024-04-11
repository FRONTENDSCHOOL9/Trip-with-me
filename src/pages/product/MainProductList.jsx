import Footer from '@components/layout/Footer';
import { Outlet } from 'react-router-dom';
import '@components/style/layout.css';

function MainProductList() {
  return (
    <div className="layout">
      <div className="scrollbar">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainProductList;

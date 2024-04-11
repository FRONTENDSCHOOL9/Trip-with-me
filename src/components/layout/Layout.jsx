import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';
import { Outlet } from 'react-router-dom';
import '@components/style/layout.css';

function Layout() {
  return (
    <div className="layout">
      <Header />
      <div className="scrollbar">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;

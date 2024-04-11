import Header from '@components/layout/Header';
import { Outlet } from 'react-router-dom';
import '@components/style/detailedSearch.css';

function DetailedSearch() {
  return (
    <div className="layout">
      <Header />
      <div className="scrollbar">
        <Outlet />
      </div>
    </div>
  );
}

export default DetailedSearch;

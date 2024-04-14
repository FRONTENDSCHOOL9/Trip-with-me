import usePageStore from '@zustand/pageName.mjs';
import { useEffect } from 'react';
import '@components/style/header.css';

function Header() {
  const { pageName } = usePageStore();

  useEffect(() => {}, [pageName]);

  return (
    <div className="header">
      <div className="header-wrap">
        <button className="header-back">
          <i className="ir">뒤로가기</i>
        </button>
        <h1 className="header-title">{pageName}</h1>
      </div>
    </div>
  );
}

export default Header;

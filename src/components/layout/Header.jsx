import usePageStore from '@zustand/pageName.mjs';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import '@components/style/header.css';

function Header() {
  const { pageName } = usePageStore();
  const [pageTransition, setPageTransition] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const site = /^\/product\/add\/[1-8]$/;
    setPageTransition(site.test(location.pathname));
  }, [location.pathname]);

  const onClickBack = () => {
    navigate(-1);
  };

  const onClickMain = () => {
    if (pageTransition) {
      navigate('/product/list');
    }
  };

  return (
    <div className="header">
      <div className="header-wrap">
        <button
          className="header-back"
          onClick={pageTransition ? onClickMain : onClickBack}
        >
          <i className="ir">뒤로가기</i>
        </button>
        <h1 className="header-title">{pageName}</h1>
      </div>
    </div>
  );
}

export default Header;

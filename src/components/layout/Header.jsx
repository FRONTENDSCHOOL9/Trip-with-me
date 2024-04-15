import usePageStore from '@zustand/pageName.mjs';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '@components/style/header.css';

function Header() {
  const { pageName } = usePageStore();

  useEffect(() => {}, [pageName]);

  const navigate = useNavigate();
  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <div className="header">
      <div className="header-wrap">
        <button className="header-back" onClick={onClickBack}>
          <i className="ir">뒤로가기</i>
        </button>
        <h1 className="header-title">{pageName}</h1>
      </div>
    </div>
  );
}

export default Header;

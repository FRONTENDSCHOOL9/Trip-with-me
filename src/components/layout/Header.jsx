import usePageStore from '@zustand/pageName.mjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '@components/style/header.css';

function Header() {
  const { pageName } = usePageStore();
  const [pageTrantion, setPageTrantion] = useState(false);
  useEffect(() => {}, [pageName]);

  const navigate = useNavigate();
  const onClickBack = () => {
    navigate(-1);
  };

  const onClickMain = () => {
    if (pageTrantion) {
      navigate('/product/list');
    } else {
      return;
    }
  };

  return (
    <div className="header">
      <div className="header-wrap">
        <button className="header-back" onClick={(onClickBack, onClickMain)}>
          <i className="ir">뒤로가기</i>
        </button>
        <h1 className="header-title">{pageName}</h1>
      </div>
    </div>
  );
}

export default Header;

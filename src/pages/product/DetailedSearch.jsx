import Header from '@components/layout/Header';
import { Outlet } from 'react-router-dom';
import '@components/style/detailedSearch.css';

function DetailedSearch() {
  return (
    <div className="layout">
      <Header />
      <div className="scrollbar">
        <Outlet />
        <div className="searchBox">
          <h2 className="searchBox-title">지역을 선택해주세요</h2>

          <ul className="searchBox-detail">
            <li>
              {' '}
              <input type="checkbox" id="1" />
              <label htmlFor="1">기능</label>
            </li>

            <li>
              {' '}
              <input type="checkbox" id="2" />
              <label htmlFor="2">구현은</label>
            </li>

            <li>
              {' '}
              <input type="checkbox" id="3" />
              <label htmlFor="3">언제..</label>
            </li>

            <li>
              {' '}
              <input type="checkbox" id="4" />
              <label htmlFor="4">훌쩍</label>
            </li>

            <li>
              {' '}
              <input type="checkbox" id="5" />
              <label htmlFor="5">또륵</label>
            </li>
          </ul>
        </div>

        <div className="searchBox">
          <h2 className="searchBox-title">테마를 선택해주세요</h2>

          <ul className="searchBox-detail">
            <li>
              {' '}
              <input type="checkbox" id="1" />
              <label htmlFor="1">아니</label>
            </li>

            <li>
              {' '}
              <input type="checkbox" id="2" />
              <label htmlFor="2">너무</label>
            </li>

            <li>
              {' '}
              <input type="checkbox" id="3" />
              <label htmlFor="3">어렵다</label>
            </li>

            <li>
              {' '}
              <input type="checkbox" id="4" />
              <label htmlFor="4">컴포넌트</label>
            </li>

            <li>
              {' '}
              <input type="checkbox" id="5" />
              <label htmlFor="5">언제 나누지</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DetailedSearch;

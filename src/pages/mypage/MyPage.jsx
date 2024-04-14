import useMemberState from '@zustand/memberState.mjs';
import usePageStore from '@zustand/pageName.mjs';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//마이페이지 정보는 전역 상태 관리 zustand 에서 불러옴
function MyPage() {
  const page = 'Mypage';
  const setPageName = usePageStore(state => state.setPageName);
  const clearUserIdStorage = useMemberState.persist.clearStorage;
  const { user, setUser } = useMemberState();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    clearUserIdStorage();
    navigate('/users/login');
  };

  useEffect(() => {
    if (user) {
      setPageName(page);
    } else if (!user) {
      noUser();
    }
  }, []);

  function noUser() {
    alert('로그인 후 이용 가능합니다.');
    navigate('/users/login');
  }

  return (
    <>
      {user && (
        <div className="flex flex-col justify-center items-center border border-black h-full">
          <div className="m-auto text-center">
            <img
              src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${user?.profile}`}
            />
            이미지
            <p>{user?.name}</p>
            <p>
              {user?.age}
              {user?.gender}
            </p>
            <p>{user?.theme?.map(item => item.name)}</p>
            <Link to={'/mypage/edit'} state={{ user: user }}>
              회원 정보 수정
            </Link>
            <br />
            <button type="button">찜 목록</button>
            <br />
            <Link to="/mypage/buylist">구매 목록</Link>
            <br />
            <button type="button" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default MyPage;

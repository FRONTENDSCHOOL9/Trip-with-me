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
        <div className="flex flex-col h-full">
          <div className="flex flex-col w-full m-auto text-center  ">
            <div className="mb-3 mx-auto overflow-hidden w-32 h-32 rounded-full">
              <img
                className="w-full h-full "
                src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${user?.profile}`}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = '/public/default-profile.png';
                }}
              />
            </div>
            <p className="font-bold text-xl ">{user?.name}</p>
            <p className="mb-3 text-gray-500">
              <span className="mr-2">{user?.age}대</span>
              <span>{user?.gender}</span>
            </p>
            <p className="mb-5">
              {user?.theme?.map(item => (
                <span
                  className="p-0.5 mx-1 mb-2 border-2 border-main-color rounded-md"
                  key={item.id}
                >
                  {item.name}
                </span>
              ))}
            </p>
            <Link
              className="mb-10 mx-auto bg-gray-300 rounded-full w-2/3 h-10 flex justify-center items-center"
              to={'/mypage/edit'}
              state={{ user: user }}
            >
              <p>회원 정보 수정</p>
            </Link>

            <hr className="border-0 h-3 bg-gray-100 w-full" />
            <br />
            <div className="px-10 text-left">
              <button className="mb-5 text-xl mr-auto" type="button">
                찜 목록
              </button>
              <br />
              <p className="mb-5">
                <Link className="text-xl mr-auto" to="/mypage/buylist">
                  구매 목록
                </Link>
              </p>
              <p className="mb-5">
                <Link className="text-xl mr-auto" to="/mypage/selllist">
                  판매 목록
                </Link>
              </p>
              <button
                className="mb-5 text-xl mr-auto"
                type="button"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyPage;

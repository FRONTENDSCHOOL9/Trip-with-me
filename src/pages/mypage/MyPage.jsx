import useMemberState from '@zustand/memberState.mjs';
import usePageStore from '@zustand/pageName.mjs';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRandomPhrase } from '../../randomNameData/randomData'; // randomData 파일 가져오기

import '@components/style/cssClassNaming.css';

function MyPage() {
  const page = 'Mypage';
  const setPageName = usePageStore(state => state.setPageName);
  const clearUserIdStorage = useMemberState.persist.clearStorage;
  const { user, setUser } = useMemberState();
  const navigate = useNavigate();

  const [randomPhrase, setRandomPhrase] = useState('');

  const handleLogout = () => {
    setUser(null);
    clearUserIdStorage();
    navigate('/users/login');
  };

  useEffect(() => {
    if (user) {
      setPageName(page);
      setRandomPhrase(getRandomPhrase()); // 페이지가 새로 고침될 때마다 랜덤 문구 설정
    } else {
      noUser();
    }
  }, [user]); // user 상태가 변경될 때만 useEffect 실행

  function noUser() {
    alert('로그인 후 이용 가능합니다.');
    navigate('/users/login');
  }

  return (
    <>
      {user && (
        <div className="flex flex-col h-full  font-notosans bg-mainbg-color">
          <div className="  w-full text-center  bg-mainbg-color">
            <h2 className="mt-4">
              여행자
              <span className="text-main-color font-bold text-lg px-1">
                {user?.name}
              </span>
              님도{' '}
              {
                <span className="text-main-color font-bold">
                  {randomPhrase}
                </span>
              }{' '}
              처럼 될 수 있어요 !
            </h2>
            <div className="profile-box mt-4 mx-6 flex h-64 mb-4 shadow-xl relative ">
              <h3 className="absolute top-4 left-4 font-bold">My Trip Card</h3>
              <div className="flex flex-col w-[96px] mt-auto mb-6 pl-2">
                <div>
                  <p className="font-semibold text-xl text-white ">
                    {user?.name}
                  </p>
                  <p className="text-gray-700 font-light text-sm">
                    {user?.age}대 {user?.gender === 'female' ? '여성' : '남성'}
                  </p>
                </div>
              </div>
              <div className="m-auto overflow-hidden w-36  h-36 rounded-full">
                <img
                  className="w-full h-full "
                  src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${user?.profile}`}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = '/default-profile.png';
                  }}
                />
              </div>
              <Link
                className="profile-box-edit-button text-white mt-auto  mb-6 mr-2 rounded-full w-[96px]  h-8 flex justify-center items-center"
                to={'/mypage/edit'}
                state={{ user: user }}
              >
                <p className="text-xs">회원 정보 수정</p>
              </Link>
            </div>

            <div className="flex justify-center gap-4 mx-6">
              <div className="flex flex-col gap-2 bg-gray-300 w-2/4 py-4 px-6 rounded-lg shadow-lg">
                <h4 className="text-lg font-medium">나의 관심사</h4>
                {user?.theme?.map(item => (
                  <p
                    className="rounded-full py-1 px-4 bg-mainbg-color border-2 text-sm "
                    key={item.id}
                  >
                    {item.name}
                  </p>
                ))}
              </div>
              <div className="w-2/3 bg-gray-300 py-4 px-6 rounded-lg shadow-lg">
                <h4 className="mb-2 text-lg font-medium ">자기소개</h4>
                {user?.introduce ? (
                  <p className="h-fit w-full text-sm">{user?.introduce}</p>
                ) : (
                  <p>자기소개가 없습니다.</p>
                )}
              </div>
            </div>

            <div className="flex flex-col mx-6 mt-4 mb-4 gap-4">
              <Link
                to="/mypage/likelist"
                className="flex items-center justify-between mt-4 text-lg text-left mr-auto font-semibold  text-black  w-full px-6 py-2 border-b-[1px] "
                type="button"
              >
                찜 목록
                <img
                  className="w-6 h-6"
                  src="src/assets/icons/icon-chevron-right-black.svg"
                  alt=""
                />
              </Link>
              <Link
                to="/mypage/buylist"
                className="flex items-center justify-between text-lg text-left mr-auto font-semibold  text-black  w-full px-6 py-2 border-b-[1px] "
              >
                구매 목록
                <img
                  className="w-6 h-6"
                  src="src/assets/icons/icon-chevron-right-black.svg"
                  alt=""
                />
              </Link>
              <Link
                to="/mypage/selllist"
                className="flex items-center justify-between text-lg text-left mr-auto font-semibold  text-black  w-full px-6 py-2 border-b-[1px]"
              >
                판매 목록
                <img
                  className="w-6 h-6"
                  src="src/assets/icons/icon-chevron-right-black.svg"
                  alt=""
                />
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className=" flex items-center justify-between text-lg text-left mr-auto font-semibold  text-black  w-full px-6 py-2  border-b-[1px]"
              >
                로그아웃
                <img
                  className="w-6 h-6"
                  src="src/assets/icons/icon-chevron-right-black.svg"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyPage;

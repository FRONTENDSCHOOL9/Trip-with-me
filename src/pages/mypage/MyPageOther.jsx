import useCustomAxios from '@hooks/useCustomAxios.mjs';
import usePageStore from '@zustand/pageName.mjs';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function MyPageOther() {
  //{{url}}/users/6
  const page = '회원 정보 조회';
  const setPageName = usePageStore(state => state.setPageName);
  const [userData, setUserData] = useState(null);
  const axios = useCustomAxios();
  const { _id } = useParams(); //조회하려는 회원 id값 = 추후엔 prop 으로 전달되어야함! (댓글 / 판매자 tab)

  useEffect(() => {
    getData();
    setPageName(page);
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(`/users/${_id}`);
      console.log(_id);
      console.log('resitem =>', res?.data);
      console.log('2');

      setUserData(res?.data?.item);

      // userData?.name;
      // userData?.extra?.birthday;
      // userData?.extra?.address?.map(item=>());
      // userData?.extra?.introduce;
      // userData?.profileImage
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="flex flex-col font-notosans bg-mainbg-color">
        <div className="w-full h-full text-center">
        <h2 className="mt-4">
              여행자
              <span className="text-main-color font-bold text-lg px-1">
                {userData?.name}
              </span>
              님과 여행메이트가 되어보세요
            </h2>
        <div className="profile-box mt-4 mx-6 flex h-64 mb-4 shadow-xl relative">
              <h3 className="absolute top-4 left-4 font-bold">My Trip Card</h3>
                <div className="absolute bottom-8 left-5 ">
                  <p className="font-semibold text-xl text-white">
                  {userData?.name}
                  </p>
                  <p className="text-gray-700 font-light text-sm">
                  {userData?.extra?.birthday}대 {userData?.address === 'female' ? '여성' : '남성'}
                  </p>
                </div>
              <div className="m-auto overflow-hidden h-36 rounded-full">
                <img
                  className="w-full h-full"
                  src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${userData?.profileImage}`}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = '/public/default-profile.png';
                  }}
                />
              </div>
              {/* <Link
                className="profile-box-edit-button text-white mt-auto  mb-6 mr-2 rounded-full w-[96px]  h-8 flex justify-center items-center"
                to={'/mypage/edit'}
                state={{ user: user }}
              >
                <p className="text-xs">회원 정보 수정</p>
              </Link> */}
            </div>

            <div className="flex justify-center gap-4 mx-6">
              <div className="flex flex-col gap-2 bg-gray-300 w-2/4 py-4 px-6 rounded-lg shadow-lg">
                <h4 className="text-lg font-medium">나의 관심사</h4>
                {userData?.extra?.address?.map(item => (
                  <p
                    className="rounded-full py-1 px-4 bg-mainbg-color border-2 text-sm "
                    key={item.id}
                  >
                    {item.name}
                  </p>
                ))}
              </div>
              <div className="w-2/3 bg-gray-300 py-4 px-6 rounded-lg shadow-lg">
                <h4 className="mb-2 text-lg font-medium">자기소개</h4>
                {userData?.extra?.introduce ? (
                  <p className="h-fit w-full text-sm">{userData?.extra?.introduce}</p>
                ) : (
                  <p>자기소개가 없습니다.</p>
                )}
              </div>
            </div>

            <div className="flex flex-col mx-6 mt-4 mb-4 gap-4">
              <Link
                to={`/mypage/${_id}/selllist`}
                className="text-lg text-left mr-auto font-semibold  text-black  w-full px-6 py-2 border-b-[1px]"
              >
                판매 목록
              </Link>
            </div>

            <hr className="border-0 h-3 bg-gray-100 w-full" />

          {/* <div className="mb-3 mx-auto overflow-hidden w-32 h-32 rounded-full">
            <img
              className="w-full h-full "
              src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${userData?.profileImage}`}
              onError={e => {
                e.target.onerror = null;
                e.target.src = '/public/default-profile.png';
              }}
            />
          </div>
          <p className="font-bold text-xl ">{userData?.name}</p>
          <p className="mb-3 text-gray-500">
            <span className="mr-2">{userData?.extra?.birthday}대</span>
            <span>{userData?.address}</span>
          </p>
          <p className="mb-5">
            {userData?.extra?.address?.map(item => (
              <span
                className="p-0.5 mx-1 mb-2 border-2 border-main-color rounded-md"
                key={item.id}
              >
                {item.name}
              </span>
            ))}
          </p> */}

          {/* {userData?.extra?.introduce ? (
            <p className="p-2 h-fit bg-gray-100 mb-5 w-4/5 mx-auto rounded-md shadow-md">
              {userData?.extra?.introduce}
            </p>
          ) : (
            <p className="p-2 h-fit bg-gray-100 mb-5 w-4/5 mx-auto rounded-md shadow-md">
              자기소개가 없습니다.
            </p>
          )} */}
          <br />
        </div>
      </div>
    </>
  );
}

export default MyPageOther;

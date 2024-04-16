import useCustomAxios from '@hooks/useCustomAxios.mjs';
import usePageStore from '@zustand/pageName.mjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
      <div className="flex flex-col h-full">
        <div className="flex flex-col w-full m-auto text-center">
          <div className="mb-3 mx-auto overflow-hidden w-32 h-32 rounded-full">
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
          </p>

          {userData?.extra?.introduce ? (
            <p className="p-2 h-fit bg-gray-100 mb-5 w-4/5 mx-auto rounded-md shadow-md">
              {userData?.extra?.introduce}
            </p>
          ) : (
            <p className="p-2 h-fit bg-gray-100 mb-5 w-4/5 mx-auto rounded-md shadow-md">
              자기소개가 없습니다.
            </p>
          )}

          <hr className="border-0 h-3 bg-gray-100 w-full" />
          <br />
        </div>
      </div>
    </>
  );
}

export default MyPageOther;

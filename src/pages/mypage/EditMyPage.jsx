import { Submit } from '@components/style/StyledButton';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import useMemberState from '@zustand/memberState.mjs';
import usePageStore from '@zustand/pageName.mjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

function EditMyPage() {
  const axios = useCustomAxios();
  const page = '회원 정보 수정';
  const setPageName = usePageStore(state => state.setPageName);
  const location = useLocation();
  const propUser = location.state?.user;
  const [themeData, setThemeData] = useState([]);
  const [checkCount, setCheckCount] = useState(0);
  const [checkError, setCheckError] = useState(null);
  const [themeSelectedArr, setThemeSelectedArr] = useState([]);
  const { setUser } = useMemberState();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const MAX_CHECKED = 3;

  const [selectedFile, setSelectedFile] = useState([]);
  const [viewFile, setViewFile] = useState(null);

  const selectValid = count => {
    if (count >= MAX_CHECKED) {
      alert('3개만 선택 가능합니다.');
      setCheckError('3개까지만 선택 가능합니다.');
      return false;
    } else {
      setCheckError(null);
    }
  };

  const setThemeArr = () => {
    let items = document.querySelectorAll('button.is_active');
    let themeSelectedItems = Array.from(items).map(item => {
      return {
        id: item.getAttribute('id'),
        name: item.textContent,
      };
    });
    setThemeSelectedArr(themeSelectedItems); //만들어진 객체로 상태 업데이트, formData에 들어갈 거임
  };

  const handleClick = e => {
    let count = document.querySelectorAll('button.is_active').length;
    if (e.target.classList.contains('is_active')) {
      e.target.className =
        'hover:border-main-color p-0.5 mx-1 mb-2 border-2 border-gray-300 rounded-md';
      count--;
    } else {
      if (selectValid(count) === false) {
        count--;
        return;
      }
      e.target.className =
        'is_active hover:border-main-color p-0.5 mx-1 mb-2 border-2 border-main-color rounded-md';
      count++;
    }

    setThemeArr(); //나중에 formData에 들어갈 객체를 만들어주는 역할
    setCheckCount(count);
  };

  const getTheme = async () => {
    try {
      const { data } = await axios.get(import.meta.env.VITE_TRAVEL_THEMES_API);
      setTheme(data);
    } catch (err) {
      console.log(err);
    }
  };

  const setTheme = data => {
    const themeList = [];
    let count = 0;
    data?.forEach(item => {
      let is_active = propUser.theme.some(theme => theme.id === item.id);
      if (is_active) {
        count++;
        setCheckCount(count);
      }
      // console.log('is_active item', is_active, item);
      themeList.push(
        <button
          className={
            is_active
              ? 'is_active hover:border-main-color border-2 rounded-full py-1 px-2 m-1 border-main-color '
              : 'hover:border-main-color border-2 rounded-full py-1 px-2 m-1 border-gray-300 '
          }
          key={item.id}
          id={item.id}
          type="button"
          onClick={handleClick}
        >
          #{item.name}
        </button>,
      );
    });
    setThemeData(themeList);
    setThemeArr(); // 선택되지 않은 경우를 대비하여, 데이터를 불러온 직후에도 해당 함수를 불러온다.
  };

  //서버로 전송 및 전역 상태 업데이트
  const onSubmit = async formData => {
    try {
      //파일 먼저 가져오기
      if (selectedFile.length > 0) {
        console.log('selectedFile =>', selectedFile);

        const imageFormData = new FormData();
        imageFormData.append('attach', selectedFile[0]);

        // console.log('formData =>', formData);
        console.log('imageFormData=>', imageFormData);
        const fileRes = await axios('/files', {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: imageFormData,
        });
        formData.profileImage = fileRes.data.item[0].name;
      } else if (selectedFile.length <= 0) {
        formData.profileImage = propUser?.profile;
      }

      //formData의 extra 객체 생성
      formData.extra = formData.extra || {};
      console.log('if themeselected 윗부분');

      formData.extra.birthday = propUser?.age;
      if (themeSelectedArr) {
        formData.extra.address = themeSelectedArr;
      }

      console.log('현재 보내는 formData => ', formData);
      const res = await axios.patch('/users/' + propUser._id, formData);

      const updateUser = {
        name: res?.data?.updated?.name,
        profile: res?.data?.updated?.profileImage,
        theme: res?.data?.updated?.extra?.address,
        introduce: res?.data?.updated?.extra?.introduce,
      };
      //기존 프로필은 있으면서 변경 액션이 없는 경우

      // updateUser?.profile &&
      //   (updateUser?.profile?.length ? '' : delete updateUser?.profile);
      //값이 지워졌다.

      // if (updateUser?.profile && !updateUser?.profile?.length) {
      //   if(updateUser.hasOwnProperty())
      // }

      !updateUser?.profile && delete updateUser?.profile;

      console.log('지워져야 정상updateUser=>', updateUser);

      console.log('전역 넘어온 값 propUser =>', propUser);

      //updateUser 덮어쓰기
      const newUser = {
        ...propUser,
        ...updateUser,
      };

      console.log('newUser =>', newUser);

      // 전역 상태 관리 업데이트
      setUser(newUser);

      alert('수정 완료되었습니다.');

      navigate('/mypage');
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleFileChange = e => {
    setViewFile(URL.createObjectURL(e.target.files[0]));
    setSelectedFile(e.target.files);
    console.log(e.target.files);
  };

  useEffect(() => {
    setPageName(page);
    getTheme();
  }, []);


  return (
    <div className="font-notosans flex flex-col h-full bg-mainbg-color">
      <form
        className="flex flex-col  bg-mainbg-color"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-lg font-bold mt-6 ml-11">회원 정보</h2>
        <div className="flex flex-col items-center mb-4">
          <div className=" mt-8 overflow-hidden w-32 h-32 rounded-full relative shadow-lg">
            {viewFile ? (
              <img src={viewFile} />
            ) : (
              <img
                src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${propUser?.profile}`}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = '/default-profile.png';
                }}
              />
            )}
          </div>
          <label
            className="text-xs font-medium mt-4 mx-8 border-[1px] p-2 bg-main-color text-white rounded-lg shadow-lg"
            htmlFor="profileImages"
          >
            Image Edit and Add
          </label>
        </div>
        <input
          className="hidden"
          type="file"
          accept="image/*"
          id="profileImages"
          placeholder="이미지를 선택하세요"
          onChange={handleFileChange}
          // {...register('profileImage')}
        />
        <div className="mx-auto w-4/5 ">
          <div>
            <label className="text-sm font-bold" htmlFor="name">
              닉네임
            </label>
          </div>
          <input
            className="w-full h-12 border-b-2 outline-none mb-5 px-2 font-semibold  bg-mainbg-color focus:border-blue-500 "
            type="text"
            id="name"
            placeholder="닉네임을 입력하세요"
            defaultValue={propUser.name}
            {...register('name')}
          />
          <div>
            <label className="text-sm font-bold " htmlFor="introduce">
              소개말
            </label>
          </div>
          <textarea
            className="w-full border-b-2 outline-none my-5 px-2 text-sm  shadow-md "
            type="text"
            id="introduce"
            rows="4"
            cols="40"
            placeholder="자기소개를 입력하세요"
            defaultValue={propUser.introduce}
            {...register('extra.introduce')}
          />
        </div>

        <div className="flex flex-col">
          <hr className="border-none bg-gray-200 h-[2px] my-5" />

          <h3 className="text-xl text-center font-bold mb-2">
            관심사를 골라주세요 ({checkCount} / 3)
          </h3>

          <div className="mb-4">{checkError && checkError}</div>
          <div className="text-center rounded-full py-1 px-8  border-main-color ">
            {themeData}
          </div>
        </div>
        <div className="flex mx-auto text-center mt-4 mb-8 w-36">
          <Submit>수정</Submit>
        </div>
      </form>
    </div>
  );
}

export default EditMyPage;

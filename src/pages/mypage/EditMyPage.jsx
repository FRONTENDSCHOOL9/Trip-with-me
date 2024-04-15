import { Submit } from '@components/style/StyledButton';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import useMemberState from '@zustand/memberState.mjs';
import usePageStore from '@zustand/pageName.mjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

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
              ? 'is_active hover:border-main-color p-0.5 mx-1 mb-2 border-2 border-main-color rounded-md'
              : 'hover:border-main-color p-0.5 mx-1 mb-2 border-2 border-gray-300 rounded-md'
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
      }

      //formData의 extra 객체 생성
      formData.extra = formData.extra || {};
      console.log('if themeselected 윗부분');

      if (themeSelectedArr) {
        formData.extra.address = themeSelectedArr;
      }
      console.log('patch 윗부분');
      const res = await axios.patch('/users/' + propUser._id, formData);

      const updateUser = {
        name: res?.data?.updated?.name,
        profile: res?.data?.updated?.profileImage,
        theme: res?.data?.updated?.extra?.address,
      };
      //기존 프로필은 있으면서 변경 액션이 없는 경우

      // updateUser?.profile &&
      //   (updateUser?.profile?.length ? '' : delete updateUser?.profile);
      //값이 지워졌다.

      if (updateUser?.profile && !updateUser?.profile?.length) {
        if(updateUser.hasOwnProperty())
      }

      console.log('updateUser', updateUser?.profile);

      console.log(propUser?.profile);

      //updateUser 덮어쓰기
      const newUser = {
        ...propUser,
        ...updateUser,
      };
      console.log('newUser 아래');
      console.log('newUser', newUser);

      // console.log('newUser => ', newUser);
      // 전역 상태 관리 업데이트
      console.log('setnewUser 위');

      setUser(newUser);

      alert('수정 완료되었습니다.');

      navigate('/mypage');
    } catch (err) {
      console.log(err.message);
    }
  };

  // const onChange = e => {
  //   // const { value, name } = e.target;
  //   // setProfileState({
  //   //   ...profileState,
  //   //   [name]: value,
  //   // });
  //   // console.log('files=>', e.target.files[0]);
  //   // setImage(e.target.files[0]);
  // };

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
    <div className="flex flex-col h-full justify-center">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <div className="mb-3 mx-auto overflow-hidden w-32 h-32 rounded-full relative">
            <label
              className="inline-block absolute w-full h-full"
              htmlFor="profileImages"
            ></label>
            {viewFile ? (
              <img className="w-full h-full" src={viewFile} />
            ) : (
              <img
                className="w-full h-full"
                src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${propUser?.profile}`}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = '/default-profile.png';
                }}
              />
            )}

            {/* <img
              className="absolute bottom-0 right-0 -z-1 w-2 h-2"
              src="/assets/icons/icon-photo.svg"
            /> */}
          </div>
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

        <h2 className="text-lg font-bold mb-1">회원 정보</h2>

        <div className="mx-auto w-4/5">
          <div>
            <label className="text-xs" htmlFor="name">
              닉네임
            </label>
          </div>
          <input
            className="w-full border-b-2 outline-none mb-5 "
            type="text"
            id="name"
            placeholder="닉네임을 입력하세요"
            defaultValue={propUser.name}
            {...register('name')}
          />
        </div>

        <div className="flex flex-col">
          <hr className="border-none bg-gray-200 h-2 my-5" />

          <h3 className="text-xl text-center font-bold mb-2">
            관심사를 골라주세요 ({checkCount} / 3)
          </h3>
          <span className="text-center mb-2">{checkError && checkError}</span>
          <ul className="mb-3">
            <li className="text-center">{themeData}</li>
          </ul>
        </div>
        <div className="text-center">
          <Submit width="200px">수정 완료</Submit>
        </div>
      </form>
    </div>
  );
}

export default EditMyPage;

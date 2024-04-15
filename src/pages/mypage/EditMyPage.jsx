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
  const [themeData, setThemeData] = useState(0);
  const [checkCount, setCheckCount] = useState(0);
  const [checkError, setCheckError] = useState(null);
  const [themeSelectedArr, setThemeSelectedArr] = useState([]);
  const { setUser } = useMemberState();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const MAX_CHECKED = 3;
  const [profileState, setProfileState] = useState({
    name: '',
    contents: '',
  });

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
    let items = document.querySelectorAll(
      'button[type=button][class=is_active]',
    );
    let themeSelectedItems = Array.from(items).map(item => {
      return {
        id: item.getAttribute('id'),
        name: item.textContent,
      };
    });
    setThemeSelectedArr(themeSelectedItems); //만들어진 객체로 상태 업데이트, formData에 들어갈 거임
  };

  const handleClick = e => {
    let count = document.querySelectorAll(
      'button[type=button][class=is_active]',
    ).length;
    if (e.target.classList.contains('is_active')) {
      e.target.className = '';
      count--;
    } else {
      if (selectValid(count) === false) {
        count--;
        return;
      }
      e.target.className = 'is_active';
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
      themeList.push(
        <button
          className={is_active ? 'is_active' : ''}
          key={item.id}
          id={item.id}
          type="button"
          onClick={handleClick}
        >
          {item.name}
        </button>,
      );
    });
    setThemeData(themeList);
    setThemeArr(); // 선택되지 않은 경우를 대비하여, 데이터를 불러온 직후에도 해당 함수를 불러온다.
  };

  //서버로 전송 및 전역 상태 업데이`트
  const onSubmit = async formData => {
    try {
      //파일 먼저 가져오기
      if (formData.profileImage.length > 0) {
        const imageFormData = new FormData();
        imageFormData.append('attach', formData.profileImage[0]);

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
      if (themeSelectedArr) {
        formData.extra.address = themeSelectedArr;
      }
      const res = await axios.patch('/users/' + propUser._id, formData);

      const updateUser = {
        name: res?.data?.updated?.name,
        profile: res?.data?.updated?.profileImage,
        theme: res?.data?.updated?.extra?.address,
      };
      //기존 프로필은 있으면서 변경 액션이 없는 경우
      updateUser.profile.length ? '' : delete updateUser.profile;

      //updateUser 덮어쓰기
      const newUser = {
        ...propUser,
        ...updateUser,
      };

      console.log('newUser => ', newUser);
      // 전역 상태 관리 업데이트
      setUser(newUser);

      alert('수정 완료되었습니다.');

      navigate('/mypage');
    } catch (err) {
      console.log(err.message);
    }
  };

  const onChange = e => {
    const { value, name } = e.target;
    setProfileState({
      ...profileState,
      [name]: value,
    });
  };

  useEffect(() => {
    setPageName(page);
    getTheme();
  }, []);

  return (
    <div>
      <h2>회원 정보</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
            htmlFor="profileImage"
          >
            프로필 이미지
          </label>
          <input
            type="file"
            accept="image/*"
            id="profileImage"
            placeholder="이미지를 선택하세요"
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
            onChange={onChange}
            {...register('profileImage')}
          />
        </div>

        <label htmlFor="name">닉네임</label>
        <input
          type="text"
          id="name"
          placeholder="닉네임을 입력하세요"
          defaultValue={propUser.name}
          onChange={onChange}
          {...register('name')}
        />

        <div>
          <h3>관심사를 골라주세요 ({checkCount} / 3)</h3>
          <span>{checkError && checkError}</span>
          <ul>
            <li>{themeData}</li>
          </ul>
        </div>
        <button type="submit">수정 완료</button>
      </form>
    </div>
  );
}

export default EditMyPage;

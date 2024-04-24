## 📎 목차

1. [프로젝트 팀 소개](#-프로젝트-팀-소개)
2. [프로젝트 소개](#-프로젝트-소개)
3. [기술 스택](#-기술-스택)
4. [컨벤션](#-컨벤션)
5. [담당 페이지 및 기능](#-담당-페이지-및-기능)
6. [주요 기능 및 코드](#-주요-기능-및-코드)
7. [화면 구성](#-화면-구성)
8. [추가하고싶은 페이지 및 기능](#-추가하고싶은-페이지-및-기능)
9. [프로젝트 소감](#-프로젝트-소감)

---

<br>

## 😀 프로젝트 팀 소개

<b>1조 원더독(onederdog)</b>
| [박지민(팀장)](https://github.com/aksenmi) | [류채영](https://github.com/chaeyoungg) | [양준호](https://github.com/yanggengjelly) | [김도하](https://github.com/D0-HA) |
| :---------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="200" height="150" src="src/assets/readme/user-jimin.jpg" /> | <img width="200" height="150" src="src/assets/readme/user-chaeyoung.png" /> | <img width="200" height="150" src="src/assets/readme/user-junho.png" /> | <img width="200" height="150" src="src/assets/readme/user-doha.png" /> |

---

## 📑 프로젝트 소개

뻔한 여행지는 그만,
나만의 여행 코스를 공유하고 함께 가자~!
여행 동행 메이트 구하기 <b>Trip with me🛫</b>
<br>

🔗<b>배포 URL :</b> [trip-withme.netlify.app/](https://trip-withme.netlify.app/)
<b>테스트 계정</b> <b>ID :</b> testApp@test.com / <b>PW :</b> 11111111
<br>

📆 전체 프로젝트 기간 : 2024.04.01 ~ 2024.04.24

- 04.01 ~ 04.07 : 컨셉 기획, 초기 UI 설계 및 프로젝트 세팅
- 04.08 ~ 04.23 : 기능 구현
- 04.23 ~ 04.24 : 코드 리팩토링 및 UI 디자인 세부 조정

---

## ⚙️ 기술 스택

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
 <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
 <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">

<br>

### Library

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=blue">
 <img src="https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
<img src="https://img.shields.io/badge/swiper-6332F6?style=for-the-badge&logo=swiper&logoColor=white">
<img src="https://img.shields.io/badge/kakao Map-FFCD00?style=for-the-badge&logo=kakao&logoColor=black">

### Tools

<img src="https://img.shields.io/badge/Visual_Studio-5C2D91?style=for-the-badge&logo=visual%20studio&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">

### Setting

<img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white" /> <img src="https://img.shields.io/badge/Prettier-20B2AA?style=for-the-badge&logo=Prettier&logoColor=white" />

### Package Manager

<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" /> <img src="https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=JSON&logoColor=white" /> <img src="https://img.shields.io/badge/vite-ACF3FF?style=for-the-badge&logo=vite&logoColor=black">

---

## 📢 컨벤션

### Git

```JavaScript
Feat (타입) : 로그인 기능 구현 (제목)

- 새로고침 시 로그인 유지 기능 개발 (본문)


// 타입 참고
Feat : 새로운 기능을 추가한 경우
Fix : 버그를 고친 경우
Design : 사용자 UI 디자인
Style : 코드 포맷 변경, 세미 콜론 누락 등 코드 수정이 없는 경우
Comment : 주석 추가 및 변경
Docs: 문서를 수정한 경우
Chore : 패키지 매니저 설정
Refactor : 코드 리팩토링
Rename : 파일, 폴더명을 수정하거나 옮기는 작업만 수행한 경우
Remove : 파일을 삭제하는 작업만 수행하는 경우


// 본문 참고
- 선택사항이므로 모든 커밋에 작성할 필요 없음
- 부연 설명이 필요하거나 커밋 이유를 설명할 경우 작성
- 72자 제한
- 무엇을 왜 변경했는지에 맞춰서 작성
```

### Code

```JavaScript
// Naming
- 컴포넌트는 PascalCase로 네이밍
예) HeaderTitle.jsx

- 컴포넌트 외 모든 파일 및 클래스 네임은 camelCase로 네이밍(JS파일 포함)
예) customAxios.js

- 이미지 파일은 cebab-case로 네이밍
예) defalut-user.svg

- 변수명은 camelCase로 네이밍
예) countValue

- 상수는 대문자 + snake_case로 네이밍
예) API_SERVER


// ES6
- var 사용 금지 -> let, const 사용

- 되도록 화살표 함수를 사용

- null을 직접 체크하기보다는 optional chaining 사용
```

---

## ✨ 담당 페이지 및 기능

<b>박지민</b>

- 상품 등록 페이지

  - 상품명, 인원, 가격, 여행 테마 설정 기능
  - 지도 API 활용하여 일자별 여행 동선 마킹 및 그리기 기능
    <br>

- 상품 상세 정보 페이지

  - 상품 상세 정보 렌더링(Kakao Map API)
  - 상품 삭제 기능
  - 여행장 정보 탭
    - 여행장 프로필 렌더링

<br>
<b>류채영</b>

- 회원가입 페이지
- 로그인 페이지

  - 로그인 세션, 토큰 관리(zustand)
    <br>

- 상품 상세 정보 페이지

  - 여행장 정보 탭

    - 여행장이 받은 후기 목록 렌더링

    <br>

- 마이페이지

  - 사용자의 프로필 렌더링(타유저 포함)
  - 회원 정보 수정 기능
    <br>

- 찜 목록 페이지

  - 찜한 상품 목록 렌더링
    <br>

- 구매 목록 페이지

  - 구매한 상품 목록 렌더링
  - 구매한 상품의 여행장에 대한 후기 작성 기능
    <br>

- 상품 찜하기 기능
- 상품 예약하기 기능

<br>
<b>양준호</b>

- 시작 화면

  - 서비스에 대한 설명 슬라이드
    <br>

- 상품 등록 페이지

  - 상품 이미지, 일정(react-calendar), 여행 지역 설정 기능
    <br>

- 상품 상세 정보 페이지

  - 상품 상세 정보 렌더링
  - 상품 삭제 기능
  - 댓글 등록, 수정, 삭제 기능

<br>
<b>김도하</b>

- 메인 페이지

  - 찜 횟수 높은 상품 슬라이드로 렌더링
  - 최신 상품 목록 렌더링
    <br>

- 검색 페이지

  - 키워드 검색 기능
  - 지역, 테마 필터링 검색 기능
    <br>

- 판매 목록 페이지
  - 판매한 상품 목록 렌더링

---

## 📌 주요 기능 및 코드

- 본인이 작성한 댓글일 경우에만 수정/삭제 버튼 생성

```
저희 게시글은 ‘상품’ API 를 사용하기 때문에 기본적인 댓글 기능이 붙어있지 않았는데요,
댓글 기능을 구현하기 위해서 게시판 API의 type을 ‘comment’와 댓글을 노출할 product_id를 쿼리의 파라미터로 지정합니다.
작성한 댓글은 zustand의 user 상태를 통해 로그인 된 사용자가 작성한 게시글에 한하여 수정/삭제 버튼을 노출하고 해당기능을 수행합니다.
```

```JavaScript
const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['comments', _id],
    queryFn: async () => {
      const res = await axios.get('/posts', {
        params: {
          type: 'comment',
          custom: `{ "product_id" : ${_id}}`,
        },
      });
      return res;
    },
    select: res => res.data,
  });
;
```

```
댓글의 프로필 이미지를 클릭하면 타인의 프로필과 판매하는 상품 목록을 열람할 수 있습니다.
```

```Javascript
{editingCommentId === item._id ? (
          <CommentEdit
            comment={item}
            onSave={handleEditComment}
            onCancel={() => {
              setEditingCommentId(null);
              setEditCommentText('');
            }}

```

<br>

- 상품 구매하기

```
상품 상세 페이지에서 넘어온 prop 값을 기반으로 구매를 진행합니다.
이 때 구매 가능한 quantity 보다 넘은 주문을 방지하기 위하여 버튼 클릭 이벤트에 validation 을 진행합니다.
```

```Javascript
  const checkUpCount = () => {
    console.log(productQuantity);
    if (productCount >= productQuantity) {
      alert('모집 가능 인원을 초과하였습니다.');
      setProductCount(prevCount => prevCount - 1);
    }
  };
  const checkDownCount = () => {
    if (productCount <= 1) {
      alert('1명 이상만 예약 가능합니다.');
      setProductCount(prevCount => prevCount + 1);
    }
  };

  const handleUp = () => {
    checkUpCount();
    setProductCount(prevCount => prevCount + 1);
  };
  const handleDown = () => {
    checkDownCount();
    setProductCount(prevCount => prevCount - 1);
  };
```

<br>

- 구매 목록 페이지

```
구매가 진행되면 마이페이지의 구매 목록으로 이동합니다.
이 페이지에서는 사용자가 구매했던 구매 목록을 전부 불러옵니다.
최근 구매한 3개만큼의 상품을 서버에서 가져와 구매 목록에 쌓이게 되며
하단의 더보기 버튼 클릭 시 다음 데이터를 추가로 받아와 렌더링을 진행합니다.
모든 페이지의 로딩이 끝나면 더보기 버튼은 사라집니다.

판매 목록, 구매 목록, 찜 목록 모두 동일하게 데이터가 없는 경우에는
화면에 메시지가 렌더링 되도록, 서버에서 데이터를 받아오는 도중에는 스피너가 생성되도록 작성하여 ux 안정감을 부여하였습니다.
```

```Javascript
 const handleClick = e => {
    if (pageParam < totalPages) {
      getBuyList();
    } else if (pageParam === totalPages) {
      getBuyList();
      e.target.className = 'hidden';
    }
  };

  const getBuyList = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('/orders', {
        params: {
          sort: `{ "products.extra.date.endDate": -1 }`,
          page: pageParam,
          limit: 3,
        },
      });
      const list = res?.data?.item?.map(item => {
        return <ProductBuyListItem key={item?._id} item={item} />;
      });
      let newItemList = [...itemList, ...list];
      console.log('newItemList', newItemList);
      // console.log('res', res);
      let endPage = res?.data?.pagination?.totalPages;
      let nowPage = res?.data?.pagination?.page;
      setIsEnd(endPage === nowPage);

      console.log(endPage);
      setTotalPages(endPage);
      setItemList(newItemList);
      setPageParam(nowPage + 1);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };
```

<br>

- 찜 목록 페이지

```
찜 목록은 상품 메인, 상품 상세, 찜 목록에서 수행되는 하트 아이콘 클릭 action 을 기반으로, 서버에 좋아요 등록 및 해제가 수행됩니다.
재사용성을 위해 해당 아이콘 버튼을 컴포넌트로 관리를 하였습니다.

어떤 페이지에서 좋아요 기능을 원하는 경우, 상품의 정보 객체를 넘겨주면, 좋아요 기능을 붙일 수 있도록 개발하였습니다.
```

```Javascript
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

ProductLikeButton.propTypes = {
  item: PropTypes.object,
};

function ProductLikeButton({ item }) {
  // console.log('좋아요item', item);
  // const [likeState, setLikeState] = useState(false);
  let likeState = false;
  // const [productLikeId, setProductLikeId] = useState(0);
  let productLikeId = 0;
  const axios = useCustomAxios();
  const [initLikeState, setInitLikeState] = useState(false);
  //icon-heart-full.svg

  useEffect(() => {
    checkInit();
  }, []);

  const checkInit = () => {
    if (item?.myBookmarkId) {
      setInitLikeState(
        <img
          onClick={handleLikeProduct}
          className="w-6 h-6 ml-auto mr-2 cursor-pointer"
          src="/assets/icons/icon-heart-full.svg"
          alt=""
        />,
      );
      // setLikeState(false);
      likeState = false;
      productLikeId = item?.myBookmarkId;
    } else {
      // console.log('false');
      setInitLikeState(
        <img
          onClick={handleLikeProduct}
          className="w-6 h-6 ml-auto mr-2 cursor-pointer"
          src="/assets/icons/icon-heart-disabled.svg"
          alt=""
        />,
      );
      // setLikeState(true);
      likeState = true;
    }
  };

  const handleLikeProduct = async e => {
    console.log('변경 실행됨');
    // console.log('item',item?.bookmarks);
    console.log('state 상태', likeState);
    if (likeState === false) {
      try {
        await axios.delete(`/bookmarks/${productLikeId}`);
        e.target.src = '/assets/icons/icon-heart-disabled.svg';
        console.log('좋아요 제거한 경우 item._id =>', productLikeId);
        likeState = !likeState;
      } catch (err) {
        console.log(err);
      }
    } else if (likeState === true) {
      try {
        //좋아요 누를 때에는 상품 id를 보낸다.
        const res = await axios.post(`/bookmarks/product/${item?._id}`, {});
        productLikeId = res?.data?.item?._id;
        console.log(
          '좋아요 누른 경우 북마크 id 새로 세팅 =>',
          res?.data?.item?._id,
        );
        // console.log('res =>', res);
        e.target.src = '/assets/icons/icon-heart-full.svg';
        // setLikeState(prevState => !prevState);
        likeState = !likeState;
      } catch (err) {
        console.log(err);
      }
    }
  };

  return <>{initLikeState}</>;
}

export default ProductLikeButton;
```

<br>

- 회원 정보 수정하기

```
마이페이지 메인의 회원정보수정 버튼을 클릭하면 이 곳에서 프로필 이미지, 닉네임, 자기소개글, 여행 관심사를 재설정할 수 있습니다.
수정 버튼 클릭 시, 기존에 사용자가 등록했던 정보를 불러오기 위해서 기존 사용자의 정보에 담긴 데이터들을 불러옵니다.
Input text나 TextArea의 경우에는 defaultValue값을 통해 쉽게 기존 정보를 세팅할 수 있지만,
이미지와 테마의 경우에는 세부적인 작업이 필요합니다.
이미지의 경우에는 URL.createObjectURL 메서드를 통해 파일 객체의 임시 URL을 설정해줍니다.
해당 이미지 URL은 상태값으로 관리되어 이미지 ui에 보여지게 됩니다.
테마의 경우에는 테마 API에서 가져온 값과 사용자의 테마 id를 비교하여 클릭되어진 효과를 주고, 클릭 이벤트 함수를 통해 값을 변경하게 됩니다.

전체적으로 변경된 formData를 서버에 patch 함으로써 수정이 진행되고,
이 때 zustand 로 관리하는 user의 정보도 함께 업데이트를 해줍니다.
수정이 완료되면 메인 페이지에서 변경된 값으로 노출되는 마이페이지를 확인할 수 있습니다.
```

```Javascript
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

```

---

## 📲 화면 구성

|                  시작화면                   |            둘러보기(메인 페이지)             |                  회원가입                   |
| :-----------------------------------------: | :------------------------------------------: | :-----------------------------------------: |
| <img src="./assets/readme/user-doha.jpg" /> | <img  src="./assets/readme/user-doha.jpg" /> | <img src="./assets/readme/user-doha.jpg" /> |

|                   로그인                    |                 키워드 검색                  |                 필터링 검색                 |
| :-----------------------------------------: | :------------------------------------------: | :-----------------------------------------: |
| <img src="./assets/readme/user-doha.jpg" /> | <img  src="./assets/readme/user-doha.jpg" /> | <img src="./assets/readme/user-doha.jpg" /> |

|              상품 상세 페이지               |               여행장 정보 조회               |                상품 예약하기                |
| :-----------------------------------------: | :------------------------------------------: | :-----------------------------------------: |
| <img src="./assets/readme/user-doha.jpg" /> | <img  src="./assets/readme/user-doha.jpg" /> | <img src="./assets/readme/user-doha.jpg" /> |

|                  댓글 등록                  |                  댓글 수정                   |                  댓글 삭제                  |
| :-----------------------------------------: | :------------------------------------------: | :-----------------------------------------: |
| <img src="./assets/readme/user-doha.jpg" /> | <img  src="./assets/readme/user-doha.jpg" /> | <img src="./assets/readme/user-doha.jpg" /> |

|                   찜하기                    |                  마이페이지                  |                회원정보 수정                |
| :-----------------------------------------: | :------------------------------------------: | :-----------------------------------------: |
| <img src="./assets/readme/user-doha.jpg" /> | <img  src="./assets/readme/user-doha.jpg" /> | <img src="./assets/readme/user-doha.jpg" /> |

|               찜 목록 페이지                |               구매 목록 페이지               |              판매 목록 페이지               |
| :-----------------------------------------: | :------------------------------------------: | :-----------------------------------------: |
| <img src="./assets/readme/user-doha.jpg" /> | <img  src="./assets/readme/user-doha.jpg" /> | <img src="./assets/readme/user-doha.jpg" /> |

|              등록한 상품 삭제               |              타유저 프로필 조회              |            타유저 판매 목록 조회            |
| :-----------------------------------------: | :------------------------------------------: | :-----------------------------------------: |
| <img src="./assets/readme/user-doha.jpg" /> | <img  src="./assets/readme/user-doha.jpg" /> | <img src="./assets/readme/user-doha.jpg" /> |

---

## 💡 추가하고싶은 페이지 및 기능

- 유저 팔로잉 기능
- 상품 찜한 사람의 수 렌더링
- 타 유저가 찜한 상품 목록 조회
- 판매자와 채팅 기능
- 상품 상세 정보 수정 기능
- 여행에 관한 다양한 소식 콘텐츠 페이지(여행 팁, 뉴스 등)

---

## 💌 프로젝트 소감

#### 박지민

```

```

#### 류채영

```
프로젝트를 진행하는 3주 동안 다양한 코드, 에러와 싸우면서 그 어느때보다 크게 성장할 수 있었다고 생각합니다.
의욕적으로 함께 달려와준 팀원들에게 감사드리며,
이제 프로젝트 진행하면서 급격히 늘은 체중은 어떻게 효율적으로 뺄지 고민해봐야겠습니다~!!!
```

#### 양준호

```

```

#### 김도하

```
협업 할 때 생길 수 있는 다양한 이슈들을 경험할 수 있어서 좋았습니다.
많이 부족한 실력으로 프로젝트를 진행하게 되었는데,
팀원분들의 큰 도움으로 느끼고 배운 것이 많아요. 감사드립니다.
```

<br>

**[⬆️ 위로 올라갈래 ⬆️](#-목차)**

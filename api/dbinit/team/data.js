import moment from 'moment';

function getDay(day = 0) {
  return moment().add(day, 'days').format('YYYY.MM.DD');
}
function getTime(day = 0, second = 0) {
  return moment()
    .add(day, 'days')
    .add(second, 'seconds')
    .format('YYYY.MM.DD HH:mm:ss');
}

export const initData = async nextSeq => {
  return {
    // 회원
    user: [
      {
        _id: await nextSeq('user'),
        password:
          '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',

        email: 'aaa@aa.aa',
        name: '11',
        extra: {
          birthday: '20',
          address: [
            {
              id: '4',
              name: '#힐링투어',
            },
            {
              id: '5',
              name: '#무박일정',
            },
            {
              id: '6',
              name: '#성지순례',
            },
          ],
        },
        address: 'male',
        type: 'seller',
        loginType: 'email',
        createdAt: '2024.04.16 11:02:37',
        updatedAt: '2024.04.16 11:02:37',
      },
      {
        _id: await nextSeq('user'),
        password:
          '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',

        email: 'testApp@test.com',
        name: '공용테스트',
        extra: {
          birthday: '20',
          address: [
            {
              id: '4',
              name: '#힐링투어',
            },
            {
              id: '5',
              name: '#무박일정',
            },
            {
              id: '6',
              name: '#성지순례',
            },
          ],
        },
        address: 'male',
        type: 'seller',
        loginType: 'email',
        createdAt: '2024.04.16 11:02:37',
        updatedAt: '2024.04.16 11:02:37',
      },
      {
        _id: await nextSeq('user'),
        password:
          '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',

        email: 'test@test.com',
        name: '공동테스트',
        extra: {
          birthday: 30,
          address: [
            {
              id: '1',
              name: '#음주가무',
            },
            {
              id: '2',
              name: '#맛집탐방',
            },
            {
              id: '3',
              name: '#이색체험',
            },
          ],
        },
        address: 'male',
        type: 'seller',
        loginType: 'email',
        createdAt: '2024.04.16 13:28:41',
        updatedAt: '2024.04.16 13:28:41',
      },
    ],
    // 상품
    product: [
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 1000, //경비
        quantity: 10, //인원
        buyQuantity: 0,
        show: true,
        active: true,
        name: 'ZOZOFO 테이블 게임 축구 보드 사커 게임기 보드게임 2인경기 완구 가족모임 미니 월드컵 스포츠 어린이 크리스마스 선물 생일 선물', //제목
        mainImages: [
          //이미지업로드
          {
            path: '/files/01-Trip-with-me/test.jpg',
            name: 'test.jpg',
            originalname: 'test.jpg',
          },
        ],
        content: '속초 토박이 여행', //상세설명
        extra: {
          date: ['2024-04-15', '2024-04-20'], //날짜
          spot: [
            {
              id: 1,
              name: '강원도',
            },
          ], //지역
          themes: [
            {
              id: 1,
              name: '음주가무',
            },
            {
              id: 2,
              name: '친목다짐',
            },
            {
              id: 3,
              name: '이색체험',
            },
          ], //테마
          itineraryMaps: [], //지도정보
        },
      },

      {
        _id: await nextSeq('product'),
        seller_id: 2,
        price: 50000, //경비
        quantity: 10, //인원
        buyQuantity: 0,
        show: true,
        active: true,
        name: 'ZOZOFO 테이블 게임 축구 보드 사커 게임기 보드게임 2인경기 완구 가족모임 미니 월드컵 스포츠 어린이 크리스마스 선물 생일 선물', //제목
        mainImages: [
          //이미지업로드
          {
            path: '/files/01-Trip-with-me/test.jpg',
            name: 'jeonju.jpg',
            originalname: 'jeonju.jpg',
          },
        ],
        content: '전주에서 벚꽃 함께 보는 2030 여행', //상세설명
        extra: {
          date: ['2024-04-15', '2024-04-20'], //날짜
          spot: [
            {
              id: 1,
              name: '강원도',
            },
          ], //지역
          themes: [
            {
              id: 1,
              name: '음주가무',
            },
            {
              id: 2,
              name: '친목다짐',
            },
            {
              id: 3,
              name: '이색체험',
            },
          ], //테마
          itineraryMaps: [], //지도정보
        },
      },
    ],
    // 주문
    order: [],
    // 후기
    reply: [],
    // 장바구니
    cart: [],
    // 즐겨찾기/북마크
    bookmark: [],
    // QnA, 공지사항, 게시판
    post: [],
    // 코드
    code: [],
    // 설정
    config: [],
  };
};

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
        price: 1000,
        shippingFees: 0,
        show: true,
        active: true,
        name: '동행상품1',
        quantity: 10,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/01-Trip-with-me/test-image.jpg`,
            name: 'test-image.jpg',
            originalname: '테스트이미지.jpg',
          },
        ],
        content: `
          <div class="product-detail">
            <p>신나는 여행 저와 함께 가요</p>
          </div>`,
        createdAt: getTime(-35, -60 * 60 * 6),
        updatedAt: getTime(-10, -60 * 19),
        extra: {
          isNew: true,
          isBest: true,
          category: ['PC01', 'PC0103'],
          sort: 3,
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 2000,
        shippingFees: 0,
        show: true,
        active: true,
        name: '동행상품2',
        quantity: 10,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/01-Trip-with-me/test-image.jpg`,
            name: 'test-image.jpg',
            originalname: '테스트이미지2.jpg',
          },
        ],
        content: `
          <div class="product-detail">
            <p>신나는 여행 저와 함께 가요</p>
          </div>`,
        createdAt: getTime(-35, -60 * 60 * 6),
        updatedAt: getTime(-10, -60 * 19),
        extra: {
          isNew: true,
          isBest: true,
          category: ['PC01', 'PC0103'],
          sort: 3,
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

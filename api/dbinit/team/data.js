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

        email: 'testApp@test.com',
        name: '여행덕후',
        extra: {
          introduce: '언젠가는 꼭 여행마스터가 될 사나이',
          birthday: '20',
          address: [
            {
              id: '4',
              name: '🍀힐링투어',
            },
            {
              id: '5',
              name: '🔥무박일정',
            },
            {
              id: '6',
              name: '🚶🏻성지순례',
            },
          ],
        },
        address: 'male',
        type: 'seller',
        loginType: 'email',
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        profileImage: 'user1.jpg',
      },
      {
        _id: await nextSeq('user'),
        password:
          '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',

        email: 'testApp2@test.com',
        name: '양선생님',
        extra: {
          introduce: '코딩도 잘하지만 여행도 잘하는 여행 마스터',
          birthday: '20',
          address: [
            {
              id: '2',
              name: '🍖맛집탐방',
            },
            {
              id: '6',
              name: '🚶🏻성지순례',
            },
            {
              id: '14',
              name: '🔭별자리 관측',
            },
          ],
        },
        address: 'male',
        type: 'seller',
        loginType: 'email',
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        profileImage: 'user2.jpg',
      },
      {
        _id: await nextSeq('user'),
        password:
          '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',

        email: 'testApp3@test.com',
        name: '박팀장',
        extra: {
          introduce: '여행 성향 J! 제대로 여행하는 박팀장입니다.',
          birthday: '20',
          address: [
            {
              id: '4',
              name: '🍀힐링투어',
            },
            {
              id: '5',
              name: '🔥무박일정',
            },
            {
              id: '6',
              name: '🚶🏻성지순례',
            },
          ],
        },
        address: 'female',
        type: 'seller',
        loginType: 'email',
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        profileImage: 'user3.png',
      },
      {
        _id: await nextSeq('user'),
        password:
          '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',

        email: 'testApp4@test.com',
        name: '류팀원',
        extra: {
          introduce: '박팀장님이 자꾸 가입하라고 시켜서 했어요ㅠ',
          birthday: '20',
          address: [
            {
              id: '4',
              name: '🍀힐링투어',
            },
            {
              id: '5',
              name: '🔥무박일정',
            },
            {
              id: '6',
              name: '🚶🏻성지순례',
            },
          ],
        },
        address: 'female',
        type: 'seller',
        loginType: 'email',
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('user'),
        password:
          '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',

        email: 'testApp5@test.com',
        name: '김긴급',
        extra: {
          introduce: '긴급! 긴급!! 여행 가고싶어서 긴급합니다.',
          birthday: 20,
          address: [
            {
              id: '1',
              name: '🍺음주가무',
            },
            {
              id: '2',
              name: '🍖맛집탐방',
            },
            {
              id: '3',
              name: '🎪이색체험',
            },
          ],
        },
        address: 'female',
        type: 'seller',
        loginType: 'email',
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('user'),
        password:
          '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',

        email: 'testApp6@test.com',
        name: '빔캠프',
        extra: {
          introduce: '50분이 되면 칼같이 출발한다. 안...녕',
          birthday: 40,
          address: [
            {
              id: '7',
              name: '🏔️트레킹',
            },
            {
              id: '8',
              name: '🏖️물놀이',
            },
            {
              id: '10',
              name: '🎇축제',
            },
          ],
        },
        address: 'male',
        type: 'seller',
        loginType: 'email',
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        profileImage: 'user6.jpg',
      },
      {
        _id: await nextSeq('user'),
        password:
          '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',

        email: 'testApp7@test.com',
        name: '신선범',
        extra: {
          introduce: '안녕? 놀이터를 좋아하는 내 이름은 신..선범',
          birthday: 30,
          address: [
            {
              id: '1',
              name: '🍺음주가무',
            },
            {
              id: '9',
              name: '#🐟낚시',
            },
            {
              id: '11',
              name: '📸사진여행',
            },
          ],
        },
        address: 'male',
        type: 'seller',
        loginType: 'email',
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        profileImage: 'user7.jpg',
      },
      {
        _id: await nextSeq('user'),
        password:
          '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',

        email: 'testApp8@test.com',
        name: 'GD',
        extra: {
          introduce: '짭GD 아니고 제가 진짜GD',
          birthday: 40,
          address: [
            {
              id: '11',
              name: '📸사진여행',
            },
            {
              id: '14',
              name: '#🔭별자리 관측',
            },
            {
              id: '13',
              name: '⛷️스키/보드',
            },
          ],
        },
        address: 'male',
        type: 'seller',
        loginType: 'email',
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        profileImage: 'user8.jpg',
      },
    ],
    // 상품
    product: [
      {
        _id: await nextSeq('product'),
        price: 1000, //경비
        quantity: 10, //인원
        show: true,
        active: true,
        name: '2040까지 함께 떠나는 전주 여행', //제목
        mainImages: [
          //이미지업로드
          {
            path: '/files/01-Trip-with-me/jeonju.jpg',
            name: 'jeonju.jpg',
            originalname: 'jeonju.jpg',
          },
        ],
        content: '20대 여행장이 계획하는 알찬 전주여행입니다.', //상세설명
        extra: {
          date: {
            startDate: '2024.4.4.',
            endDate: '2024.4.6.',
          },
          spot: [
            {
              name: '전북도',
              id: '8',
            },
          ],
          themes: [
            {
              name: '🚶🏻성지순례',
              id: '6',
            },
            {
              name: '🍀힐링투어',
              id: '4',
            },
            {
              name: '📸사진여행',
              id: '11',
            },
          ], //테마
          itineraryMaps: [
            {
              markers: [
                {
                  title: '전주',
                  latlng: {
                    lat: 35.84836235279856,
                    lng: 127.06494919899522,
                  },
                },
                {
                  title: '객사',
                  latlng: {
                    lat: 35.81631727834969,
                    lng: 127.10953850900516,
                  },
                },
              ],
            },
            {
              markers: [
                {
                  title: '한옥마을',
                  latlng: {
                    lat: 35.82642886759795,
                    lng: 127.08830427148469,
                  },
                },
                {
                  title: '비빔밥 맛집',
                  latlng: {
                    lat: 35.82116705693226,
                    lng: 127.15735028989927,
                  },
                },
              ],
            },
          ], //지도정보
        },
        seller_id: 1,
        buyQuantity: 2,
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        seller: {
          _id: 1,
          email: 'testApp@test.com',
          name: '여행덕후',
          extra: {
            introduce: '언젠가는 꼭 여행마스터가 될 사나이',
            birthday: '20',
            address: [
              {
                id: '4',
                name: '🍀힐링투어',
              },
              {
                id: '5',
                name: '🔥무박일정',
              },
              {
                id: '6',
                name: '🚶🏻성지순례',
              },
            ],
          },
          address: 'male',
          profileImage: 'user1.jpg',
        },
        replies: [
          {
            _id: 1,
            rating: 4,
            content: '지각하셔서 1점 뺍니다',
            user: {
              _id: 2,
              name: '양선생님',
              profile: 'user2.jpg',
            },
            createdAt: '2024.04.21 20:21:46',
          },
          {
            _id: 2,
            rating: 3,
            content: '잘~ 놀다갑니다',
            user: {
              _id: 3,
              name: '박팀장',
              profile: 'user3.jpg',
            },
            createdAt: '2024.04.22 09:18:41',
          },
        ],
      },
      {
        _id: await nextSeq('product'),
        price: 1000, //경비
        quantity: 10, //인원
        show: true,
        active: true,
        name: '부산 사나이가 소개하는 진짜 부산~ 이야기', //제목
        mainImages: [
          //이미지업로드
          {
            path: '/files/01-Trip-with-me/busan.jpg',
            name: 'busan.jpg',
            originalname: 'busan.jpg',
          },
        ],
        content: '부산 사나이가 알려주는 진짜 부산 이야기와 맛집', //상세설명
        extra: {
          date: {
            startDate: '2024.4.4.',
            endDate: '2024.4.6.',
          },
          spot: [
            {
              name: '경상남도',
              id: '7',
            },
          ],
          themes: [
            {
              name: '🍖맛집탐방',
              id: '2',
            },
          ],
          itineraryMaps: [
            {
              markers: [
                {
                  title: '해운대',
                  latlng: {
                    lat: 35.19460296899083,
                    lng: 129.1496342865607,
                  },
                },
                {
                  title: '기장',
                  latlng: {
                    lat: 35.22619293780054,
                    lng: 129.20493800214624,
                  },
                },
                {
                  title: '항구 구경',
                  latlng: {
                    lat: 35.201295922979845,
                    lng: 129.22604593141486,
                  },
                },
              ],
            },
            {
              markers: [
                {
                  title: '서면 먹자 골목',
                  latlng: {
                    lat: 35.157745039128976,
                    lng: 129.05947594937717,
                  },
                },
                {
                  title: '전포동',
                  latlng: {
                    lat: 35.15317708571375,
                    lng: 129.0652419917273,
                  },
                },
              ],
            },
            {
              markers: [
                {
                  title: '서울귀가',
                  latlng: {
                    lat: 37.566797185060885,
                    lng: 126.97872018084892,
                  },
                },
              ],
            },
          ], //지도정보
        },
        seller_id: 1,
        buyQuantity: 0,
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        seller: {
          _id: 1,
          email: 'testApp@test.com',
          name: '여행덕후',
          extra: {
            introduce: '언젠가는 꼭 여행마스터가 될 사나이',
            birthday: '20',
            address: [
              {
                id: '4',
                name: '🍀힐링투어',
              },
              {
                id: '5',
                name: '🔥무박일정',
              },
              {
                id: '6',
                name: '🚶🏻성지순례',
              },
            ],
          },
          address: 'male',
          profileImage: 'user1.jpg',
        },
        replies: [
          {
            _id: 2,
            rating: 4,
            content: '매너가 정말 좋으셨습니다.',
            user: {
              _id: 2,
              name: '양선생님',
              profile: 'user2.jpg',
            },
            createdAt: '2024.04.21 20:21:46',
          },
          {
            _id: 3,
            rating: 2,
            content: '그저 그래요 소개해주신 맛집도 별로',
            user: {
              _id: 3,
              name: '박팀장',
              profile: 'user3.jpg',
            },
            createdAt: '2024.04.22 09:18:41',
          },
        ],
      },
      {
        _id: await nextSeq('product'),
        price: 50000, //경비
        quantity: 3, //인원
        show: true,
        active: true,
        name: '서울->부산 여행 같이가실 여성 동행 구합니다.', //제목
        mainImages: [
          //이미지업로드
          {
            path: '/files/01-Trip-with-me/busan2.jpg',
            name: 'busan2.jpg',
            originalname: 'busan2.jpg',
          },
        ],
        content: '제가 여자라서 여성분으로 동행 구합니다!', //상세설명
        extra: {
          date: {
            startDate: '2024.4.10',
            endDate: '2024.4.11.',
          },
          spot: [
            {
              name: '경상남도',
              id: '7',
            },
          ],
          themes: [
            {
              name: '🍖맛집탐방',
              id: '2',
            },
          ],
          itineraryMaps: [
            {
              markers: [
                {
                  title: '해운대',
                  latlng: {
                    lat: 35.19460296899083,
                    lng: 129.1496342865607,
                  },
                },
                {
                  title: '기장',
                  latlng: {
                    lat: 35.22619293780054,
                    lng: 129.20493800214624,
                  },
                },
                {
                  title: '항구 구경',
                  latlng: {
                    lat: 35.201295922979845,
                    lng: 129.22604593141486,
                  },
                },
              ],
            },
            {
              markers: [
                {
                  title: '서면 먹자 골목',
                  latlng: {
                    lat: 35.157745039128976,
                    lng: 129.05947594937717,
                  },
                },
                {
                  title: '전포동',
                  latlng: {
                    lat: 35.15317708571375,
                    lng: 129.0652419917273,
                  },
                },
              ],
            },
            {
              markers: [
                {
                  title: '서울귀가',
                  latlng: {
                    lat: 37.566797185060885,
                    lng: 126.97872018084892,
                  },
                },
              ],
            },
          ], //지도정보
        },
        seller_id: 5,
        buyQuantity: 0,
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        seller: {
          _id: 5,
          email: 'testApp4@test.com',
          name: '김긴급',
          extra: {
            introduce: '긴급!!',
            birthday: '20',
            address: [
              {
                id: '1',
                name: '🍺음주가무',
              },
              {
                id: '2',
                name: '🍖맛집탐방',
              },
              {
                id: '3',
                name: '🎪이색체험',
              },
            ],
          },
          address: 'male',
          profileImage: 'user1.jpg',
        },
        replies: [
          {
            _id: 2,
            rating: 4,
            content: '매너가 정말 좋으셨습니다.',
            user: {
              _id: 2,
              name: '양선생님',
              profile: 'user2.jpg',
            },
            createdAt: '2024.04.21 20:21:46',
          },
          {
            _id: 3,
            rating: 2,
            content: '그저 그래요 소개해주신 맛집도 별로',
            user: {
              _id: 3,
              name: '박팀장',
              profile: 'user3.jpg',
            },
            createdAt: '2024.04.22 09:18:41',
          },
        ],
      },
      {
        _id: await nextSeq('product'),
        price: 30000, //경비
        quantity: 4, //인원
        show: true,
        active: true,
        name: '대전에서 축제 같이 즐기실 분', //제목
        mainImages: [
          //이미지업로드
          {
            path: '/files/01-Trip-with-me/daejeon.jpg',
            name: 'daejeon.jpg',
            originalname: 'daejeon.jpg',
          },
        ],
        content:
          '대전에서 둔산동 맛집 투어 하고, 카이스트 캠퍼스투어까지 함께 해요', //상세설명
        extra: {
          date: {
            startDate: '2024.4.26.',
            endDate: '2024.4.27.',
          },
          spot: [
            {
              name: '충청북도',
              id: '4',
            },
          ],
          themes: [
            {
              name: '💭기타',
              id: '15',
            },
            {
              name: '🎇축제',
              id: '10',
            },
          ], //테마
          itineraryMaps: [
            {
              markers: [
                {
                  title: '모임 집결 장소',
                  latlng: {
                    lat: 36.35520168130279,
                    lng: 127.39201034380585,
                  },
                },
                {
                  title: '둔산동 투어',
                  latlng: {
                    lat: 36.350818846989704,
                    lng: 127.3874430814711,
                  },
                },
              ],
            },
            {
              markers: [
                {
                  title: '카이스트 캠퍼스 투어',
                  latlng: {
                    lat: 36.392597920277225,
                    lng: 127.39817248251049,
                  },
                },
              ],
            },
          ], //지도정보
        },
        seller_id: 3,
        buyQuantity: 0,
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        seller: {
          _id: 3,
          email: 'testApp3@test.com',
          name: '박팀장',
          extra: {
            introduce: '여행 성향 J! 제대로 여행하는 박팀장입니다.',
            birthday: '20',
            address: [
              {
                id: '4',
                name: '🍀힐링투어',
              },
              {
                id: '5',
                name: '🔥무박일정',
              },
              {
                id: '6',
                name: '🚶🏻성지순례',
              },
            ],
          },
          address: 'female',
          profileImage: 'user3.jpg',
        },
        replies: [
          {
            _id: 1,
            rating: 4,
            content: '나쁘지 않았던 것 같아요',
            user: {
              _id: 2,
              name: '양선생님',
              profile: 'user2.jpg',
            },
            createdAt: '2024.04.21 20:21:46',
          },
          {
            _id: 2,
            rating: 3,
            content: '여행장을 맡으신 지역을 정말 잘 아시더라구요',
            user: {
              _id: 1,
              name: '여행덕후',
              profile: 'user1.jpg',
            },
            createdAt: '2024.04.22 09:18:41',
          },
        ],
      },
      {
        _id: await nextSeq('product'),
        price: 3000, //경비
        quantity: 4, //인원
        show: true,
        active: true,
        name: '같이 서울숲 산책하실 분 구해요', //제목
        mainImages: [
          //이미지업로드
          {
            path: '/files/01-Trip-with-me/seoul2.jpg',
            name: 'seoul2.jpg',
            originalname: 'seoul2.jpg',
          },
        ],
        content:
          '요즘 서울숲이 너무 푸르르던데 같이 걸어요~ 저랑 성향 맞는분만', //상세설명
        extra: {
          date: {
            startDate: '2024.4.26.',
            endDate: '2024.4.26.',
          },
          spot: [
            {
              name: '서울시',
              id: '1',
            },
          ],
          themes: [
            {
              name: '💭기타',
              id: '15',
            },
            {
              name: '🎇축제',
              id: '10',
            },
          ], //테마
          itineraryMaps: [
            {
              markers: [
                {
                  title: '남산야경🌆',
                  latlng: {
                    lat: 37.54874265219565,
                    lng: 126.98952108573636,
                  },
                },
                {
                  title: '남산돈까스(저녁)',
                  latlng: {
                    lat: 37.55775195022113,
                    lng: 126.98354408688576,
                  },
                },
              ],
            },
          ], //지도정보
        },
        seller_id: 3,
        buyQuantity: 0,
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        seller: {
          _id: 3,
          email: 'testApp3@test.com',
          name: '박팀장',
          extra: {
            introduce: '여행 성향 J! 제대로 여행하는 박팀장입니다.',
            birthday: '20',
            address: [
              {
                id: '4',
                name: '🍀힐링투어',
              },
              {
                id: '5',
                name: '🔥무박일정',
              },
              {
                id: '6',
                name: '🚶🏻성지순례',
              },
            ],
          },
          address: 'female',
          profileImage: 'user3.jpg',
        },
        replies: [
          {
            _id: 1,
            rating: 4,
            content: '나쁘지 않았던 것 같아요',
            user: {
              _id: 2,
              name: '양선생님',
              profile: 'user2.jpg',
            },
            createdAt: '2024.04.21 20:21:46',
          },
          {
            _id: 2,
            rating: 3,
            content: '여행장을 맡으신 지역을 정말 잘 아시더라구요',
            user: {
              _id: 1,
              name: '여행덕후',
              profile: 'user1.jpg',
            },
            createdAt: '2024.04.22 09:18:41',
          },
        ],
      },
      {
        _id: await nextSeq('product'),
        price: 30000, //경비
        quantity: 4, //인원
        show: true,
        active: true,
        name: '같이 청계천 산책하실 분 구해요', //제목
        mainImages: [
          //이미지업로드
          {
            path: '/files/01-Trip-with-me/seoul.jpg',
            name: 'seoul.jpg',
            originalname: 'seoul.jpg',
          },
        ],
        content: '같이 산책하고 맛있는 커피도 먹어봐요', //상세설명
        extra: {
          date: {
            startDate: '2024.4.26.',
            endDate: '2024.4.26.',
          },
          spot: [
            {
              name: '서울시',
              id: '1',
            },
          ],
          themes: [
            {
              name: '💭기타',
              id: '15',
            },
            {
              name: '🍀힐링투어',
              id: '4',
            },
            {
              name: '📸사진여행',
              id: '11',
            },
          ], //테마
          itineraryMaps: [
            {
              markers: [
                {
                  title: '반포한강야경',
                  latlng: {
                    lat: 37.50758513918781,
                    lng: 126.99287463303486,
                  },
                },
                {
                  title: '강남역저녁🍺',
                  latlng: {
                    lat: 37.49864537850799,
                    lng: 127.02173543245195,
                  },
                },
              ],
            },
          ], //지도정보
        },
        seller_id: 3,
        buyQuantity: 0,
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        seller: {
          _id: 3,
          email: 'testApp3@test.com',
          name: '박팀장',
          extra: {
            introduce: '여행 성향 J! 제대로 여행하는 박팀장입니다.',
            birthday: '20',
            address: [
              {
                id: '4',
                name: '🍀힐링투어',
              },
              {
                id: '5',
                name: '🔥무박일정',
              },
              {
                id: '6',
                name: '🚶🏻성지순례',
              },
            ],
          },
          address: 'female',
          profileImage: 'user3.jpg',
        },
        replies: [
          {
            _id: 1,
            rating: 5,
            content: '친구랑 함께 갔는데 너무 재미있었어요',
            user: {
              _id: 4,
              name: '류팀원',
              profile: 'user4.jpg',
            },
            createdAt: '2024.04.21 20:21:46',
          },
          {
            _id: 2,
            rating: 5,
            content: '날씨가 좋아서 더 좋았네요',
            user: {
              _id: 5,
              name: '김긴급',
              profile: 'user5.jpg',
            },
            createdAt: '2024.04.22 09:18:41',
          },
        ],
      },
      {
        _id: await nextSeq('product'),
        price: 130000, //경비
        quantity: 4, //인원
        show: true,
        active: true,
        name: '같이 서울에서 워터밤 가실 분 구합니다.', //제목
        mainImages: [
          //이미지업로드
          {
            path: '/files/01-Trip-with-me/seoul3.jpg',
            name: 'seoul3.jpg',
            originalname: 'seoul3.jpg',
          },
        ],
        content: '워터밤에서 즐겁게 물총놀이 하실 분~ 신청주세요', //상세설명
        extra: {
          date: {
            startDate: '2024.4.26.',
            endDate: '2024.4.26.',
          },
          spot: [
            {
              name: '서울시',
              id: '1',
            },
          ],
          themes: [
            {
              name: '💭기타',
              id: '15',
            },
            {
              name: '🎇축제',
              id: '10',
            },
          ], //테마
          itineraryMaps: [
            {
              markers: [
                {
                  title: '워터밤 시작지점',
                  latlng: {
                    lat: 37.50758513918781,
                    lng: 126.99287463303486,
                  },
                },
                {
                  title: '뒷풀이 장소🍺',
                  latlng: {
                    lat: 37.49864537850799,
                    lng: 127.02173543245195,
                  },
                },
              ],
            },
          ], //지도정보
        },
        seller_id: 3,
        buyQuantity: 0,
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        seller: {
          _id: 3,
          email: 'testApp6@test.com',
          name: '빔캠프',
          extra: {
            introduce: '여50분이 되면 칼같이 출발한다. 안...녕',
            birthday: '20',
            address: [
              {
                id: '7',
                name: '🏔️트레킹',
              },
              {
                id: '8',
                name: '🏖️물놀이',
              },
              {
                id: '10',
                name: '🎇축제',
              },
            ],
          },
          address: 'male',
          profileImage: 'user6.jpg',
        },
        replies: [
          {
            _id: 1,
            rating: 5,
            content: '이 분은 역시 전문가이시구나 느꼈습니다.',
            user: {
              _id: 7,
              name: '신선범',
              profile: 'user7.jpg',
            },
            createdAt: '2024.04.21 20:21:46',
          },
          {
            _id: 2,
            rating: 4,
            content: '아주 매너 굳 이십니다',
            user: {
              _id: 8,
              name: 'GD',
              profile: 'user8.jpg',
            },
            createdAt: '2024.04.22 09:18:41',
          },
        ],
      },
      {
        _id: await nextSeq('product'),
        price: 130000, //경비
        quantity: 4, //인원
        show: true,
        active: true,
        name: '5월, 순천으로 같이 떠나실래요?', //제목
        mainImages: [
          //이미지업로드
          {
            path: '/files/01-Trip-with-me/sooncheon.jpeg',
            name: 'sooncheon.jpeg',
            originalname: 'sooncheon.jpeg',
          },
        ],
        content:
          '순천에 엄청나게 아름다운 절경을 함께 볼 분들! 힐링 가득 투어 선물할게요', //상세설명
        extra: {
          date: {
            startDate: '2024.5.4.',
            endDate: '2024.5.5.',
          },
          spot: [
            {
              name: '경상남도',
              id: '7',
            },
          ],
          themes: [
            {
              name: '🍖맛집탐방',
              id: '2',
            },
            {
              name: '🍀힐링투어',
              id: '4',
            },
            {
              name: '📸사진여행',
              id: '11',
            },
          ], //테마
          itineraryMaps: [
            {
              markers: [
                {
                  title: '순천역(점심은 찌개🥘)',
                  latlng: {
                    lat: 34.94555077636031,
                    lng: 127.50340995780796,
                  },
                },
                {
                  title: '순천만습지☘️',
                  latlng: {
                    lat: 34.928911737539764,
                    lng: 127.49893041106004,
                  },
                },
                {
                  title: '호수정원🌈',
                  latlng: {
                    lat: 34.93044311874832,
                    lng: 127.51216114589093,
                  },
                },
              ],
            },
            {
              markers: [
                {
                  title: '낙안읍성🛖',
                  latlng: {
                    lat: 34.906091329162365,
                    lng: 127.34180036094352,
                  },
                },
                {
                  title: '사또밥상🍜',
                  latlng: {
                    lat: 34.90457120635063,
                    lng: 127.34385107645117,
                  },
                },
                {
                  title: '박물관',
                  latlng: {
                    lat: 34.90355477191597,
                    lng: 127.33988604138563,
                  },
                },
              ],
            },
          ], //지도정보
        },
        seller_id: 3,
        buyQuantity: 0,
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        seller: {
          _id: 3,
          email: 'testApp6@test.com',
          name: 'GD',
          extra: {
            introduce: '짭GD 아니고 제가 진짜GD',
            birthday: '40',
            address: [
              {
                id: '11',
                name: '📸사진여행',
              },
              {
                id: '14',
                name: '#🔭별자리 관측',
              },
              {
                id: '13',
                name: '⛷️스키/보드',
              },
            ],
          },
          address: 'male',
          profileImage: 'user8.jpg',
        },
        replies: [
          {
            _id: 1,
            rating: 5,
            content: '사진을 너무 잘 찍어주십니다~',
            user: {
              _id: 2,
              name: '양선생님',
              profile: 'user2.jpg',
            },
            createdAt: '2024.04.21 20:21:46',
          },
          {
            _id: 2,
            rating: 1,
            content: '즐거웠으나 맛집은 별로',
            user: {
              _id: 1,
              name: '여행덕후',
              profile: 'user1.jpg',
            },
            createdAt: '2024.04.22 09:18:41',
          },
        ],
      },
    ],
    // 주문
    order: [
      {
        _id: await nextSeq('order'),
        user_id: 4,
        products: [
          {
            _id: 1,
            seller_id: 1,
            name: '2040까지 함께 떠나는 전주 여행',
            image: {
              path: '/files/01-Trip-with-me/jeonju.jpg',
              name: 'jeonju.jpg',
              originalname: 'jeonju.jpg',
            },
            extra: {
              date: {
                startDate: '2024.4.4.',
                endDate: '2024.4.6.',
              },
            },
            price: 1000, //경비
            quantity: 2,
          },
        ],
        cost: {
          products: 1000,
          total: 2000,
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 6,
        products: [
          {
            _id: 1,
            seller_id: 1,
            name: '2040까지 함께 떠나는 전주 여행',
            image: {
              path: '/files/01-Trip-with-me/jeonju.jpg',
              name: 'jeonju.jpg',
              originalname: 'jeonju.jpg',
            },
            extra: {
              date: {
                startDate: '2024.4.4.',
                endDate: '2024.4.6.',
              },
            },
            price: 1000, //경비
            quantity: 2,
          },
        ],
        cost: {
          products: 1000,
          total: 2000,
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 7,
        products: [
          {
            _id: 1,
            seller_id: 1,
            name: '2040까지 함께 떠나는 전주 여행',
            image: {
              path: '/files/01-Trip-with-me/jeonju.jpg',
              name: 'jeonju.jpg',
              originalname: 'jeonju.jpg',
            },
            extra: {
              date: {
                startDate: '2024.4.4.',
                endDate: '2024.4.6.',
              },
            },
            price: 1000, //경비
            quantity: 2,
          },
        ],
        cost: {
          products: 1000,
          total: 1000,
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 8,
        products: [
          {
            _id: 1,
            seller_id: 1,
            name: '2040까지 함께 떠나는 전주 여행',
            image: {
              path: '/files/01-Trip-with-me/jeonju.jpg',
              name: 'jeonju.jpg',
              originalname: 'jeonju.jpg',
            },
            extra: {
              date: {
                startDate: '2024.4.4.',
                endDate: '2024.4.6.',
              },
            },
            price: 1000, //경비
            quantity: 1,
          },
        ],
        cost: {
          products: 1000,
          total: 1000,
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 3,
        products: [
          {
            _id: 1,
            seller_id: 1,
            name: '전주비빔밥 먹으러 떠나볼까요?',
            image: {
              path: '/files/01-Trip-with-me/jeonju.jpg',
              name: 'jeonju.jpg',
              originalname: 'jeonju.jpg',
            },
            extra: {
              date: {
                startDate: '2024.4.19.',
                endDate: '2024.4.20.',
              },
            },
            price: 1000, //경비
            quantity: 2,
          },
        ],
        cost: {
          products: 1000,
          total: 2000,
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 2,
        products: [
          {
            _id: 1,
            seller_id: 2,
            name: '2040까지 함께 떠나는 전주 여행',
            image: {
              path: '/files/01-Trip-with-me/jeonju.jpg',
              name: 'jeonju.jpg',
              originalname: 'jeonju.jpg',
            },
            extra: {
              date: {
                startDate: '2024.4.4.',
                endDate: '2024.4.6.',
              },
            },
            price: 1000, //경비
            quantity: 2,
          },
        ],
        cost: {
          products: 1000,
          total: 2000,
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 2,
        products: [
          {
            _id: 1,
            seller_id: 2,
            name: '2040까지 함께 떠나는 전주 여행',
            image: {
              path: '/files/01-Trip-with-me/jeonju.jpg',
              name: 'jeonju.jpg',
              originalname: 'jeonju.jpg',
            },
            extra: {
              date: {
                startDate: '2024.4.4.',
                endDate: '2024.4.6.',
              },
            },
            price: 1000, //경비
            quantity: 2,
          },
        ],
        cost: {
          products: 1000,
          total: 2000,
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 2,
        products: [
          {
            _id: 2,
            seller_id: 1,
            name: '부산 사나이가 소개하는 진짜 부산~ 이야기',
            image: {
              path: '/files/01-Trip-with-me/busan.jpg',
              name: 'busan.jpg',
              originalname: 'busan.jpg',
            },
            extra: {
              date: {
                startDate: '2024.4.4.',
                endDate: '2024.4.6.',
              },
            },
            price: 1000, //경비
            quantity: 2,
          },
        ],
        cost: {
          products: 1000,
          total: 2000,
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 3,
        products: [
          {
            _id: 2,
            seller_id: 1,
            name: '부산 사나이가 소개하는 진짜 부산~ 이야기',
            image: {
              path: '/files/01-Trip-with-me/busan.jpg',
              name: 'busan.jpg',
              originalname: 'busan.jpg',
            },
            extra: {
              date: {
                startDate: '2024.4.4.',
                endDate: '2024.4.6.',
              },
            },
            price: 1000, //경비
            quantity: 2,
          },
        ],
        cost: {
          products: 1000,
          total: 2000,
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 4,
        products: [
          {
            _id: 2,
            seller_id: 1,
            name: '부산 사나이가 소개하는 진짜 부산~ 이야기',
            image: {
              path: '/files/01-Trip-with-me/busan.jpg',
              name: 'busan.jpg',
              originalname: 'busan.jpg',
            },
            extra: {
              date: {
                startDate: '2024.4.4.',
                endDate: '2024.4.6.',
              },
            },
            price: 1000, //경비
            quantity: 2,
          },
        ],
        cost: {
          products: 1000,
          total: 2000,
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 2,
        products: [
          {
            _id: 3,
            seller_id: 5,
            name: '서울->부산 여행 같이가실 여성 동행 구합니다.',
            image: {
              path: '/files/01-Trip-with-me/busan2.jpg',
              name: 'busan2.jpg',
              originalname: 'busan2.jpg',
            },
            extra: {
              date: {
                startDate: '2024.4.10',
                endDate: '2024.4.11.',
              },
            },
            price: 50000, //경비
            quantity: 1,
          },
        ],
        cost: {
          products: 50000,
          total: 50000,
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 4,
        products: [
          {
            _id: 3,
            seller_id: 5,
            name: '서울->부산 여행 같이가실 여성 동행 구합니다.',
            image: {
              path: '/files/01-Trip-with-me/busan2.jpg',
              name: 'busan2.jpg',
              originalname: 'busan2.jpg',
            },
            extra: {
              date: {
                startDate: '2024.4.10',
                endDate: '2024.4.11.',
              },
            },
            price: 50000, //경비
            quantity: 1,
          },
        ],
        cost: {
          products: 50000,
          total: 50000,
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 1,
        products: [
          {
            _id: 3,
            seller_id: 5,
            name: '서울->부산 여행 같이가실 여성 동행 구합니다.',
            image: {
              path: '/files/01-Trip-with-me/busan2.jpg',
              name: 'busan2.jpg',
              originalname: 'busan2.jpg',
            },
            extra: {
              date: {
                startDate: '2024.4.10',
                endDate: '2024.4.11.',
              },
            },
            price: 50000, //경비
            quantity: 1,
          },
        ],
        cost: {
          products: 50000,
          total: 50000,
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 1,
        products: [
          {
            _id: 4,
            seller_id: 3,
            name: '대전에서 축제 같이 즐기실 분',
            image: {
              path: '/files/01-Trip-with-me/daejeon.jpg',
              name: 'daejeon.jpg',
              originalname: 'daejeon.jpg',
            },
            extra: {
              date: {
                startDate: '2024.4.26.',
                endDate: '2024.4.27.',
              },
            },
            price: 30000, //경비
            quantity: 1,
          },
        ],
        cost: {
          products: 30000,
          total: 30000,
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 1,
        products: [
          {
            _id: 5,
            seller_id: 3,
            name: '같이 서울숲 산책하실 분 구해요',
            image: {
              path: '/files/01-Trip-with-me/seoul2.jpg',
              name: 'seoul2.jpg',
              originalname: 'seoul2.jpg',
            },
            extra: {
              date: {
                startDate: '2024.4.26.',
                endDate: '2024.4.26.',
              },
            },
            price: 3000, //경비
            quantity: 1,
          },
        ],
        cost: {
          products: 3000,
          total: 3000,
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 2,
        products: [
          {
            _id: 5,
            seller_id: 3,
            name: '같이 서울숲 산책하실 분 구해요',
            image: {
              path: '/files/01-Trip-with-me/seoul2.jpg',
              name: 'seoul2.jpg',
              originalname: 'seoul2.jpg',
            },
            extra: {
              date: {
                startDate: '2024.4.26.',
                endDate: '2024.4.26.',
              },
            },
            price: 50000, //경비
            quantity: 1,
          },
        ],
        cost: {
          products: 3000,
          total: 3000,
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 4,
        products: [
          {
            _id: 5,
            seller_id: 3,
            name: '같이 서울숲 산책하실 분 구해요',
            image: {
              path: '/files/01-Trip-with-me/seoul2.jpg',
              name: 'seoul2.jpg',
              originalname: 'seoul2.jpg',
            },
            extra: {
              date: {
                startDate: '2024.4.26.',
                endDate: '2024.4.26.',
              },
            },
            price: 50000, //경비
            quantity: 1,
          },
        ],
        cost: {
          products: 3000,
          total: 3000,
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 2,
        products: [
          {
            _id: 6,
            seller_id: 3,
            name: '같이 청계천 산책하실 분 구해요',
            image: {
              path: '/files/01-Trip-with-me/seoul.jpg',
              name: 'seoul.jpg',
              originalname: 'seoul.jpg',
            },
            extra: {
              date: {
                startDate: '2024.4.26.',
                endDate: '2024.4.26.',
              },
            },
            price: 30000, //경비
            quantity: 1,
          },
        ],
        cost: {
          products: 30000,
          total: 30000,
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 1,
        products: [
          {
            _id: 6,
            seller_id: 3,
            name: '같이 청계천 산책하실 분 구해요',
            image: {
              path: '/files/01-Trip-with-me/seoul.jpg',
              name: 'seoul.jpg',
              originalname: 'seoul.jpg',
            },
            extra: {
              date: {
                startDate: '2024.4.26.',
                endDate: '2024.4.26.',
              },
            },
            price: 30000, //경비
            quantity: 1,
          },
        ],
        cost: {
          products: 30000,
          total: 30000,
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 4,
        products: [
          {
            _id: 6,
            seller_id: 3,
            name: '같이 청계천 산책하실 분 구해요',
            image: {
              path: '/files/01-Trip-with-me/seoul.jpg',
              name: 'seoul.jpg',
              originalname: 'seoul.jpg',
            },
            extra: {
              date: {
                startDate: '2024.4.26.',
                endDate: '2024.4.26.',
              },
            },
            price: 30000, //경비
            quantity: 1,
          },
        ],
        cost: {
          products: 30000,
          total: 30000,
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 4,
        products: [
          {
            _id: 7,
            seller_id: 3,
            name: '같이 서울에서 워터밤 가실 분 구합니다.',
            image: {
              path: '/files/01-Trip-with-me/seoul3.jpg',
              name: 'seoul3.jpg',
              originalname: 'seoul3.jpg',
            },
            extra: {
              date: {
                startDate: '2024.4.26.',
                endDate: '2024.4.26.',
              },
            },
            price: 130000, //경비
            quantity: 1,
          },
        ],
        cost: {
          products: 130000,
          total: 130000,
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 1,
        products: [
          {
            _id: 7,
            seller_id: 3,
            name: '같이 서울에서 워터밤 가실 분 구합니다.',
            image: {
              path: '/files/01-Trip-with-me/seoul3.jpg',
              name: 'seoul3.jpg',
              originalname: 'seoul3.jpg',
            },
            extra: {
              date: {
                startDate: '2024.4.26.',
                endDate: '2024.4.26.',
              },
            },
            price: 130000, //경비
            quantity: 1,
          },
        ],
        cost: {
          products: 130000,
          total: 130000,
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
    ],
    // 후기
    reply: [
      {
        _id: await nextSeq('reply'),
        user_id: 4,
        order_id: 1,
        product_id: 1,
        rating: 4,
        content: '좋더라구요 특히 친절하신 설명이 좋았습니다. ',
        createdAt: getTime(-4, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('reply'),
        user_id: 3,
        order_id: 2,
        product_id: 1,
        rating: 5,
        content: '시간약속을 잘 지키시는 모습이 좋았어요',
        createdAt: getTime(-4, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('reply'),
        user_id: 2,
        order_id: 3,
        product_id: 1,
        rating: 2,
        content: '그냥 쏘쏘 경치는 좋았어요',
        createdAt: getTime(-4, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('reply'),
        user_id: 2,
        order_id: 4,
        product_id: 2,
        rating: 5,
        content: '사진을 너무 잘 찍어주셨어요',
        createdAt: getTime(-4, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('reply'),
        user_id: 3,
        order_id: 5,
        product_id: 2,
        rating: 4,
        content: '현지인 맛집을 추천해주셨어요',
        createdAt: getTime(-4, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('reply'),
        user_id: 4,
        order_id: 6,
        product_id: 2,
        rating: 5,
        content: '멋있는 뷰를 잘 감상할 수 있었습니다. .',
        createdAt: getTime(-4, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('reply'),
        user_id: 2,
        order_id: 7,
        product_id: 3,
        rating: 4,
        content: '여자분이라 대하기가 편했어요! ',
        createdAt: getTime(-4, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('reply'),
        user_id: 4,
        order_id: 8,
        product_id: 3,
        rating: 5,
        content: '성격이 너무 좋으셔서 금방 친해졌어요',
        createdAt: getTime(-4, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('reply'),
        user_id: 1,
        order_id: 9,
        product_id: 3,
        rating: 2,
        content: '저는 성향이 잘 안맞았어요 ㅠ',
        createdAt: getTime(-4, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('reply'),
        user_id: 1,
        order_id: 10,
        product_id: 4,
        rating: 5,
        content: '교통 지원이 가능해서 아주 좋았어요',
        createdAt: getTime(-4, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('reply'),
        user_id: 1,
        order_id: 11,
        product_id: 5,
        rating: 5,
        content: '많은 분들과 잘 어울리게 도와주셨어요',
        createdAt: getTime(-4, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('reply'),
        user_id: 2,
        order_id: 12,
        product_id: 5,
        rating: 3,
        content: '말투는 친절하셨는데, 루트가 좀 애매했어요',
        createdAt: getTime(-4, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('reply'),
        user_id: 4,
        order_id: 13,
        product_id: 5,
        rating: 5,
        content: '리더십 있게 여행을 계획해주셨어요',
        createdAt: getTime(-4, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('reply'),
        user_id: 2,
        order_id: 14,
        product_id: 6,
        rating: 5,
        content: '유머러스하셔서 편하게 여행했어요~',
        createdAt: getTime(-4, -60 * 60 * 12),
      },
    ],
    // 장바구니
    cart: [],
    // 즐겨찾기/북마크
    bookmark: [
      // {
      //   _id: await nextSeq('bookmark'),
      //   user_id: 1,
      //   type: 'product',
      //   target_id: 2,
      //   product: {
      //     _id: 2,
      //     name: '부산 사나이가 소개하는 진짜 부산~ 이야기',
      //     price: 1000,
      //     quantity: 10,
      //     buyQuantity: 4,
      //     image: {
      //       path: '/files/01-Trip-with-me/busan.jpg',
      //       name: 'busan.jpg',
      //       originalname: 'busan.jpg',
      //     },
      //   },
      //   memo: {},
      //   createdAt: getTime(-3, -60 * 60 * 2),
      // },
      // {
      //   _id: await nextSeq('bookmark'),
      //   user_id: 1,
      //   type: 'product',
      //   target_id: 3,
      //   product: {
      //     _id: 3,
      //     name: '서울->부산 여행 같이가실 여성 동행 구합니다.',
      //     price: 50000,
      //     quantity: 3,
      //     buyQuantity: 0,
      //     image: {
      //       path: '/files/01-Trip-with-me/busan2.jpg',
      //       name: 'busan2.jpg',
      //       originalname: 'busan2.jpg',
      //     },
      //   },
      //   memo: {},
      //   createdAt: getTime(-3, -60 * 60 * 2),
      // },
      // {
      //   _id: await nextSeq('bookmark'),
      //   user_id: 1,
      //   type: 'product',
      //   target_id: 4,
      //   product: {
      //     _id: 4,
      //     name: '대전에서 축제 같이 즐기실 분',
      //     price: 30000,
      //     quantity: 4,
      //     buyQuantity: 0,
      //     image: {
      //       path: '/files/01-Trip-with-me/daejeon.jpg',
      //       name: 'daejeon.jpg',
      //       originalname: 'daejeon.jpg',
      //     },
      //   },
      //   memo: {},
      //   createdAt: getTime(-3, -60 * 60 * 2),
      // },
    ],
    // QnA, 공지사항, 게시판
    post: [
      {
        _id: await nextSeq('post'),
        content: '안녕하세요 남자 여자 상관 없이 참여 가능한가요 ? ',
        type: 'comment',
        product_id: 4,
        user: {
          _id: 1,
          name: '여행덕후',
          profile: 'user1.jpg',
        },
      },
      {
        _id: await nextSeq('post'),
        content: '안...녕 즐거운 여행 되세요',
        type: 'comment',
        product_id: 1,
        user: {
          _id: 6,
          name: '빔캠프',
          profile: 'user6.jpg',
        },
      },
      {
        _id: await nextSeq('post'),
        content: '재미있어보여요 대박',
        type: 'comment',
        product_id: 1,
        user: {
          _id: 7,
          name: '신선범',
          profile: 'user7.jpg',
        },
      },
      {
        _id: await nextSeq('post'),
        content: '제 제자들과 함께 가도 될까요?',
        type: 'comment',
        product_id: 1,
        user: {
          _id: 3,
          name: 'GD',
          profile: 'user8.jpg',
        },
      },
      {
        _id: await nextSeq('post'),
        content: 'ㅋㅋ여기 진짜 맛집인데',
        type: 'comment',
        product_id: 1,
        user: {
          _id: 4,
          name: '류팀원',
        },
      },
      {
        _id: await nextSeq('post'),
        content: '센스있으신 분인 듯!?!',
        type: 'comment',
        product_id: 2,
        user: {
          _id: 4,
          name: '류팀원',
        },
      },
      {
        _id: await nextSeq('post'),
        content: '반려동물과 같이 갈 수 있을까요?',
        type: 'comment',
        product_id: 2,
        user: {
          _id: 5,
          name: '김긴급',
        },
      },
    ],
    // 코드
    code: [
      {
        _id: 'travelSpot',
        title: '여행지',
        codes: [
          {
            name: '서울시',
            id: '1',
          },
          {
            name: '경기도',
            id: '2',
          },
          {
            name: '인천광역시',
            id: '3',
          },
          {
            name: '충청북도',
            id: '4',
          },
          {
            name: '충청남도',
            id: '5',
          },
          {
            name: '경상북도',
            id: '6',
          },
          {
            name: '경상남도',
            id: '7',
          },
          {
            name: '전북도',
            id: '8',
          },
          {
            name: '전라남도',
            id: '9',
          },
          {
            name: '강원도',
            id: '10',
          },
          {
            name: '제주도',
            id: '11',
          },
          {
            name: '광주광역시',
            id: '12',
          },
          {
            name: '울산광역시',
            id: '13',
          },
          {
            name: '부산광역시',
            id: '14',
          },
          {
            name: '대구광역시',
            id: '15',
          },
          {
            name: '대전광역시',
            id: '16',
          },
        ],
      },
      {
        _id: 'travelThemes',
        title: '여행테마',
        codes: [
          {
            name: '음주가무',
            id: '1',
          },
          {
            name: '맛집탐방',
            id: '2',
          },
          {
            name: '이색체험',
            id: '3',
          },
          {
            name: '힐링투어',
            id: '4',
          },
          {
            name: '무박일정',
            id: '5',
          },
          {
            name: '성지순례',
            id: '6',
          },
          {
            name: '트레킹',
            id: '7',
          },
          {
            name: '물놀이',
            id: '8',
          },
          {
            name: '낚시',
            id: '9',
          },
          {
            name: '축제',
            id: '10',
          },
          {
            name: '사진여행',
            id: '11',
          },
          {
            name: '캠핑',
            id: '12',
          },
          {
            name: '스키/보드',
            id: '13',
          },
          {
            name: '별자리 관측',
            id: '14',
          },
          {
            name: '기타',
            id: '15',
          },
        ],
      },
    ],
    // 설정
    config: [],
  };
};

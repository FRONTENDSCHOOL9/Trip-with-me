import useCustomAxios from '@hooks/useCustomAxios.mjs';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  Polyline,
  useKakaoLoader,
  useMap,
} from 'react-kakao-maps-sdk';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Comment from './productDetail/Comment';
import Review from '@pages/product/Review';
import { BeatLoader } from 'react-spinners';
import useMemberState from '@zustand/memberState.mjs';
import ProductLikeButton from '@components/ProductLikeButton';
import usePageStore from '@zustand/pageName.mjs';

function ProductDetail() {
  const axios = useCustomAxios();
  const { _id } = useParams();
  const navigate = useNavigate();
  const page = '게시물 상세 페이지';
  const setPageName = usePageStore(state => state.setPageName);
  const [productInfo, setProductInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useMemberState();
  const apiKey = import.meta.env.VITE_KAKAO_MAP_API_KEY;

  useKakaoLoader({
    appkey: apiKey,
    libraries: ['clusterer', 'drawing', 'services'],
  });

  useEffect(() => {
    getData();

    console.log(_id);
  }, []);

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/products/${_id}`);
      setProductInfo(res.data);
      console.log(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/seller/products/${_id}`);
      navigate('/product/list');
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
        <BeatLoader color="#68A9ED" />
      </div>
    );
  }

  const isSeller = productInfo?.item?.seller?._id === user?._id;

  const formattedPrice = productInfo?.item?.price
    ? new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
      }).format(productInfo.item.price)
    : '0원';

  const ReSettingMapBounds = ({ markers }) => {
    const map = useMap();
    const bounds = useMemo(() => {
      const bounds = new kakao.maps.LatLngBounds();

      markers.forEach(marker => {
        bounds.extend(
          new kakao.maps.LatLng(marker.latlng.lat, marker.latlng.lng),
        );
      });
      return bounds;
    }, [markers]);

    useEffect(() => {
      if (map && bounds) {
        map.setBounds(bounds);
        setPageName(page);
      }
    }, [map, bounds]);
  };

  return (
    <div className="h-full bg-mainbg-color font-notosans">
      <div className="flex flex-col bg-mainbg-color ">
        <div className="h-56 mx-auto mt-6 mb-6 border-2 border-gray-300 shadow-xl rounded-2xl w-96 bg-light-gray">
          <img
            src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${productInfo?.item?.mainImages[0].name}`}
            alt="Loading Image"
            className="w-full h-full rounded-2xl"
          />
        </div>
        <div className="flex items-center justify-between mt-2 ml-6">
          <h2 className="text-2xl font-bold">{productInfo?.item?.name}</h2>
          <p className="mr-5 font-semibold">{formattedPrice}원</p>
        </div>
        <div className="flex items-center justify-between ml-5 ">
          <ul className="flex gap-2 my-4">
            {productInfo?.item?.extra?.themes.map((theme, index) => (
              <li
                key={theme.id}
                className="px-4 py-1 text-sm font-medium border-2 rounded-full"
              >
                #{theme.name}
              </li>
            ))}
          </ul>

          {isSeller && (
            <div className="mr-5 px-2 py-1 border-[1px] rounded-lg text-warning-color border-warning-color ">
              <button className="text-sm" onClick={handleDelete}>
                상품 삭제
              </button>
            </div>
          )}
        </div>
        <Tabs className="mx-5">
          <TabList className="flex mb-4">
            <Tab className="flex-grow py-2 text-center cursor-pointer ">
              상품설명
            </Tab>
            <Tab className="flex-grow py-2 text-center cursor-pointer">
              여행장 정보
            </Tab>
          </TabList>
          <TabPanel>
            <div>
              <p className="mb-2 text-lg font-medium">여행일정</p>
              <div>
                <ul className="flex flex-col gap-2 p-4 text-xs rounded-lg bg-[#dddddd] shadow-lg">
                  <div className="flex items-center ">
                    <img
                      className="w-5 h-5 mr-2"
                      src="/src/assets/icons/icon-map-location.svg"
                      alt="위치"
                    />
                    <p className="shrink">
                      {productInfo?.item?.extra?.spot[0].name}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <img
                      className="w-5 h-5 mr-2"
                      src="/src/assets/icons/icon-map-date.svg"
                      alt="위치"
                    />
                    <p>
                      {productInfo?.item?.extra?.date.startDate.slice(5)}~
                      {productInfo?.item?.extra?.date.endDate.slice(5)}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <img
                      className="w-5 h-5 mr-2"
                      src="/src/assets/icons/icon-map-people.svg"
                      alt="위치"
                    />
                    <p>최대 {productInfo?.item?.quantity}명</p>
                  </div>
                </ul>
              </div>
            </div>

            <div className="flex flex-col">
              <Tabs>
                <TabList className="flex gap-1 mt-6 mb-2 ">
                  {productInfo?.item?.extra?.itineraryMaps.map((_, index) => (
                    <Tab
                      className="px-4 py-1 text-sm border-2 rounded-full"
                      key={index}
                    >
                      {index + 1}일차
                    </Tab>
                  ))}
                </TabList>

                {productInfo?.item?.extra?.itineraryMaps.map(
                  (dayPlan, index) => (
                    <TabPanel key={index}>
                      <Map
                        className="shadow-lg rounded-xl"
                        center={
                          dayPlan.markers[0]
                            ? dayPlan.markers[0].latlng
                            : { lat: 33.450701, lng: 126.570667 }
                        }
                        style={{ width: '100%', height: '300px' }}
                        level={3}
                        draggable={false}
                      >
                        {dayPlan.markers.map((marker, markerIndex) => (
                          <React.Fragment key={`${index}-${markerIndex}`}>
                            <MapMarker
                              position={marker.latlng}
                              title={marker.title || 'No title'}
                              image={{
                                src: '/src/assets/icons/icon-map-pin.svg',
                                size: {
                                  width: 35,
                                  height: 70,
                                },
                              }}
                            />
                            <CustomOverlayMap
                              position={marker.latlng}
                              className=" translate-y-[-100%] "
                            >
                              <span className="p-1 bg-white border rounded-lg border-rose-300">
                                {marker.title
                                  ? `${markerIndex + 1}-${marker.title}`
                                  : markerIndex + 1}
                              </span>
                            </CustomOverlayMap>
                          </React.Fragment>
                        ))}
                        {dayPlan && (
                          <ReSettingMapBounds markers={dayPlan.markers} />
                        )}
                        <Polyline
                          path={dayPlan?.markers.map(marker => marker.latlng)}
                          strokeWeight={5}
                          strokeColor={'#FC7C7C'}
                          strokeOpacity={1}
                          strokeStyle={'solid'} // 선의 스타일입니다
                        />
                      </Map>
                    </TabPanel>
                  ),
                )}
              </Tabs>
            </div>
            <div className="border-b-2">
              <p className="mt-6 mb-2 text-lg font-medium">여행소개</p>
              <div className="mb-8 ml-2 ">
                <p className="px-6 py-4 text-sm bg-gray-200 rounded-lg shadow-lg description-box">
                  {productInfo?.item?.content}
                </p>
              </div>
            </div>

            <div>
              <Comment />
            </div>
          </TabPanel>
          <TabPanel>
            <div>
              <div className="pb-4 mt-6 mb-3 border-b-2 ">
                <div className="profile-box h-[390px] mt-4 mx-6 flex flex-col items-center justify-center mb-4 shadow-xl relative">
                  <h3 className="absolute font-bold top-4 left-4">Trip Card</h3>
                  <div className="w-32 h-32 mx-auto mt-20 mb-3 overflow-hidden rounded-full">
                    <img
                      className="w-full h-full "
                      src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${productInfo?.item?.seller?.profileImage}`}
                      alt="프로필 이미지"
                    />
                  </div>
                  <div className="absolute bottom-[182px] left-4">
                    <p className="text-xl font-semibold text-white ">
                      {productInfo?.item?.seller?.name}
                    </p>
                    <p className="text-sm font-light text-gray-700">
                      {productInfo?.item?.seller?.extra.birthday}대{' '}
                      {productInfo?.item?.seller?.address === 'male'
                        ? '남성'
                        : '여성'}
                    </p>
                  </div>
                  <div className="w-full p-4 mt-16 bg-gray-300 rounded-2xl top-box-shadow profile-box-sub">
                    <p className="text-lg font-semibold">여행 관심사</p>
                    <ul className="flex justify-center gap-2 my-2 text-sm ">
                      {productInfo?.item?.seller?.extra.address.map(theme => (
                        <li
                          key={theme.id}
                          className="px-4 py-1 border-2 rounded-full"
                        >
                          {theme.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <Review seller_id={productInfo?.item?.seller_id} />
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default ProductDetail;

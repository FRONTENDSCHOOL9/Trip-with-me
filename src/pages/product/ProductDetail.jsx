import useCustomAxios from '@hooks/useCustomAxios.mjs';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  useKakaoLoader,
  useMap,
} from 'react-kakao-maps-sdk';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Comment from './productDetail/Comment';
import Review from '@pages/product/Review';
import { BeatLoader } from 'react-spinners';

function ProductDetail() {
  const axios = useCustomAxios();
  const { _id } = useParams();
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      await axios.delete(`/products/${_id}`);
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
      }
    }, [map, bounds]);
  };

  return (
    <div className="flex flex-col bg-mainbg-color font-notosans">
      <div className="h-56 mx-auto my-0 mb-6 overflow-hidden rounded-lg w-96 bg-light-gray">
        <img
          src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${productInfo?.item?.mainImages[0].name}`}
          alt="Loading Image"
          className="w-full h-full"
        />
      </div>
      <div className="flex justify-between mt-5 ml-6 text-base font-semibold">
        <h2>{productInfo?.item?.name}</h2>
        <p className="mr-5"> {formattedPrice}원</p>
      </div>
      <div className="ml-5">
        <ul className="flex gap-2 my-4">
          {productInfo?.item?.extra.themes.map((theme, index) => (
            <li key={theme.id} className="px-4 py-1 border-2 rounded-full">
              #{theme.name}
            </li>
          ))}
        </ul>
        <div>
          <button onClick={handleDelete}>상품 삭제</button>
        </div>
      </div>
      <Tabs className="mx-5">
        <TabList className="flex mb-4">
          <Tab className="flex-grow py-2 text-center ">상품설명</Tab>
          <Tab className="flex-grow py-2 text-center">여행장 정보</Tab>
        </TabList>
        <TabPanel>
          <div>
            <p className="mb-2 text-lg font-semibold">여행일정</p>
            <div>
              <ul className="flex flex-col gap-2 p-4 text-xs rounded-lg bg-light-gray">
                <div className="flex ">
                  <img
                    className="w-4 h-4 mr-2"
                    src="/src/assets/icons/icon-map-location.svg"
                    alt="위치"
                  />
                  <span className="shrink">
                    {productInfo?.item?.extra.spot[0].name}
                  </span>
                </div>
                <div className="flex">
                  <img
                    className="w-4 h-4 mr-2"
                    src="/src/assets/icons/icon-map-date.svg"
                    alt="위치"
                  />
                  <span>
                    {productInfo?.item?.extra.date.startDate.slice(5)}~
                    {productInfo?.item?.extra.date.endDate.slice(5)}
                  </span>
                </div>
                <div className="flex">
                  <img
                    className="w-4 h-4 mr-2"
                    src="/src/assets/icons/icon-map-people.svg"
                    alt="위치"
                  />
                  <span>최대 {productInfo?.item?.quantity}명</span>
                </div>
              </ul>
            </div>
          </div>

          <div className="flex flex-col">
            <Tabs>
              <TabList className="flex">
                {productInfo?.item?.extra.itineraryMaps.map((_, index) => (
                  <Tab className="p-1 m-1" key={index}>
                    {index + 1}일차
                  </Tab>
                ))}
              </TabList>

              {productInfo?.item?.extra.itineraryMaps.map((dayPlan, index) => (
                <TabPanel key={index}>
                  <Map
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
                  </Map>
                </TabPanel>
              ))}
            </Tabs>
          </div>
          <div className="border-b-2">
            <p className="mt-2 text-lg font-semibold">여행소개</p>
            <div className="pb-10 ml-2 ">
              <p className="text-sm">{productInfo?.item?.content}</p>
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
  );
}

export default ProductDetail;

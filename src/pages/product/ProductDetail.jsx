import useCustomAxios from '@hooks/useCustomAxios.mjs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  useKakaoLoader,
} from 'react-kakao-maps-sdk';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

function ProductDetail() {
  const axios = useCustomAxios();
  const { _id } = useParams();
  const [productInfo, setProductInfo] = useState(null);

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
    try {
      const res = await axios.get(`/products/${_id}`);
      setProductInfo(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const formattedPrice = productInfo?.item?.price
    ? new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
      }).format(productInfo.item.price)
    : '0원';

  return (
    <div className="flex flex-col ">
      <div className="h-56 mx-auto my-0 mb-6 rounded-lg w-96 bg-light-gray">
        <img
          src={`${import.meta.env.VITE_API_SERVER}/files/01-Trip-with-me/${productInfo?.item?.mainImages[0]}`}
          alt="Loaded Image"
        />
      </div>
      <div className="flex justify-between mx-3.5 mt-4 text-base font-semibold">
        <h2>{productInfo?.item?.name}</h2>
        <p>{formattedPrice}원</p>
      </div>
      <div>
        <ul className="flex gap-2 my-4">
          {productInfo?.item?.extra.themes.map((theme, index) => (
            <li key={index} className="px-4 py-1 border-2 rounded-full">
              #{theme.name}
            </li>
          ))}
        </ul>
        <button type="button">
          <img src="" alt="" />
          <i className="ir">상품 수정 및 삭제</i>
        </button>
      </div>
      {/* <div className="flex justify-around pt-6 font-medium border-t-2">

        <button>상품 설명</button>
        <button>여행장 정보</button>
      </div> */}
      <Tabs>
        <TabList className="flex ">
          <Tab className="flex-grow py-2 text-center ">상품설명</Tab>
          <Tab className="flex-grow py-2 text-center">여행장 정보</Tab>
        </TabList>
        <TabPanel>
          <div>
            <p className="text-lg font-semibold ">여행일정</p>
            <div>
              <ul className="flex flex-col gap-2 p-4 text-xs rounded-lg bg-light-gray">
                <li>{productInfo?.item?.extra.spot[0].name}</li>
                <li>
                  {productInfo?.item?.extra.date.startDate.slice(5)}~
                  {productInfo?.item?.extra.date.endDate.slice(5)}
                </li>
                <li>최대 {productInfo?.item?.quantity}명</li>
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
                  </Map>
                </TabPanel>
              ))}
            </Tabs>
          </div>
          {/* <div></div> 지도 API */}
          <div>
            <p className="text-lg font-semibold ">여행소개</p>
            <div className="pb-10 border-b-2 ">
              <p className="text-sm">{productInfo?.item?.content}</p>
              {/* <ul className="flex flex-col gap-2 p-4 text-sm rounded-lg ">
                <li>fdf</li>
                <li>dfdf</li>
                <li>dfdf</li>
              </ul> */}
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold ">댓글</p>
          </div>
        </TabPanel>
        <TabPanel>{/* 여행장 정보 내용 */}</TabPanel>
      </Tabs>
    </div>
  );
}

export default ProductDetail;

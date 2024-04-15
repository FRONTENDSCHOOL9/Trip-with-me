import KakaoMap from '@pages/product/addproduct/map/KakaoMap';
import { useItineraryMapStore } from '@zustand/itineraryMaps.mjs';
import { useProductInfostore } from '@zustand/productInfo.mjs';
import { useState, useEffect } from 'react';

import './productStyle/Map.css';

function AddItinerary() {
  const { addItineraryMap, itineraryMaps, removeItineraryMap } =
    useItineraryMapStore();

  const { productInfo, setProductInfo } = useProductInfostore();

  const [maps, setMaps] = useState([]);
  const [selectedIndex, setSeletedIndex] = useState(0);

  const addMap = e => {
    e.preventDefault();
    addMapComponent(); // 지도 화면 컴포넌트 추가
    addItineraryMap({ markers: [] }); // 지도 마커 데이터 추가
    console.log(itineraryMaps);
  };

  const addMapComponent = () => {
    const index = maps.length;
    setMaps([...maps, <KakaoMap key={index} id={index} />]); //
  };

  const showMap = index => {
    setSeletedIndex(index);
  };

  const removeMap = e => {
    e.preventDefault();
    if (maps.length === 0) return;

    const lastIndex = maps.length - 1;
    const updatedMaps = maps.filter((_, index) => index !== lastIndex);
    setMaps(updatedMaps);

    removeItineraryMap(lastIndex);

    if (selectedIndex === lastIndex) {
      setSeletedIndex(selectedIndex > 0 ? selectedIndex - 1 : 0);
      // 이전 지도를 선택한 상태로 업데이트
    }
  };

  const saveItineraryMaps = () => {
    setProductInfo({
      extra: {
        itineraryMaps: itineraryMaps,
      },
    });
    console.log(productInfo);
  };

  useEffect(() => {
    saveItineraryMaps();
  }, [itineraryMaps]);

  return (
    <div className=" w-full flex flex-col justify-center  ">
      <div className="flex justify-center ">
        <button
          className="text-2xl  font-semibold text-main-color mt-20"
          type="button"
          onClick={addMap}
        >
          여행지도 추가하기
          <p className=" m-auto text-center w-fit text-sm mt-2 border-2 border-main-color  px-4 py-2 rounded-full ">
            Click!
          </p>
        </button>
      </div>

      <div>
        <div className="flex flex-wrap">
          {maps.map((_, index) => {
            return (
              <button
                onClick={() => showMap(index)}
                className="p-2 text-base  font-semibold text-main-color"
                key={index}
              >
                {index + 1}일차
              </button>
            );
          })}
        </div>

        <div>{maps[selectedIndex]}</div>
        <button onClick={removeMap}>여행지도 삭제하기</button>
      </div>
      <button onClick={saveItineraryMaps}>저장</button>
    </div>
  );
}

export default AddItinerary;

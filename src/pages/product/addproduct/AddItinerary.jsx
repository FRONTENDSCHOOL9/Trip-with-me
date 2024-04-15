import { Button } from '@components/style/StyledButton';
import KakaoMap from '@pages/product/addproduct/map/KakaoMap';
import { useItineraryMapStore } from '@zustand/itineraryMaps.mjs';
import { useProductInfostore } from '@zustand/productInfo.mjs';
import { useState, useEffect } from 'react';

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
    <div>
      <button type="button" onClick={addMap}>
        여행지도 추가하기
      </button>

      <div>
        {maps.map((_, index) => {
          return (
            <button onClick={() => showMap(index)} className="p-2" key={index}>
              {index + 1}일차
            </button>
          );
        })}

        <div>{maps[selectedIndex]}</div>
        <button onClick={removeMap}>여행지도 삭제하기</button>
      </div>
      <Button onClick={saveItineraryMaps}>다음</Button>
    </div>
  );
}

export default AddItinerary;

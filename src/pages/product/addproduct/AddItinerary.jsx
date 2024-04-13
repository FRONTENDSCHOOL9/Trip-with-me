import KakaoMap from '@pages/product/addproduct/map/KakaoMap';
import { useItineraryMapStore } from '@zustand/itineraryMaps.mjs';
import { useState } from 'react';

function AddItinerary() {
  const { addItineraryMap, itineraryMaps } = useItineraryMapStore();

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
    console.log(selectedIndex);
    console.log(itineraryMaps);
  };

  return (
    <div>
      <button type="button" onClick={addMap}>
        Click! <br />
        여행지도를 추가해보세요
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
      </div>
    </div>
  );
}

export default AddItinerary;

import KakaoMap from '@pages/product/addproduct/map/KakaoMap';
import { useState } from 'react';
import PropTypes from 'prop-types';

import './productStyle/Map.css';
import { useNavigate, useParams } from 'react-router-dom';

AddItinerary.propTypes = {
  productInfo: PropTypes.object.isRequired,
  setProductInfo: PropTypes.func,
};

AddItinerary.defaultProps = {
  productInfo: {},
  setProductInfo: () => {}, // 빈 함수로 기본값 설정
};

function AddItinerary({ productInfo, setProductInfo }) {
  const navigate = useNavigate();
  const { step } = useParams();

  const [itineraryMaps, setItineraryMaps] = useState([{ markers: [] }]);
  const [mapLength, setMapLength] = useState(1);
  const [selectedIndex, setSeletedIndex] = useState(0);

  const addMap = e => {
    e.preventDefault();
    setMapLength(prevLength => prevLength + 1); // 지도 개수 증가
    setSeletedIndex(mapLength);
    addItineraryMap({ markers: [] }); // 지도 마커 데이터 추가
  };

  const addItineraryMap = newMap => {
    setItineraryMaps(prevMaps => [...prevMaps, newMap]);
  };

  const removeMap = e => {
    e.preventDefault();
    if (mapLength === 0) return;
    setMapLength(prevLength => prevLength - 1); // 지도 개수 감소
    removeItineraryMap(mapLength - 1); // 마지막 지도 삭제
    if (selectedIndex === mapLength - 1) {
      setSeletedIndex(Math.max(0, selectedIndex - 1)); // 선택된 인덱스 조정
    }
  };

  const removeItineraryMap = id => {
    setItineraryMaps(prevMaps => prevMaps.filter((_, index) => index !== id));
  };

  const saveItineraryMaps = () => {
    if (productInfo && setProductInfo) {
      navigate(`/product/add/${+step + 1}`);
      setProductInfo({
        ...productInfo,
        extra: {
          ...productInfo.extra,
          itineraryMaps: itineraryMaps,
        },
      });
    }
    navigate(`/product/add/${+step + 1}`);
  };

  const handlePrevButton = e => {
    e.preventDefault();
    navigate(`/product/add/${+step - 1}`);
  };

  return (
    <div className="flex flex-col justify-center w-full ">
      <div className="flex justify-center ">
        <button
          className="text-2xl font-semibold text-main-color"
          type="button"
          onClick={addMap}
        >
          여행 동선을 표시해보세요.
          <p className="px-1 py-1 m-auto mt-2 mb-2 text-sm text-center border-2 rounded-full w-fit border-main-color">
            Click!
          </p>
        </button>
      </div>

      <div>
        <div>
          <div className="flex flex-wrap">
            {Array.from({ length: mapLength }, (_, index) => (
              <button
                onClick={() => setSeletedIndex(index)}
                className={`p-2 mb-2 text-base ${selectedIndex === index ? 'rounded-full border-2 border-main-color bg-light-gray' : 'border-0'} text-main-color`}
                key={index}
              >
                {index + 1}일차
              </button>
            ))}
          </div>
        </div>

        <KakaoMap
          key={selectedIndex}
          id={selectedIndex}
          setItineraryMaps={setItineraryMaps}
          itineraryMaps={itineraryMaps}
        />
        <button
          onClick={removeMap}
          className="p-2 text-base font-semibold text-main-color"
        >
          여행지도 삭제하기
        </button>
      </div>
      {/* <button onClick={saveItineraryMaps}>저장</button> */}
      <div className="flex items-center justify-between mx-auto mt-20 w-96">
        <button
          type="button"
          onClick={handlePrevButton}
          className="px-10 py-3 text-xl font-medium text-white rounded-full bg-main-color"
        >
          이전
        </button>
        <p className="text-xl font-medium"> 4 / 7</p>
        <button
          type="button"
          onClick={saveItineraryMaps}
          className="px-10 py-3 text-xl font-medium text-white rounded-full bg-main-color"
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default AddItinerary;

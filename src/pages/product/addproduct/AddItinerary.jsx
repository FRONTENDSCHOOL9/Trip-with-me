import KakaoMap from '@pages/product/addproduct/map/KakaoMap';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './productStyle/Map.css';
import { useNavigate, useParams } from 'react-router-dom';

AddItinerary.propTypes = {
  productInfo: PropTypes.object.isRequired,
  setProductInfo: PropTypes.func,
};

AddItinerary.defaultProps = {
  productInfo: {},
  setProductInfo: () => {},
};

function AddItinerary({ productInfo, setProductInfo }) {
  const navigate = useNavigate();
  const { step } = useParams();

  const [itineraryMaps, setItineraryMaps] = useState(() => {
    return productInfo?.extra?.itineraryMaps &&
      productInfo?.extra?.itineraryMaps.length > 0
      ? productInfo?.extra?.itineraryMaps
      : [{ markers: [] }];
  });
  const [mapLength, setMapLength] = useState(itineraryMaps.length);
  const [selectedIndex, setSeletedIndex] = useState(0); //지도추가,삭제 시 개수 조정할때 필요함

  const startDate = new Date(productInfo.extra.date.startDate);
  const endDate = new Date(productInfo.extra.date.endDate);
  const itineraryDays =
    Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  useEffect(() => {
    if (
      productInfo?.extra?.itineraryMaps &&
      productInfo?.extra?.itineraryMaps.length > 0
    ) {
      setItineraryMaps(productInfo?.extra?.itineraryMaps);
      setMapLength(productInfo?.extra?.itineraryMaps.length);
    }
  }, [productInfo]);

  const addMap = e => {
    e.preventDefault();
    if (mapLength < itineraryDays) setMapLength(prevLength => prevLength + 1); // 지도가 days(여행일차)보다 작을때만 지도추가
    setSeletedIndex(mapLength);
    addItineraryMap({ markers: [] });
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
      setSeletedIndex(Math.max(0, selectedIndex - 1)); // setSeletedIndex가 0보다 작아지지 않게
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
      <div className="flex flex-col justify-center">
        <button
          className="my-5 text-2xl font-semibold text-main-color"
          type="button"
          onClick={addMap}
          disabled={mapLength >= itineraryDays}
        >
          여행 동선을 표시해보세요.
          <p
            className={`px-4 py-2 m-auto mt-4 text-sm text-center border-2 rounded-full w-fit ${mapLength < itineraryDays ? 'border-main-color' : 'text-slate-400 border-slate-400'}`}
          >
            지도 추가
          </p>
        </button>
        <div className="w-full mb-5 ml-4 text-left">
          <p className="text-sm text-slate-400">
            - 여행 일차만큼 지도를 추가해주세요.
          </p>
          <p className="text-sm text-slate-400">
            - 지도 안의 원하는 장소를 클릭하여 동선을 표시해보세요.
          </p>
          <p className="text-sm text-slate-400">
            - 마커를 한번 더 클릭하면 내용을 입력 할 수 있어요.
          </p>
        </div>
      </div>

      <div>
        <div>
          <div className="flex flex-wrap gap-2 ml-4">
            {Array.from({ length: mapLength }, (_, index) => (
              <button
                onClick={() => setSeletedIndex(index)}
                className={`px-3 py-1 text-sm ${selectedIndex === index ? 'rounded-full border-2 border-main-color' : 'rounded-full border-2 '} text-main-color`}
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

        <div className="flex justify-end">
          <button
            onClick={removeMap}
            className={`border-2 my-4 px-3 py-1 rounded-full border-main-color text-sm font-semibold text-main-color ${mapLength > 1 ? '' : 'invisible'}`}
          >
            삭제
          </button>
        </div>

        {mapLength !== itineraryDays ? (
          <p className="text-sm font-medium text-center text-warning-color ">
            {itineraryDays}일차 동선까지 추가해주세요.
          </p>
        ) : (
          ''
        )}
      </div>
      {/* <button onClick={saveItineraryMaps}>저장</button> */}
      <div className="flex items-center justify-between mx-auto mt-8 mb-12 w-96">
        <button
          type="button"
          onClick={handlePrevButton}
          className="px-10 py-3 text-xl font-semibold text-white rounded-full bg-main-color"
        >
          이전
        </button>
        <p className="font-semibold text-m"> 4 / 7</p>
        <button
          type="button"
          disabled={mapLength !== itineraryDays}
          onClick={saveItineraryMaps}
          className={`px-10 py-3 text-xl  font-semibold text-white rounded-full bg-main-color ${mapLength !== itineraryDays ? 'bg-slate-400' : 'bg-main-color'}`}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default AddItinerary;

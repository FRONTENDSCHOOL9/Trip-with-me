import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useProductInfostore } from '@zustand/productInfo.mjs';
import { useEffect, useState } from 'react';

function ProductSelectSpot() {
  const { productInfo, setProductInfo } = useProductInfostore();
  const [showUploadPrompt, setShowUploadPrompt] = useState(false);

  const axios = useCustomAxios();

  const [tripSpots, setTripSpots] = useState([]);

  useEffect(() => {
    getTripSpot();
  }, []);

  const getTripSpot = async () => {
    try {
      const { data } = await axios.get(import.meta.env.VITE_TRAVEL_SPOT_API);
      setTripSpots(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckboxChange = spot => {
    const selectedSpots = productInfo.extra.spot.slice(); // 현재 선택된 여행 장소 배열 복제
    const spotIndex = selectedSpots.indexOf(spot); // 선택한 여행 장소가 이미 선택되었는지 확인

    if (spotIndex === -1 && selectedSpots.length < 1) {
      // 선택되지 않은 경우 배열에 추가하고, 선택된 장소의 수가 1개 이하인 경우
      selectedSpots.push(spot);
    } else if (spotIndex !== -1) {
      // 이미 선택된 경우 배열에서 제거
      selectedSpots.splice(spotIndex, 1);
    }
    // 이전 상태의 구조를 유지하면서 extra에 새로운 데이터를 추가
    setProductInfo({
      extra: {
        ...productInfo.extra,
        spot: selectedSpots,
      },
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = event => {
    event.preventDefault();
    if (!productInfo.extra.spot || productInfo.extra.spot.length === 0) {
      setShowUploadPrompt(true);
      return;
    }
  };
  console.log(productInfo);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <p className="my-20 text-2xl font-semibold font-notosans text-main-color">
          여행지를 골라주세요.
        </p>
        <ul className="flex flex-wrap items-center justify-center m-6  gap-x-2 gap-y-4 font-notosans">
          {tripSpots.map((spot, id) => (
            <li key={id}>
              <label
                className={`flex border-2  rounded-full py-1 px-4 cursor-pointer ${
                  productInfo.extra.spot.includes(spot)
                    ? 'border-main-color border-2 '
                    : 'border-light-gray'
                }`}
              >
                <input
                  className="hidden"
                  type="checkbox"
                  checked={productInfo.extra.spot.includes(spot)}
                  onChange={() => handleCheckboxChange(spot)}
                  disabled={
                    productInfo.extra.spot.length >= 1 &&
                    !productInfo.extra.spot.includes(spot)
                  }
                />
                {spot.name}
              </label>
            </li>
          ))}
        </ul>
        {showUploadPrompt && (
          <p className="text-sm font-medium text-warning-color font-notosans">
            여행지를 선택해주세요.
          </p>
        )}
        <button type="submit">다음</button>
      </form>
    </div>
  );
}

export default ProductSelectSpot;

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
    const selectedSpots = productInfo.selectSpot.slice(); // 현재 선택된 여행 장소 배열 복제
    const spotIndex = selectedSpots.indexOf(spot); // 선택한 여행 장소가 이미 선택되었는지 확인

    if (spotIndex === -1 && selectedSpots.length < 1) {
      // 선택되지 않은 경우 배열에 추가하고, 선택된 장소의 수가 1개 이하인 경우
      selectedSpots.push(spot);
    } else if (spotIndex !== -1) {
      // 이미 선택된 경우 배열에서 제거
      selectedSpots.splice(spotIndex, 1);
    }
    setProductInfo({ selectSpot: selectedSpots });
    // 상태 업데이트
  };

  // 폼 제출 핸들러
  const handleSubmit = event => {
    event.preventDefault();
    if (productInfo.selectSpot.length === 0) {
      setShowUploadPrompt(true); // 여행 장소를 선택하지 않은 경우 안내 문구를 표시합니다.
    } else {
      // 여기서 추가적인 작업 수행 가능
    }
  };

  console.log(productInfo);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <p className="text-2xl font-notosans font-semibold text-main-color my-20">
          여행지를 골라주세요.
        </p>
        <ul className=" m-6 flex flex-wrap  gap-x-2 gap-y-4 justify-center items-center font-notosans ">
          {tripSpots.map((spot, id) => (
            <li key={id}>
              <label
                className={`flex border-2  rounded-full py-1 px-4 cursor-pointer ${
                  productInfo.selectSpot.includes(spot)
                    ? 'border-main-color border-2 '
                    : 'border-light-gray'
                }`}
              >
                <input
                  className="hidden"
                  type="checkbox"
                  checked={productInfo.selectSpot.includes(spot)}
                  onChange={() => handleCheckboxChange(spot)}
                  disabled={
                    productInfo.selectSpot.length >= 1 &&
                    !productInfo.selectSpot.includes(spot)
                  }
                />
                {spot.name}
              </label>
            </li>
          ))}
        </ul>
        {showUploadPrompt && (
          <p className="text-warning-color font-notosans font-medium text-sm">
            여행지를 선택해주세요.
          </p>
        )}
        <button type="submit">다음</button>
      </form>
    </div>
  );
}

export default ProductSelectSpot;

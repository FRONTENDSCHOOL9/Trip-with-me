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
    const selectedSpots = productInfo.extra.spot.slice();
    const spotIndex = selectedSpots.indexOf(spot);

    if (spotIndex === -1 && selectedSpots.length < 1) {
      selectedSpots.push(spot);
    } else if (spotIndex !== -1) {
      selectedSpots.splice(spotIndex, 1);
    }
    setProductInfo({
      extra: {
        ...productInfo.extra,
        spot: selectedSpots,
      },
    });
    // 여행지를 다시 선택하면 메시지를 숨깁니다.
    setShowUploadPrompt(false);
  };

  // 폼 제출 핸들러
  const handleSubmit = event => {
    event.preventDefault();
    if (!productInfo.extra.spot || productInfo.extra.spot.length === 0) {
      setShowUploadPrompt(true);
      return;
    }
    // 여행지가 선택되었을 때 다음 단계로 이동
    setShowUploadPrompt(false);
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

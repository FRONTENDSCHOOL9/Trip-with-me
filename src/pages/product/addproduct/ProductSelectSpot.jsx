import { useProductInfostore } from '@zustand/productInfo.mjs';
import { useEffect, useState } from 'react';

function ProductSelectSpot() {
  const { productInfo, setProductInfo } = useProductInfostore();

  const [tripSpots, setTripSpots] = useState([]);
  useEffect(() => {
    fetch('https://660fa056356b87a55c51d7b9.mockapi.io/api/v1/tripSpot')
      .then(response => response.json())
      .then(data => setTripSpots(data));
  }, []);

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

    // 상태 업데이트
    setProductInfo({ selectSpot: selectedSpots });
  };

  // 폼 제출 핸들러
  const handleSubmit = event => {
    event.preventDefault(); // 폼 기본 동작 방지
    // 여기서 추가적인 작업 수행 가능
  };

  console.log(productInfo);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>여행지를 골라주세요.</p>
        <ul className="flex flex-wrap">
          {tripSpots.map((spot, id) => (
            <li className="px-4 py-2" key={id}>
              <label>
                <input
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
        <button type="submit">다음</button>
      </form>
    </div>
  );
}

export default ProductSelectSpot;

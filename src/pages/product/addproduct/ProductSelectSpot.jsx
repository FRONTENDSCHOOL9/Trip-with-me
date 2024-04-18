import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

ProductSelectSpot.propTypes = {
  productInfo: PropTypes.object,
  setProductInfo: PropTypes.func,
};

function ProductSelectSpot({ productInfo, setProductInfo }) {
  const navigate = useNavigate();
  const { step } = useParams();

  const [showUploadPrompt, setShowUploadPrompt] = useState(false);
  const [tripSpots, setTripSpots] = useState([]);
  const [selectedSpots, setSelectedSpots] = useState([]);

  const axios = useCustomAxios();

  useEffect(() => {
    getTripSpot();
  }, []);

  useEffect(() => {
    setSelectedSpots(productInfo.extra.spot || []);
  }, [productInfo.extra.spot]);

  const getTripSpot = async () => {
    try {
      const { data } = await axios.get(import.meta.env.VITE_TRAVEL_SPOT_API);
      setTripSpots(data);
      // 이전에 선택한 여행지 정보를 사용하여 초기 selectedSpots 상태 설정
      const initialSelectedSpots = productInfo.extra.spot || [];
      setSelectedSpots(initialSelectedSpots);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckboxChange = spot => {
    const isAlreadySelected = selectedSpots.some(
      selectedSpot => selectedSpot.id === spot.id,
    );

    if (isAlreadySelected) {
      // 이미 선택된 여행지인 경우, 선택 해제
      const updatedSelectedSpots = selectedSpots.filter(
        selectedSpot => selectedSpot.id !== spot.id,
      );
      setSelectedSpots(updatedSelectedSpots);
      setProductInfo({
        ...productInfo,
        extra: {
          ...productInfo.extra,
          spot: updatedSelectedSpots,
        },
      });
    } else {
      // 선택되지 않은 여행지인 경우, 선택 추가 (단, 하나만 선택 가능하도록 함)
      setSelectedSpots([spot]);
      setProductInfo({
        ...productInfo,
        extra: {
          ...productInfo.extra,
          spot: [spot],
        },
      });
    }
    setShowUploadPrompt(false);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!selectedSpots || selectedSpots.length === 0) {
      setShowUploadPrompt(true);
      return;
    }
    navigate(`/product/add/${+step + 1}`);
    setShowUploadPrompt(false);
  };

  const handlePrevButton = e => {
    e.preventDefault();
    navigate(`/product/add/${+step - 1}`);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <p className="my-20 text-2xl font-semibold font-notosans text-main-color">
          여행지를 골라주세요.
        </p>
        <ul className="flex flex-wrap items-center justify-center m-6 gap-x-2 gap-y-4 font-notosans">
          {tripSpots.map((spot, id) => (
            <li key={id}>
              <label
                className={`flex border-2 rounded-full py-1 px-4 cursor-pointer ${
                  selectedSpots.some(
                    selectedSpot => selectedSpot.id === spot.id,
                  )
                    ? 'border-main-color border-2 '
                    : 'border-light-gray'
                }`}
              >
                <input
                  className="hidden"
                  type="checkbox"
                  checked={selectedSpots.some(
                    selectedSpot => selectedSpot.id === spot.id,
                  )}
                  onChange={() => handleCheckboxChange(spot)}
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
        <div className="flex items-center justify-between mt-20 w-96">
          <button
            type="button"
            onClick={handlePrevButton}
            className="px-10 py-3 text-xl font-medium text-white rounded-full bg-main-color"
          >
            이전
          </button>
          <p className="text-xl font-medium"> 5 / 7</p>
          <button
            type="submit"
            className="px-10 py-3 text-xl font-medium text-white rounded-full bg-main-color"
          >
            다음
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductSelectSpot;

import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ProductSelectSpot({ productInfo, setProductInfo }) {
  const [showUploadPrompt, setShowUploadPrompt] = useState(false);
  const [tripSpots, setTripSpots] = useState([]);

  const axios = useCustomAxios();
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
      ...productInfo,
      extra: {
        ...productInfo.extra,
        spot: selectedSpots,
      },
    });
    setShowUploadPrompt(false);
  };

  const navigate = useNavigate();
  const { step } = useParams();

  const handleSubmit = event => {
    event.preventDefault();
    if (!productInfo.extra.spot || productInfo.extra.spot.length === 0) {
      setShowUploadPrompt(true);
      return;
    }
    navigate(`/product/add/${+step + 1}`);
    setShowUploadPrompt(false);
  };

  const handlePrevButton = e => {
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
                  productInfo.extra.spot &&
                  productInfo.extra.spot.includes(spot)
                    ? 'border-main-color border-2 '
                    : 'border-light-gray'
                }`}
              >
                <input
                  className="hidden"
                  type="checkbox"
                  checked={
                    productInfo.extra.spot &&
                    productInfo.extra.spot.includes(spot)
                  }
                  onChange={() => handleCheckboxChange(spot)}
                  disabled={
                    productInfo.extra.spot &&
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

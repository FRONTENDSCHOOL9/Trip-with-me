import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

SelectTheme.propTypes = {
  productInfo: PropTypes.object,
  setProductInfo: PropTypes.func,
};

function SelectTheme({ productInfo, setProductInfo }) {
  const navigate = useNavigate();
  const { step } = useParams();

  const [showUploadPrompt, setShowUploadPrompt] = useState(false);
  const [tripThemes, setTripThemes] = useState([]);

  const axios = useCustomAxios();

  useEffect(() => {
    getTripThemes();
  }, []);

  const getTripThemes = async () => {
    try {
      const { data } = await axios.get(import.meta.env.VITE_TRAVEL_THEMES_API);
      setTripThemes(
        data.map(theme => ({
          ...theme,
          isSelected:
            productInfo?.extra?.themes?.some(t => t.id === theme.id) ?? false,
        })),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckboxChange = theme => {
    const selectedThemes = Array.isArray(productInfo?.extra?.themes)
      ? [...productInfo.extra.themes]
      : [];
    const themeIndex = selectedThemes.findIndex(t => t.id === theme.id);

    if (themeIndex === -1) {
      if (selectedThemes.length < 3) {
        selectedThemes.push(theme);
      }
    } else {
      selectedThemes.splice(themeIndex, 1);
    }

    setProductInfo({
      ...productInfo,
      extra: {
        ...productInfo.extra,
        themes: selectedThemes,
      },
    });

    setShowUploadPrompt(false);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (productInfo.extra.themes.length === 0) {
      setShowUploadPrompt(true);
    } else {
      navigate(`/product/add/${+step + 1}`);
    }
  };

  const handlePrevButton = e => {
    e.preventDefault();
    navigate(`/product/add/${+step - 1}`);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col items-center justify-center"
      >
        <p className="mt-20 text-2xl font-semibold font-notosans text-main-color">
          여행테마를 골라주세요.
        </p>
        <p className="mt-3 mb-10 text-sm text-slate-400">(최대 3개)</p>
        <ul className="flex flex-wrap items-center justify-center m-6 gap-x-2 gap-y-4 font-notosans">
          {tripThemes.map((theme, id) => (
            <li key={id}>
              <label
                className={`flex border-2 rounded-full py-1 px-4 cursor-pointer ${
                  productInfo?.extra?.themes?.some(t => t.id === theme.id)
                    ? 'border-main-color border-2 '
                    : 'border-light-gray'
                }`}
              >
                <input
                  className="hidden"
                  type="checkbox"
                  checked={theme.isSelected}
                  onChange={() => handleCheckboxChange(theme)}
                />
                {theme.name}
              </label>
            </li>
          ))}
        </ul>
        {showUploadPrompt && (
          <p className="absolute text-sm font-medium bottom-24 text-warning-color font-notosans">
            여행테마를 선택해주세요.
          </p>
        )}
        <div className="flex items-center justify-between mt-20 w-96">
          <button
            type="button"
            onClick={handlePrevButton}
            className="px-10 py-3 text-xl font-semibold text-white rounded-full bg-main-color"
          >
            이전
          </button>
          <p className="font-semibold text-m"> 6 / 7</p>
          <button
            type="submit"
            className="px-10 py-3 text-xl font-semibold text-white rounded-full bg-main-color"
          >
            다음
          </button>
        </div>
      </form>
    </div>
  );
}

export default SelectTheme;

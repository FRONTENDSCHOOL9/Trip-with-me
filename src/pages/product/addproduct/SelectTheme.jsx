import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useEffect, useState } from 'react';

function SelectTheme({ productInfo, setProductInfo }) {
  const [showUploadPrompt, setShowUploadPrompt] = useState(false);

  const axios = useCustomAxios();

  const [tripThemes, setTripThemes] = useState([]);

  useEffect(() => {
    getTripThemes();
  }, []);

  const getTripThemes = async () => {
    try {
      const { data } = await axios.get(import.meta.env.VITE_TRAVEL_THEMES_API);
      setTripThemes(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckboxChange = theme => {
    const selectedThemes = [...productInfo.extra.themes];
    const themeIndex = selectedThemes.indexOf(theme);

    if (themeIndex === -1) {
      selectedThemes.push(theme);
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
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <p className="my-20 text-2xl font-semibold font-notosans text-main-color">
          여행테마를 골라주세요.
        </p>
        <ul className="flex flex-wrap items-center justify-center m-6 gap-x-2 gap-y-4 font-notosans">
          {tripThemes.map((theme, id) => (
            <li key={id}>
              <label
                className={`flex border-2 rounded-full py-1 px-4 cursor-pointer ${
                  productInfo.extra.themes.includes(theme)
                    ? 'border-main-color border-2 '
                    : 'border-light-gray'
                }`}
              >
                <input
                  className="hidden"
                  type="checkbox"
                  checked={productInfo.extra.themes.includes(theme)}
                  onChange={() => handleCheckboxChange(theme)}
                />
                {theme.name}
              </label>
            </li>
          ))}
        </ul>
        {showUploadPrompt && (
          <p className="text-sm font-medium text-warning-color font-notosans">
            여행테마를 선택해주세요.
          </p>
        )}
        <div className="flex items-center justify-between mt-20 w-96">
          <button
            type="button"
            className="px-10 py-3 text-xl font-medium text-white rounded-full bg-main-color"
          >
            이전
          </button>
          <p className="text-xl font-medium"> 3 / 7</p>
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

export default SelectTheme;

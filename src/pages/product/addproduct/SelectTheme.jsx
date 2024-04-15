import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useProductInfostore } from '@zustand/productInfo.mjs';
import { useEffect, useState } from 'react';

function SelectTheme() {
  const { productInfo, setProductInfo } = useProductInfostore();

  const [showUploadPrompt, setShowUploadPrompt] = useState(false);

  const axios = useCustomAxios();

  const [tripThemes, setTripThemes] = useState([]);

  useEffect(() => {
    getTripThemes();
    console.log(tripThemes);
  }, []);

  const getTripThemes = async () => {
    try {
      const { data } = await axios.get(import.meta.env.VITE_TRAVEL_THEMES_API);
      setTripThemes(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCheckboxChange = theme => {
    console.log(theme);
    const selectedThemes = [...productInfo.extra.themes];
    const themeIndex = selectedThemes.indexOf(theme);

    if (themeIndex === -1) {
      selectedThemes.push(theme);
    } else if (themeIndex !== -1) {
      selectedThemes.splice(themeIndex, 1);
    }
    console.log(selectedThemes);
    setProductInfo({
      extra: {
        ...productInfo.extra,
        themes: selectedThemes,
      },
    });
    console.log(productInfo);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (productInfo.extra.themes.length === 0) {
      setShowUploadPrompt(true);
    } else {
      //
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
                className={`flex border-2  rounded-full py-1 px-4 cursor-pointer ${
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
        <button type="submit">다음</button>
      </form>
    </div>
  );
}

export default SelectTheme;

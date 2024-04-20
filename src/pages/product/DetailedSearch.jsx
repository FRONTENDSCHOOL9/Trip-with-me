import Header from '@components/layout/Header';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useEffect, useState } from 'react';
import usePageStore from '@zustand/pageName.mjs';
import StyledLabel from '@components/style/StyledLabel';

function DetailedSearch() {
  const page = '상세 검색';
  const setPageName = usePageStore(state => state.setPageName);

  const axios = useCustomAxios();
  const [tripSpots, setTripSpots] = useState([]);
  const [tripThemes, setTripThemes] = useState([]);

  useEffect(() => {
    const getSpots = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_TRAVEL_SPOT_API);
        setTripSpots(response.data);
      } catch (error) {
        console.error('TRAVEL_SPOT 불러오기 실패', error);
      }
    };

    const getThemes = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_TRAVEL_THEMES_API,
        );
        setTripThemes(response.data);
      } catch (error) {
        console.error('TRAVEL_THEMES 불러오기 실패', error);
      }
    };

    setPageName(page);
    getSpots();
    getThemes();
  }, []);

  return (
    <div className="layout">
      <Header />
      <div className="scrollbar flex flex-col justify-center px-5">
        <div className="font-notosans text-center mb-10 last:mb-0">
          <h2 className="text-blue-400 text-xl font-semibold mb-5">
            지역을 선택해주세요
          </h2>

          <ul className="flex justify-center flex-wrap gap-2.5">
            {tripSpots.map(tripSpot => (
              <li key={tripSpot.id}>
                <StyledLabel>
                  <input
                    className="input"
                    type="checkbox"
                    id={`area_${tripSpot.id}`}
                  />
                  <label
                    className="label
                 "
                    htmlFor={`area_${tripSpot.id}`}
                  >
                    {tripSpot.name}
                  </label>
                </StyledLabel>
              </li>
            ))}
          </ul>
        </div>

        <div className="font-notosans text-center h-[350px] last:mb-0">
          <h2 className="text-blue-400 text-xl font-semibold mb-5">
            테마를 선택해주세요
          </h2>

          <ul className="flex justify-center flex-wrap gap-2.5">
            {tripThemes.map(tripThemes => (
              <li key={tripThemes.id}>
                <StyledLabel>
                  <input
                    type="checkbox"
                    className="input"
                    id={`theme_${tripThemes.id}`}
                  />
                  <label className="label" htmlFor={`theme_${tripThemes.id}`}>
                    {tripThemes.name}
                  </label>
                </StyledLabel>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="inline-block w-48 h-10 text-xl cursor-pointer text-center text-white font-semibold bg-blue-400 rounded-xl hover:bg-blue-500 active:bg-blue-600"
          >
            검색
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailedSearch;

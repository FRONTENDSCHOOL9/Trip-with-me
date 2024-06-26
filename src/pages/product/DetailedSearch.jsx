import Header from '@components/layout/Header';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useEffect, useState } from 'react';
import usePageStore from '@zustand/pageName.mjs';
import StyledLabel from '@components/style/StyledLabel';
import { useNavigate } from 'react-router-dom';

function DetailedSearch() {
  const page = '상세 검색';
  const setPageName = usePageStore(state => state.setPageName);
  const axios = useCustomAxios();
  const [tripSpots, setTripSpots] = useState([]);
  const [tripThemes, setTripThemes] = useState([]);
  const [selectedSpots, setSelectedSpots] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [queryString, setQueryString] = useState([]);
  const [themeList, setThemeList] = useState([]);
  const [spotList, setSpotList] = useState([]);
  const navigate = useNavigate();

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

  const handleSpotChange = id => {
    setSelectedSpots(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(spotId => spotId !== id)
        : [...prevSelected, id],
    );
  };

  console.log('selectedspot', selectedSpots);
  console.log('selectedThemes', selectedThemes);
  const handleThemeChange = id => {
    setSelectedThemes(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(themeId => themeId !== id)
        : [...prevSelected, id],
    );
  };

  const handleSearch = async () => {
    try {
      let queryParams = {};
      let querylist = [];
      // 선택된 spotIds 배열이 비어있지 않은지 확인 후 객체 배열 정의
      if (selectedSpots.length > 0) {
        let spots = selectedThemes.map(item => {
          return { 'extra.spot.id': item };
        });
        console.log('spotsid', spots);
        setSpotList(spots);
        querylist = [...querylist, ...spots];
      }

      // 선택된 themeIds 배열이 비어있지 않은지 확인 후 객체 배열 정의
      if (selectedThemes.length > 0) {
        let themes = selectedThemes.map(item => {
          return { 'extra.themes.id': item };
        });
        console.log('themelist', themes);
        setThemeList(themes);
        querylist = [...querylist, ...themes];
      }

      // 쿼리 리스트 생성하기
      console.log('querylist', querylist);

      const jsonQueryList = querylist.map(item => JSON.stringify(item));
      const url = `/products?custom={"$or":[${jsonQueryList.join(',')}]}`;
      console.log('url', url);
      const response = await axios.get(url);
      console.log('검색 결과:', response.data);
      setSearchResults(response.data);
      navigate('/product/search/result', { state: response?.data });
    } catch (error) {
      console.error('상품 검색 실패', error);
    }
  };
  return (
    <div className="layout">
      <Header />
      <div className="scrollbar flex flex-col justify-center px-5">
        <div className="font-notosans text-center mb-10 last:mb-0">
          <h2 className="my-6 text-2xl font-semibold font-notosans text-main-color">
            지역을 선택해주세요
          </h2>

          <ul className="flex justify-center flex-wrap gap-2.5">
            {tripSpots.map(tripSpot => (
              <li key={tripSpot.id}>
                <StyledLabel>
                  <input
                    className="hidden"
                    type="checkbox"
                    id={`area_${tripSpot.id}`}
                    onChange={() => handleSpotChange(tripSpot.id)}
                  />
                  <label
                    className={`flex border-2 rounded-full py-1 px-4 cursor-pointer ${selectedSpots.includes(tripSpot.id) ? 'border-main-color' : ''}`}
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
          <h2 className="my-6 text-2xl font-semibold font-notosans text-main-color">
            테마를 선택해주세요
          </h2>

          <ul className="flex justify-center flex-wrap gap-2.5">
            {tripThemes.map(tripThemes => (
              <li key={tripThemes.id}>
                <StyledLabel>
                  <input
                    type="checkbox"
                    className="hidden"
                    id={`theme_${tripThemes.id}`}
                    onChange={() => handleThemeChange(tripThemes.id)}
                  />
                  <label
                    className={`flex border-2 rounded-full py-1 px-4 cursor-pointer ${selectedThemes.includes(tripThemes.id) ? 'border-main-color' : ''}`}
                    htmlFor={`theme_${tripThemes.id}`}
                  >
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
            onClick={handleSearch}
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

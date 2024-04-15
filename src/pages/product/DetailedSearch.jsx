import Header from '@components/layout/Header';
import { Outlet } from 'react-router-dom';
import '@components/style/detailedSearch.css';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

function DetailedSearch() {
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

    getSpots();
    getThemes();
  }, []);

  return (
    <div className="layout">
      <Header />
      <div className="scrollbar">
        <Outlet />
        <div className="searchBox">
          <h2 className="searchBox-title">지역을 선택해주세요</h2>

          <ul className="searchBox-detail">
            {tripSpots.map(tripSpot => (
              <li key={tripSpot.id}>
                <input
                  className="input"
                  type="checkbox"
                  id={`area_${tripSpot.id}`}
                />
                <label className="label" htmlFor={`area_${tripSpot.id}`}>
                  {tripSpot.name}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="searchBox">
          <h2 className="searchBox-title">테마를 선택해주세요</h2>

          <ul className="searchBox-detail">
            {tripThemes.map(tripThemes => (
              <li key={tripThemes.id}>
                <input
                  type="checkbox"
                  className="input"
                  id={`theme_${tripThemes.id}`}
                />
                <label className="label" htmlFor={`theme_${tripThemes.id}`}>
                  {tripThemes.name}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="buttonContainer">
          <button type="submit" className="searchButton">
            검색
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailedSearch;

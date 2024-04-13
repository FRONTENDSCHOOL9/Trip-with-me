import Marker from '@pages/product/addproduct/map/Marker';
import { useItineraryMapStore } from '@zustand/itineraryMaps.mjs';
import { useEffect, useState } from 'react';
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';

function KakaoMap({ id }) {
  const { itineraryMaps, addMarker } = useItineraryMapStore();
  const [map, setMap] = useState();
  const [inputText, setInputText] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const apiKey = import.meta.env.VITE_KAKAO_MAP_API_KEY;

  useKakaoLoader({
    appkey: apiKey,
    libraries: ['clusterer', 'drawing', 'services'],
  });

  useEffect(() => {
    console.log('시범');
    console.log(itineraryMaps);
    if (!map || !searchKeyword) return;
    const placeService = new kakao.maps.services.Places();

    placeService.keywordSearch(searchKeyword, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 지도 표시용 바운더리 설정
        const bounds = new kakao.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    });
  }, [map, searchKeyword]); //searchKeyword도 useEffect의 의존성 배열에 포함시켜야 검색어가 변경될 때마다 새로운 검색을 수행함

  const handleChange = e => {
    setInputText(e.target.value);
  };

  const handleSumbit = e => {
    if (e === undefined) {
      return; //제출버튼 클릭시 이벤트가 발생을 안하고 진입하는 문제가 있어서 임시처리
    }
    e.preventDefault();
    setSearchKeyword(inputText);
    setInputText('');
  };

  const activeEnter = e => {
    if (e.key === 'Enter') {
      handleSumbit();
    }
  };

  const createMarker = mouseEvent => {
    const latlng = mouseEvent.latLng;
    const marker = {
      title: '',
      latlng: { lat: latlng.getLat(), lng: latlng.getLng() },
    };
    addMarker(id, marker);
    console.log(itineraryMaps);
  };

  return (
    <>
      <form onSubmit={handleSumbit}>
        <input
          type="text"
          onChange={handleChange}
          onKeyDown={activeEnter}
          value={inputText}
          placeholder="장소를 상세히 입력해주세요."
        />
        <button type="submit">검색</button>
      </form>

      <Map
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: '100%',
          height: '350px',
        }}
        level={1}
        onCreate={setMap}
        onClick={(_, mouseEvent) => createMarker(mouseEvent)}
      >
        {itineraryMaps[id].markers.map((marker, index) => (
          <Marker key={index} mapId={id} markerId={index} marker={marker} />
        ))}
      </Map>
    </>
  );
}

export default KakaoMap;

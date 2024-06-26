import Marker from '@pages/product/addproduct/map/Marker';
import { useEffect, useState } from 'react';
import { Map, Polyline, useKakaoLoader } from 'react-kakao-maps-sdk';

function KakaoMap({ id, setItineraryMaps, itineraryMaps }) {
  const [map, setMap] = useState();
  const [inputText, setInputText] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const apiKey = import.meta.env.VITE_KAKAO_MAP_API_KEY;

  useKakaoLoader({
    appkey: apiKey,
    libraries: ['clusterer', 'drawing', 'services'],
  });

  useEffect(() => {
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

  if (!itineraryMaps[id]) {
    console.log('이 id에 해당하는 지도가 없음', id);
  }

  const handleChange = e => {
    setInputText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSearchKeyword(inputText);
    setInputText('');
  };

  const createMarker = mouseEvent => {
    const latlng = mouseEvent.latLng;
    const marker = {
      title: '',
      latlng: { lat: latlng.getLat(), lng: latlng.getLng() },
    };
    addMarker(id, marker);
  };

  const addMarker = (mapIndex, newMarker) => {
    setItineraryMaps(prevMaps =>
      prevMaps.map((map, index) =>
        index === mapIndex
          ? { ...map, markers: [...map.markers, newMarker] }
          : map,
      ),
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          value={inputText}
          placeholder="장소를 상세히 입력해주세요."
          className="p-1 mt-1 mb-1 ml-2 text-sm border rounded-md text-slate-500"
        />
        <button type="submit" className="p-1 text-base text-slate-500">
          검색
        </button>
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
        level={4}
        zoomable={true}
        onCreate={setMap}
        onClick={(_, mouseEvent) => createMarker(mouseEvent)}
      >
        {itineraryMaps[id]?.markers.map((marker, index) => (
          <Marker
            key={index}
            mapId={id}
            markerId={index}
            marker={marker}
            itineraryMaps={itineraryMaps}
            setItineraryMaps={setItineraryMaps}
          />
        ))}
        <Polyline
          path={itineraryMaps[id]?.markers.map(marker => marker.latlng)}
          strokeWeight={4}
          strokeColor={'#FC7C7C'}
          strokeOpacity={1}
          strokeStyle={'solid'}
        />
      </Map>
    </>
  );
}

export default KakaoMap;

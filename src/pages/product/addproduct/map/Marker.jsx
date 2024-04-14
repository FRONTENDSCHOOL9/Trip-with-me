import { useItineraryMapStore } from '@zustand/itineraryMaps.mjs';
import { memo, useEffect, useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';

const Marker = ({ mapId, markerId, marker }) => {
  const { updateMarkerTitle, removeMarker, itineraryMaps } =
    useItineraryMapStore();

  const [isVisible, setIsVisible] = useState(false);

  const title = itineraryMaps[mapId]?.markers[markerId]?.title || '';

  const handleChangeTitle = e => {
    const newTitle = e.target.value;
    updateMarkerTitle(mapId, markerId, newTitle); // 전역 상태 업데이트
  };

  useEffect(() => {
    // 마커가 클릭되었을 때 title을 업데이트
    setIsVisible(false); // 초기화
  }, [markerId]);

  return (
    <MapMarker
      position={marker.latlng} // 마커를 표시할 위치
      image={{
        src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
        size: {
          width: 24,
          height: 35,
        },
      }}
      title={marker.title}
      onClick={() => setIsVisible(prevState => !prevState)}
    >
      {isVisible && (
        <div>
          <input type="text" onChange={handleChangeTitle} value={title} />
          <button
            type="button"
            onClick={() => {
              if (window.confirm('정말 삭제하시겠습니까?')) {
                removeMarker(mapId, markerId);
              }
            }}
          >
            삭제
          </button>
        </div>
      )}
    </MapMarker>
  );
};

export default memo(Marker);

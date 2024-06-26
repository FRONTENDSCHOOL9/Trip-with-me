import { memo, useState } from 'react';
import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';

const Marker = ({
  mapId,
  markerId,
  marker,
  itineraryMaps,
  setItineraryMaps,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const title = itineraryMaps[mapId]?.markers[markerId]?.title || '';

  const handleChangeTitle = e => {
    const newTitle = e.target.value;
    updateMarkerTitle(mapId, markerId, newTitle); // 전역 상태 업데이트
  };

  const updateMarkerTitle = (mapIndex, markerIndex, newTitle) => {
    setItineraryMaps(prevMaps =>
      prevMaps.map((map, index) =>
        index === mapIndex
          ? {
              ...map,
              markers: map.markers.map((marker, idx) =>
                idx === markerIndex ? { ...marker, title: newTitle } : marker,
              ),
            }
          : map,
      ),
    );
  };

  const removeMarker = (mapIndex, markerIndex) => {
    setItineraryMaps(prevMaps =>
      prevMaps.map((map, index) =>
        index === mapIndex
          ? {
              ...map,
              markers: map.markers.filter((_, idx) => idx !== markerIndex),
            }
          : map,
      ),
    );
  };

  const activeEnter = e => {
    if (e.key === 'Enter') {
      setIsVisible(false);
    }
  };

  return (
    <>
      <MapMarker
        position={marker.latlng}
        image={{
          src: '/assets/icons/icon-map-pin.svg',
          size: {
            width: 35,
            height: 70,
          },
        }}
        title={marker.title}
        onClick={() => setIsVisible(prevState => !prevState)}
      >
        {isVisible && (
          <div>
            <input
              type="text"
              onChange={handleChangeTitle}
              onKeyDown={activeEnter}
              value={title}
            />
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
      <CustomOverlayMap position={marker.latlng}>
        <span className="p-1 bg-white border rounded-lg border-rose-300">
          {title ? `${markerId + 1}-${title}` : markerId + 1}
        </span>
      </CustomOverlayMap>
    </>
  );
};

export default memo(Marker);

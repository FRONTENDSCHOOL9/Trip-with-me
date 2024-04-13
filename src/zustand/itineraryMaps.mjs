import { create } from 'zustand';

export const useItineraryMapStore = create(set => ({
  itineraryMaps: [],

  // Itinerary Map 관련 함수들
  updateItineraryMap: (id, updatedMap) => {
    set(state => ({
      itineraryMaps: state.itineraryMaps.map((map, index) =>
        index === id ? { ...map, ...updatedMap } : map,
      ),
    }));
  },

  addItineraryMap: newMap => {
    set(state => ({
      itineraryMaps: [...state.itineraryMaps, newMap],
    }));
  },

  removeItineraryMap: id => {
    set(state => ({
      itineraryMaps: state.itineraryMaps.filter((_, index) => index !== id),
    }));
  },

  // Marker 관련 함수들
  updateMarkerTitle: (mapIndex, markerIndex, newTitle) => {
    set(state => ({
      itineraryMaps: state.itineraryMaps.map((map, index) =>
        index === mapIndex
          ? {
              ...map,
              markers: map.markers.map((marker, idx) =>
                idx === markerIndex ? { ...marker, title: newTitle } : marker,
              ),
            }
          : map,
      ),
    }));
  },

  updateMarkerLatLng: (mapIndex, markerIndex, newLatLng) => {
    set(state => ({
      itineraryMaps: state.itineraryMaps.map((map, index) =>
        index === mapIndex
          ? {
              ...map,
              markers: map.markers.map((marker, idx) =>
                idx === markerIndex ? { ...marker, latlng: newLatLng } : marker,
              ),
            }
          : map,
      ),
    }));
  },

  addMarker: (mapIndex, newMarker) => {
    set(state => ({
      itineraryMaps: state.itineraryMaps.map((map, index) =>
        index === mapIndex
          ? {
              ...map,
              markers: [...map.markers, newMarker],
            }
          : map,
      ),
    }));
  },

  removeMarker: (mapIndex, markerIndex) => {
    set(state => ({
      itineraryMaps: state.itineraryMaps.map((map, index) =>
        index === mapIndex
          ? {
              ...map,
              markers: map.markers.filter((_, idx) => idx !== markerIndex),
            }
          : map,
      ),
    }));
  },
}));

// itineraryMaps = [
//   {
//     markers: [
//       {
//         title: '',
//         latlng: { lat: latlng.getLat(), lng: latlng.getLng() },
//       },
//       {
//         title: '',
//         latlng: { lat: latlng.getLat(), lng: latlng.getLng() },
//       },
//     ],
//   },
//   {
//     markers: [
//       {
//         title: '',
//         latlng: { lat: latlng.getLat(), lng: latlng.getLng() },
//       },
//       {
//         title: '',
//         latlng: { lat: latlng.getLat(), lng: latlng.getLng() },
//       },
//     ],
//   },
// ];

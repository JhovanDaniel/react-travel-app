import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';

// Replace 'YOUR_MAPBOX_ACCESS_TOKEN' with your actual Mapbox access token
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX

const Map = () => {
  const [map, setMap] = useState(null);

  // Initialize the map when the component mounts
  React.useEffect(() => {
    const initializeMap = () => {
      const mapInstance = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [18.200409624631693, 18.200409624631693], // Replace with your desired center coordinates
        zoom: 12,
      });

      mapInstance.on('load', () => {
        setMap(mapInstance);
      });
    };

    if (!map) {
      initializeMap();
    }
  }, [map]);

  // Add a marker and popup to the map
  const addMarker = (lngLat) => {
    const marker = new mapboxgl.Marker()
      .setLngLat(lngLat)
      .addTo(map)

    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML('<h3>Popup Content</h3>')
      .addTo(map);

    marker.setPopup(popup);
    marker.togglePopup();
  };

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '100vh' }} />
      <button onClick={() => addMarker([18.200409624631693, 18.200409624631693])}>
        Add Marker
      </button>
    </div>
  );
};

export default Map;
import { MapContainer, TileLayer } from 'react-leaflet';
import { HeatmapLayer } from 'react-leaflet-heatmap';

function Heatmap() {
  const points = [
    { lat: 51.5, lng: -0.1, value: 1 },
    { lat: 51.51, lng: -0.1, value: 2 },
    { lat: 51.49, lng: -0.05, value: 0.5 },
  ];

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data © OpenStreetMap contributors"
      />
      <HeatmapLayer
        points={points}
        longitudeExtractor={(p) => p.lng}
        latitudeExtractor={(p) => p.lat}
        intensityExtractor={(p) => parseFloat(p.value)}
        blur={20}
        radius={30}
      />
    </MapContainer>
  );
}

export default Heatmap;


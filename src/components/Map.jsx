import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useStations } from '../context/App'
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  // iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconUrl: "https://www.metrolisboa.pt/wp-content/uploads/2019/07/metro_icon.svg",
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export const Map = () => {
  const stations = useStations();

  if (!stations.size) {
    return null;
  }

  const markers = [...stations.values()];
  return (
    <div className="row">
      <MapContainer zoom={12} center={[markers[0]?.position.lat, markers[0]?.position.lon]} style={{ height: '98vh' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        { markers.map(({ position, name }, index) => (
          position?.lat ? (
            <Marker key={index} position={[position.lat, position.lon]}>
              <Popup>
                { name }
              </Popup>
            </Marker>
          ) : null
        ))
      }
      </MapContainer>
    </div>
  )
}

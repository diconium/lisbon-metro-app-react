import L from 'leaflet';
import { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useStations } from '../context/App'
import { mapCenter } from '../utils/constants';

const LeafIcon = L.Icon.extend({
      options: {
        iconSize:     [24, 24],
    }
});

const defaultIcon = new LeafIcon({ iconUrl: 'assets/svg/metro_black.svg' });
const greenIcon = new LeafIcon({ iconUrl: 'assets/svg/metro_green.svg' });
const redIcon = new LeafIcon({ iconUrl: 'assets/svg/metro_red.svg' });
const blueIcon = new LeafIcon({ iconUrl: 'assets/svg/metro_blue.svg' });
const yellowIcon = new LeafIcon({ iconUrl: 'assets/svg/metro_yellow.svg' });

const iconsMap = {
  default: defaultIcon,
  green: greenIcon,
  red: redIcon,
  yellow: yellowIcon,
  blue: blueIcon,
};

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: 'assets/svg/metro_black.svg',
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export const Map = ({ selectedLine }) => {
  const stations = useStations();

  const markers = useMemo(() => [...stations.values()]
    .filter(({ line = [] }) => line.includes(selectedLine))
    .map(marker => ({
      ...marker,
      icon: marker.line.length > 1 ? iconsMap.default : iconsMap[marker.line[0]],
    })), [stations, selectedLine]);

  if (!stations.size) {
    return null;
  }

  return (
    <div className="row">
      <MapContainer zoom={12} center={mapCenter} style={{ height: '98vh' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        { markers.map(({ position, name, icon, line }, index) => (
          (
            <Marker key={index} position={[position.lat, position.lon]} icon={icon}>
              <Popup>
                <div>{ name }</div>
                <div>Line color: {line.join(' and ')}</div>
              </Popup>
            </Marker>
          )
        ))
      }
      </MapContainer>
    </div>
  )
}

import React from 'react'
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export default function LeafletView({lat,long}) {

  if (isNaN(lat) || isNaN(long)) {
    return <p>Loading or no data available</p>;
  }

  const position = [lat, long];
    console.log(position)
  return (
    <div>

<MapContainer  center={position} zoom={18} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position} >
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
    </div>
  )
}

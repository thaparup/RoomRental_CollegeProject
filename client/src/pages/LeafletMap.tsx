import { useCallback, useMemo, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import { GeoJSON } from 'leaflet';
import viteLogo from "/vite.svg";
// import "./App.css";
import MyInput from "./MyInput";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import axios from "axios";

function LeafletMap({ position, setPosition }) {

  const center = {
    lat: 28.186549712731548,
    lng: 83.97502937314685,
  };
  function DraggableMarker({  }) {
    const [draggable, setDraggable] = useState(false);
    // const [position, setPosition] = useState(center);
   
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            // setPosition(marker.getLatLng());
            setPosition(marker.getLatLng());
          }
        },
      }),
      []
    );
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d);
    }, [setPosition]);

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? "Marker is draggable"
              : "Click here to make marker draggable"}
          </span>
        </Popup>
      </Marker>
    );
  }
  return (
    <>
      <div className="">
        {/* <MapContainer
          center={position}
          zoom={17}
          scrollWheelZoom={false}
          style={{ height: "60vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>The residence is here !</Popup>
          </Marker>
        </MapContainer> */}

        <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="" >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" className=""
          />

          <DraggableMarker />
        </MapContainer>
      </div>
    </>
  );
}

export default LeafletMap;

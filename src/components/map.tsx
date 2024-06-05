"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import L, { LatLng } from "leaflet";
import { MapType } from "@/types/map-type";

type MapProps = {
  schools: MapType["schools"];
  isPositionVisible: boolean;
};

function CurrentPosition() {
  const [currentPosition, setCurrentPosition] = useState<LatLng>(
    new LatLng(49.195061, 16.606836),
  );
  const map = useMapEvents({
    click: () => {
      map.locate();
    },
    locationfound: (location) => {
      setCurrentPosition(location.latlng);
    },
  });

  return (
    <Marker position={currentPosition}>
      <Popup>Your position</Popup>
    </Marker>
  );
}

const Map = ({ schools, isPositionVisible }: MapProps) => {
  const [currentPosition, setCurrentPosition] = useState<LatLng[]>([]);

  const defaultIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
  });

  const currentPositionIcon = new L.Icon({
    iconUrl: "/currentPosition.ico",
    iconSize: [48, 48],
    iconAnchor: [25, 48],
    popupAnchor: [0, -48],
  });

  const closest = schools.map((school) => {
    const { latitude, longitude } = school.properties;
    const distance = Math.sqrt(
      Math.pow(latitude - currentPosition[0].lat, 2) +
        Math.pow(longitude - currentPosition[0].lng, 2),
    );
    return { school, distance };
  });

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setCurrentPosition([new LatLng(lat, lng)]);
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={[49.195061, 16.606836]}
      zoom={13}
      style={{ height: "calc(100dvh - 76px)", width: "85%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://github.com/KleinMichalGit/pa181-closest-nursery">PA181</a> contributors'
      />
      {schools.map(
        ({
          properties: { title, address, telephone, longitude, latitude, email },
        }) => (
          <Marker
            position={[latitude, longitude]}
            key={Math.random()}
            icon={defaultIcon}
          >
            <Popup>
              {title} <br /> {address} <br /> {telephone} <br /> {email}
            </Popup>
          </Marker>
        ),
      )}
      <MapClickHandler />
      {currentPosition.map((position) => (
        <Marker
          position={position}
          key={Math.random()}
          icon={currentPositionIcon}
        >
          <Popup>Your position</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;

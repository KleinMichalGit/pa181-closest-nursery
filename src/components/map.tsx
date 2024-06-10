"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import L, { LatLng } from "leaflet";
import { ClosestSchoolType, MapType } from "@/types/map-type";

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

const Map = ({
  schools,
  setClosestSchool,
}: MapType & {
  setClosestSchool: (school: ClosestSchoolType | null) => void;
}) => {
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

  useEffect(() => {
    if (currentPosition.length > 0) {
      const distances = schools.map((school) => {
        const { latitude, longitude } = school.properties;
        const distance = currentPosition[0]?.distanceTo(
          new LatLng(latitude, longitude),
        );

        return { school, distance };
      });

      // Sort the distances array in ascending order
      distances.sort((a, b) => a.distance - b.distance);

      const closestSchool = distances[0].school;
      setClosestSchool({
        properties: {
          title: closestSchool.properties.title,
          address: closestSchool.properties.address,
          telephone: closestSchool.properties.telephone,
          email: closestSchool.properties.email,
          distance: distances[0].distance,
        },
      });
    }
  }, [currentPosition]);

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
      className="w-full"
      style={{ height: "calc(100dvh - 76px)" }}
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

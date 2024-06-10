"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import L, { LatLng } from "leaflet";
import { ClosestSchoolType, MapType } from "@/types/map-type";

const Map = ({
  schools,
  setClosestSchools,
}: MapType & {
  setClosestSchools: (schools: ClosestSchoolType[] | null) => void;
}) => {
  const [currentPosition, setCurrentPosition] = useState<LatLng[]>([]);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

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

      setClosestSchools(
        distances.map((distance) => ({
          properties: {
            title: distance.school.properties.title,
            address: distance.school.properties.address,
            telephone: distance.school.properties.telephone,
            email: distance.school.properties.email,
            distance: distance.distance,
          },
        })),
      );

      // Open the popup for the closest marker
      const closestSchool = distances[0].school;
      const closestMarker = markersRef.current[closestSchool.properties.title];
      if (closestMarker) {
        closestMarker.openPopup();
      }
    }
  }, [currentPosition, schools, setClosestSchools]);

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
    <>
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
            properties: {
              title,
              address,
              telephone,
              longitude,
              latitude,
              email,
            },
          }) => (
            <Marker
              position={[latitude, longitude]}
              key={title}
              icon={defaultIcon}
              ref={(marker) => {
                if (marker) {
                  markersRef.current[title] = marker;
                }
              }}
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
            key={position.toString()}
            icon={currentPositionIcon}
          >
            <Popup>Your position</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default Map;

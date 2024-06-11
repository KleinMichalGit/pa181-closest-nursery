"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L, { LatLng } from "leaflet";
import { ClosestSchoolType, MapType } from "@/types/map-type";
import MapPopup from "@/components/map/map-popup";

interface MapProps extends MapType {
  setClosestSchools: (schools: ClosestSchoolType[] | null) => void;
}

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

const Map: React.FC<MapProps> = ({ schools, setClosestSchools }) => {
  const [currentPosition, setCurrentPosition] = useState<LatLng[]>([]);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const calculateClosestSchools = useCallback(() => {
    if (currentPosition.length === 0) return;

    const distances = schools.map((school) => {
      const { latitude, longitude } = school.properties;
      const distance = currentPosition[0]?.distanceTo(
        new LatLng(latitude, longitude),
      );

      return { school, distance };
    });

    distances.sort((a, b) => a.distance - b.distance);

    setClosestSchools(
      distances.map(({ school, distance }) => ({
        properties: {
          ...school.properties,
          distance,
        },
      })),
    );

    const closestSchool = distances[0].school;
    const closestMarker = markersRef.current[closestSchool.properties.objectid];
    closestMarker?.openPopup();
  }, [currentPosition]);

  useEffect(() => {
    calculateClosestSchools();
  }, [currentPosition]);

  const MapClickHandler: React.FC = () => {
    useMapEvents({
      click: ({ latlng }) => {
        setCurrentPosition([new LatLng(latlng.lat, latlng.lng)]);
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
      {schools.map(({ properties }) => (
        <Marker
          position={[properties.latitude, properties.longitude]}
          key={Math.random()}
          icon={defaultIcon}
          ref={(marker) => {
            if (marker) {
              markersRef.current[properties.objectid] = marker;
            }
          }}
        >
          <MapPopup {...properties} />
        </Marker>
      ))}
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
  );
};

export default Map;

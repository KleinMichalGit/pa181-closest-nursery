import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L, { LatLng } from "leaflet";
import { ClosestSchoolType, MapType, SchoolProperties } from "@/types/map-type";
import MapPopup from "@/components/map/map-popup";
import RoutingMachine from "@/components/map/routing-machine";

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

const closestSchoolIsAmongFilteredSchools = (
  closestSchoolID: number,
  filteredSchools: SchoolProperties[],
) => {
  return filteredSchools.some(
    (filteredSchool) => filteredSchool.objectid === closestSchoolID,
  );
};

const Map = ({ schools, setClosestSchools }: MapProps) => {
  const [currentPosition, setCurrentPosition] = useState<LatLng | null>(null);
  const [currentClosestSchoolPosition, setCurrentClosestSchoolPosition] =
    useState<LatLng | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const calculateClosestSchools = useCallback(() => {
    if (!currentPosition) {
      setClosestSchools(null);
      setCurrentClosestSchoolPosition(null);
      return;
    }

    const distances = schools.map((school) => {
      const { latitude, longitude } = school.properties;
      const distance = currentPosition.distanceTo(
        new LatLng(latitude, longitude),
      );
      return { school, distance };
    });

    if (distances.length === 0) {
      setClosestSchools(null);
      setCurrentClosestSchoolPosition(null);
      return;
    }

    distances.sort((a, b) => a.distance - b.distance);

    if (
      closestSchoolIsAmongFilteredSchools(
        distances[0].school.properties.objectid,
        schools.map(({ properties }) => properties),
      )
    ) {
      setClosestSchools(
        distances.map(({ school, distance }) => ({
          properties: {
            ...school.properties,
            distance,
          },
        })),
      );
      setCurrentClosestSchoolPosition(
        new LatLng(
          distances[0].school.properties.latitude,
          distances[0].school.properties.longitude,
        ),
      );
    } else {
      setClosestSchools(null);
      setCurrentClosestSchoolPosition(null);
      return;
    }
    const closestSchool = distances[0].school;
    const closestMarker = markersRef.current[closestSchool.properties.objectid];
    closestMarker?.openPopup();
  }, [currentPosition, schools, setClosestSchools]);

  useEffect(() => {
    calculateClosestSchools();
  }, [currentPosition, schools, calculateClosestSchools]);

  const MapClickHandler = () => {
    useMapEvents({
      click: ({ latlng }) => {
        setCurrentPosition(new LatLng(latlng.lat, latlng.lng));
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
          key={properties.objectid}
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
      {currentClosestSchoolPosition && currentPosition && (
        <RoutingMachine
          start={currentPosition}
          end={currentClosestSchoolPosition}
        />
      )}
      {currentPosition && (
        <Marker position={currentPosition} icon={currentPositionIcon}>
          <Popup>Your position</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;

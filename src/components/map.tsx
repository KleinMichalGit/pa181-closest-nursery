"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L, { LatLng } from "leaflet";
import { ClosestSchoolType, MapType, SchoolProperties } from "@/types/map-type";
import MapPopup from "@/components/map/map-popup";
import axios from "axios";

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

interface RoutingMachineProps {
  start: LatLng;
  end: LatLng;
}

const RoutingMachine = ({ start, end }: RoutingMachineProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const fetchRoute = async () => {
      const apiKey = "5b3ce3597851110001cf62483147e8f114534b5fbc7f76079c0ccd63";
      const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`;

      try {
        const response = await axios.get(url);
        const coordinates = response.data.features[0].geometry.coordinates;
        const latlngs = coordinates.map(
          (coord: [number, number]) =>
            [coord[1], coord[0]] as L.LatLngExpression,
        );

        const route = L.polyline(latlngs, { color: "blue" }).addTo(map);
        map.fitBounds(route.getBounds());

        return () => {
          map.removeLayer(route);
        };
      } catch (error) {
        console.error("Error fetching route", error);
      }
    };

    fetchRoute();
  }, [map, start, end]);

  return null;
};

const Map = ({ schools, setClosestSchools }: MapProps) => {
  const [currentPosition, setCurrentPosition] = useState<LatLng[]>([]);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const [currentClosestSchoolPosition, setCurrentClosestSchoolPosition] =
    useState<LatLng | null>(null);

  const calculateClosestSchools = useCallback(() => {
    if (currentPosition.length === 0) {
      setClosestSchools(null);
      setCurrentClosestSchoolPosition(null);
      return;
    }

    const distances = schools.map((school) => {
      const { latitude, longitude } = school.properties;
      const distance = currentPosition[0]?.distanceTo(
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
  }, [currentPosition, schools]);

  useEffect(() => {
    calculateClosestSchools();
  }, [currentPosition, schools]);

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
      {
        // Render the route only when the current position and the closest school are set
        currentClosestSchoolPosition && currentPosition[0] && (
          <RoutingMachine
            start={currentPosition[0]}
            end={currentClosestSchoolPosition}
          />
        )
      }
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

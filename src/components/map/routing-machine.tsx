import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L, { LatLng } from "leaflet";
import axios from "axios";

interface RoutingMachineProps {
  start: LatLng;
  end: LatLng;
}

const RoutingMachine: React.FC<RoutingMachineProps> = ({ start, end }) => {
  const map = useMap();

  if (!map) return;

  const fetchRoute = async () => {
    const apiKey = process.env.NEXT_PUBLIC_OPEN_ROUTE_API;
    console.log(start, end);
    const url = `https://api.openrouteservice.org/v2/directions/wheelchair?api_key=${apiKey}&start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`;

    try {
      const response = await axios.get(url);
      const coordinates = response.data.features[0].geometry.coordinates;
      const latlngs = coordinates.map(
        (coord: [number, number]) => [coord[1], coord[0]] as L.LatLngExpression,
      );

      // Add new route layer to the map
      const newRouteLayer = L.polyline(latlngs, { color: "blue" }).addTo(map);
      map.fitBounds(newRouteLayer.getBounds());
    } catch (error) {
      console.error("Error fetching route", error);
    }
  };

  fetchRoute();
  return null;
};

export default RoutingMachine;

import React, { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L, { LatLng } from "leaflet";
import axios from "axios";
import { toast } from "sonner";

interface RoutingMachineProps {
  start: LatLng;
  end: LatLng;
}

const RoutingMachine: React.FC<RoutingMachineProps> = ({ start, end }) => {
  const map = useMap();
  const routeLayerRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    const fetchRoute = async () => {
      const apiKey = process.env.NEXT_PUBLIC_OPEN_ROUTE_API;
      const url = `https://api.openrouteservice.org/v2/directions/wheelchair?api_key=${apiKey}&start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`;

      try {
        const response = await axios.get(url);

        const coordinates = response.data.features[0].geometry.coordinates;
        const latlngs = coordinates.map(
          (coord: [number, number]) =>
            [coord[1], coord[0]] as L.LatLngExpression,
        );

        // Remove the previous route layer if it exists
        if (routeLayerRef.current) {
          map.removeLayer(routeLayerRef.current);
        }

        // Add new route layer to the map
        routeLayerRef.current = L.polyline(latlngs, { color: "blue" }).addTo(
          map,
        );
        map.fitBounds(routeLayerRef.current.getBounds());
      } catch (error) {
        toast.dismiss();
        toast(
          "Could not find routable point within a radius of 150.0 meters of specified coordinate",
        );
      }
    };

    fetchRoute();
  }, [start, end, map]);

  return null;
};

export default RoutingMachine;

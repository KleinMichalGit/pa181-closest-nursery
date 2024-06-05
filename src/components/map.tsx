"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

type MapType = {
  schools: Array<{
    properties: {
      title: string;
      address: string;
      telephone: string;
      longitude: number;
      latitude: number;
      email: string;
    };
  }>;
};

const Map = ({ schools }: MapType) => {
  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <MapContainer
      center={[49.195061, 16.606836]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://github.com/KleinMichalGit/pa181-closest-nursery">PA181</a> contributors'
      />
      {schools.map(
        ({
          properties: { title, address, telephone, longitude, latitude, email },
        }) => (
          <Marker position={[latitude, longitude]} key={title}>
            <Popup>
              {title} <br /> {address} <br /> {telephone} <br /> {email}
            </Popup>
          </Marker>
        ),
      )}
    </MapContainer>
  );
};

export default Map;

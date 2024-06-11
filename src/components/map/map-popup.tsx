import React from "react";
import { Popup } from "react-leaflet";

interface MapPopupProps {
  title: string;
  address: string;
  telephone: string;
  email: string;
  director: string;
  website: string;
  school_capacity: number;
}

const MapPopup: React.FC<MapPopupProps> = ({
  title,
  address,
  telephone,
  email,
  director,
  website,
  school_capacity,
}) => {
  //TODO add localisation
  return (
    <Popup>
      <div>
        <strong>{title}</strong>
        <br />

        <strong>address: </strong>
        {address}
        <br />

        <strong>telephone: </strong>
        {telephone}
        <br />

        <strong>email: </strong>
        <a href={`mailto:${email}`}>{email}</a>
        <br />

        <strong>director: </strong>
        {director}
        <br />

        <strong>website: </strong>
        <a href={website} target="_blank">
          {website}
        </a>
        <br />

        <strong>school capacity: </strong>
        {school_capacity === 0 ? "neuvedeno" : school_capacity}
        <br />
      </div>
    </Popup>
  );
};

export default MapPopup;

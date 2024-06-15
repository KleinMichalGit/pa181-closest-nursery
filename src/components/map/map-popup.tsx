import React from "react";
import { Popup } from "react-leaflet";
import { useLanguageContext } from "@/contexts/language-context";

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
  const { translations } = useLanguageContext();

  return (
    <Popup>
      <div>
        <strong>{translations.title}</strong>
        {title}
        <br />

        <strong>{translations.address}: </strong>
        {address}
        <br />

        <strong>{translations.telephone}: </strong>
        {telephone}
        <br />

        <strong>{translations.email}: </strong>
        <a href={`mailto:${email}`}>{email}</a>
        <br />

        <strong>{translations.director}: </strong>
        {director}
        <br />

        <strong>{translations.website}: </strong>
        <a href={website} target="_blank" rel="noreferrer">
          {website}
        </a>
        <br />

        <strong>{translations.schoolCapacity}: </strong>
        {school_capacity === 0 ? translations.notSpecified : school_capacity}
        <br />
      </div>
    </Popup>
  );
};

export default MapPopup;

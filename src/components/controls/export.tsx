import React from "react";
import { CSVLink } from "react-csv";
import { FaFileCsv } from "react-icons/fa";
import { ClosestSchoolType } from "@/types/map-type";
import {useLanguageContext} from "@/contexts/language-context";

interface ExportProps {
  closestSchools: ClosestSchoolType[];
  isInMobileMenu: boolean;
}

const Export: React.FC<ExportProps> = ({ closestSchools, isInMobileMenu }) => {
  const { translations } = useLanguageContext();
  const headers = [
    { label: translations.kClosest, key: "kthclosest" },
    { label: translations.title, key: "title" },
    { label: translations.address, key: "address" },
    { label: translations.telephone, key: "telephone" },
    { label: translations.email, key: "email" },
    { label: translations.director, key: "director" },
    { label: translations.website, key: "website" },
    { label: translations.schoolCapacity, key: "school_capacity" },
    { label: translations.distance + " (" + translations.meters + ")", key: "distance" },
  ];

  const escapeCsvField = (field: string) => {
    return field.replaceAll(",", ";");
  };

  const csvData = closestSchools.map((school, index) => ({
    kthclosest: index,
    title: escapeCsvField(school.properties?.title || "N/A"),
    address: escapeCsvField(school.properties?.address || "N/A"),
    telephone: escapeCsvField(school.properties?.telephone || "N/A"),
    email: escapeCsvField(school.properties?.email || "N/A"),
    director: escapeCsvField(school.properties?.director || "N/A"),
    website: escapeCsvField(school.properties?.website || "N/A"),
    school_capacity: escapeCsvField(
      school.properties?.school_capacity?.toString() || "N/A",
    ),
    distance: Math.round(school.properties?.distance ?? 0).toString(),
  }));

  return (
    <CSVLink
      data={csvData}
      headers={headers}
      filename={"closest_nursery.csv"}
      className="flex px-3 my-2.5 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
      style={{ transform: "translateY(4px)" }}
      target="_blank"
    >
      {isInMobileMenu && translations.export}
      <FaFileCsv />
    </CSVLink>
  );
};

export default Export;

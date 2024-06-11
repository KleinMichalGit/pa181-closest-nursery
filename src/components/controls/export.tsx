import React from "react";
import { CSVLink } from "react-csv";
import { FaFileCsv } from "react-icons/fa";
import { ClosestSchoolType } from "@/types/map-type";

interface ExportProps {
  closestSchools: ClosestSchoolType[];
  isInMobileMenu: boolean;
}

const Export = ({ closestSchools, isInMobileMenu }: ExportProps) => {
  const headers = [
    { label: "k-th closest", key: "kthclosest" },
    { label: "title", key: "title" },
    { label: "address", key: "address" },
    { label: "telephone", key: "telephone" },
    { label: "email", key: "email" },
    { label: "director", key: "director" },
    { label: "website", key: "website" },
    { label: "school capacity", key: "school_capacity" },
    { label: "distance (meters)", key: "distance" },
  ];

  const csvData = closestSchools.map((school, index) => ({
    kthclosest: index,
    title: school.properties?.title || "N/A",
    address: school.properties?.address || "N/A",
    telephone: school.properties?.telephone || "N/A",
    email: school.properties?.email || "N/A",
    director: school.properties?.director || "N/A",
    website: school.properties?.website || "N/A",
    school_capacity: school.properties?.school_capacity || "N/A",
    distance: Math.round(school.properties?.distance ?? 0),
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
      {isInMobileMenu && "Export"}
      <FaFileCsv />
    </CSVLink>
  );
};

export default Export;

"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navigation from "@/components/navigation/navigation";
import SideMenu from "@/components/navigation/side-menu";
import { ClosestSchoolType, MapType } from "@/types/map-type";

// Dynamically import the Map component with client-side rendering only
const Map = dynamic(() => import("../components/map"), { ssr: false });

const MainContent: React.FC<MapType> = ({ schools }) => {
  const [filter, setFilter] = useState("");
  const [closestSchools, setClosestSchools] = useState<
    ClosestSchoolType[] | null
  >(null);
  const [filteredSchools, setFilteredSchools] = useState(schools);

  const handleFilterChange = (filterValue: string) => {
    setFilter(filterValue);
  };

  useEffect(() => {
    const lowerCaseFilter = filter.toLowerCase();
    const newFilteredSchools = schools.filter((school) => {
      const { address, title, telephone, email, director, website } =
        school.properties;
      return (
        address.toLowerCase().includes(lowerCaseFilter) ||
        title.toLowerCase().includes(lowerCaseFilter) ||
        telephone.toLowerCase().includes(lowerCaseFilter) ||
        email.toLowerCase().includes(lowerCaseFilter) ||
        director.toLowerCase().includes(lowerCaseFilter) ||
        website.toLowerCase().includes(lowerCaseFilter)
      );
    });
    setFilteredSchools(newFilteredSchools);
  }, [filter, schools]);

  return (
    <>
      <Navigation
        setFilter={handleFilterChange}
        closestSchools={closestSchools}
      />
      <main className="block md:flex justify-between mx-auto px-4 z-0 relative">
        <SideMenu closestSchools={closestSchools} />
        <Map schools={filteredSchools} setClosestSchools={setClosestSchools} />
      </main>
    </>
  );
};

export default MainContent;

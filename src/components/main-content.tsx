"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Navigation from "@/components/navigation/navigation";
import SideMenu from "@/components/navigation/side-menu";
import { ClosestSchoolType, MapType } from "@/types/map-type";

const Map = dynamic(() => import("../components/map"), { ssr: false });

const MainContent: React.FC<MapType> = ({ schools }) => {
  const [filter, setFilter] = useState("");
  const [closestSchools, setClosestSchools] = useState<
    ClosestSchoolType[] | null
  >(null);

  const handleFilterChange = (filterValue: string) => {
    setFilter(filterValue);
  };

  const filteredSchools = schools.filter((school) => {
    const { address, title, telephone, email, director, website } =
      school.properties;
    const filterLower = filter.toLowerCase();
    return (
      address.toLowerCase().includes(filterLower) ||
      title.toLowerCase().includes(filterLower) ||
      telephone.toLowerCase().includes(filterLower) ||
      email.toLowerCase().includes(filterLower) ||
      director.toLowerCase().includes(filterLower) ||
      website.toLowerCase().includes(filterLower)
    );
  });

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

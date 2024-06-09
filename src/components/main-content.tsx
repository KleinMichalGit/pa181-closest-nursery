"use client";

import { useState } from "react";
import Navigation from "@/components/navigation/navigation";
import dynamic from "next/dynamic";
import { ClosestSchoolType, MapType } from "@/types/map-type";
import SideMenu from "@/components/navigation/side-menu";

const Map = dynamic(() => import("../components/map"), { ssr: false });

const MainContent = ({ schools }: MapType) => {
  const [filter, setFilter] = useState("");
  const [closestSchool, setClosestSchool] = useState<ClosestSchoolType | null>(
    null,
  );

  const filteredSchools =
    filter === ""
      ? schools
      : schools.filter(
          (school) =>
            school.properties.address
              .toLowerCase()
              .includes(filter.toLowerCase()) ||
            school.properties.title
              .toLowerCase()
              .includes(filter.toLowerCase()) ||
            school.properties.telephone
              .toLowerCase()
              .includes(filter.toLowerCase()) ||
            school.properties.email
              .toLowerCase()
              .includes(filter.toLowerCase()),
        );

  return (
    <>
      <Navigation setFilter={setFilter} closestSchool={closestSchool} />
      <main className="max-w-screen-xl block md:flex justify-between mx-auto pl-4 pr-4 z-0 relative">
        <SideMenu closestSchool={closestSchool} />
        <Map schools={filteredSchools} setClosestSchool={setClosestSchool} />
      </main>
    </>
  );
};

export default MainContent;

"use client";

import Link from "next/link";
import Image from "next/image";
import NavItem from "@/components/navigation/nav-item";
import { useEffect, useState } from "react";
import Search from "@/components/navigation/search";

type SetFilterType = {
  setFilter: (search: string) => void;
};

const Navigation = ({ setFilter }: SetFilterType) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    setFilter(search);
  }, [search]);

  return (
    <nav>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="/favicon.ico"
            alt="Flowbite Logo"
            width={30}
            height={30}
            className="visible"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white hidden md:block ">
            PA181 Closest Nursery
          </span>
        </Link>
        <div
          className="items-center justify-between flex w-auto order-1"
          id="navbar-search"
        >
          <ul className="flex p-0 font-medium rounded-lg space-x-8 rtl:space-x-reverse flex-row mt-0 border-0">
            <li>
              <NavItem id={"about"} text={"About"} />
            </li>
            <li>
              <NavItem id="accessibility" text="High Accessibility" />
            </li>
            <li>
              <Search setSearch={setSearch} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

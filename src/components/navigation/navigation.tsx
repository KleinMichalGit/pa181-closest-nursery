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
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            PA181 Closest Nursery
          </span>
        </Link>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-search"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
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

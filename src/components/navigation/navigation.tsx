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
    <nav className="navbar bg-base-100">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 navbar-start">
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
          <span className="self-center text-2xl font-semibold whitespace-nowrap hidden md:block ">
            PA181 Closest Nursery
          </span>
        </Link>
      </div>
      <div className="navbar-center block md:hidden">
        <Search setSearch={setSearch} />
      </div>
      <div className="navbar-end">
        <ul className="p-0 font-medium rounded-lg space-x-8 rtl:space-x-reverse flex-row mt-0 border-0 hidden md:flex">
          <li>
            <NavItem id={"about"} text={"About"} />
          </li>
          <li>
            <NavItem id="accessibility" text="Accessibility" />
          </li>
          <li>
            <Search setSearch={setSearch} />
          </li>
        </ul>
        <div className="dropdown dropdown-end block md:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavItem id={"about"} text={"About"} />
            </li>
            <li>
              <NavItem id="accessibility" text="Accessibility" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

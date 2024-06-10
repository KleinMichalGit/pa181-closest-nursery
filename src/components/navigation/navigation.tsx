import Link from "next/link";
import Image from "next/image";
import NavItem from "@/components/navigation/nav-item";
import { useEffect, useState } from "react";
import Search from "@/components/navigation/search";
import { CSVLink } from "react-csv";
import { FaFileCsv } from "react-icons/fa";
import { ClosestSchoolType } from "@/types/map-type";
import { useLanguageContext } from "@/contexts/language-context";

type NavigationType = {
  setFilter: (search: string) => void;
  closestSchool: ClosestSchoolType | null;
};

const Navigation = ({ setFilter, closestSchool }: NavigationType) => {
  const [search, setSearch] = useState("");
  const { language, translations } = useLanguageContext();
  const csvData = [
    ["title", "address", "telephone", "email", "distance (meters)"],
    [
      closestSchool?.properties?.title,
      closestSchool?.properties?.address,
      closestSchool?.properties?.telephone,
      closestSchool?.properties?.email,
      Math.round(closestSchool?.properties?.distance ?? 0),
    ],
  ];
  useEffect(() => {
    setFilter(search);
  }, [search, setFilter]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
          <span className="self-center font-semibold whitespace-nowrap hidden md:block">
            {translations.logo}
          </span>
        </Link>
      </div>
      <div className="navbar-center block md:hidden">
        <Search setSearch={setSearch} />
      </div>
      <div className="navbar-end md:pr-4">
        <ul className="p-0 font-medium rounded-lg space-x-8 rtl:space-x-reverse flex-row mt-0 border-0 hidden md:flex">
          {closestSchool !== null && (
            <li>
              <CSVLink
                data={csvData}
                filename={"closest_nursery.csv"}
                className="flex px-3 my-2.5 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 md:dark:hover:bg-transparent"
                style={{ transform: "translateY(4px)" }}
                target="_blank"
              >
                <FaFileCsv />
              </CSVLink>
            </li>
          )}

          <li>
            <NavItem id={"about"} text={translations.about} />
          </li>
          <li>
            <NavItem id="accessibility" text={translations.accessibility} />
          </li>
          <li>
            <Search setSearch={setSearch} />
          </li>
        </ul>
        <div className="dropdown dropdown-end block md:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
            onClick={toggleDropdown}
          >
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
          {isOpen && (
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {closestSchool !== null && (
                <li>
                  <CSVLink
                    data={csvData}
                    filename={"closest_nursery.csv"}
                    className="flex px-3 my-2.5 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 md:dark:hover:bg-transparent"
                    target="_blank"
                    onClick={() => toggleDropdown()}
                  >
                    Export <FaFileCsv />
                  </CSVLink>
                </li>
              )}

              <li>
                <NavItem
                  id={"about"}
                  text={"About"}
                  toggleDropdown={toggleDropdown}
                />
              </li>
              <li>
                <NavItem
                  id="accessibility"
                  text="Accessibility"
                  toggleDropdown={toggleDropdown}
                />
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

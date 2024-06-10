import Link from "next/link";
import Image from "next/image";
import NavItem from "@/components/navigation/nav-item";
import { useEffect, useState, useRef } from "react";
import Search from "@/components/navigation/search";
import { CSVLink } from "react-csv";
import { FaFileCsv, FaPrint } from "react-icons/fa";
import { ClosestSchoolType } from "@/types/map-type";
import { useLanguageContext } from "@/contexts/language-context";

type NavigationType = {
  setFilter: (search: string) => void;
  closestSchools: ClosestSchoolType[] | null;
};

const Navigation = ({ setFilter, closestSchools }: NavigationType) => {
  const [search, setSearch] = useState("");
  const { translations } = useLanguageContext();
  const printRef = useRef<HTMLDivElement>(null);

  const headers = [
    { label: "k-th closest", key: "kthclosest" },
    { label: "title", key: "title" },
    { label: "address", key: "address" },
    { label: "telephone", key: "telephone" },
    { label: "email", key: "email" },
    { label: "distance (meters)", key: "distance" },
  ];

  const csvData =
    closestSchools?.map((school, index) => ({
      kthclosest: index,
      title: school?.properties?.title,
      address: school?.properties?.address,
      telephone: school?.properties?.telephone,
      email: school?.properties?.email,
      distance: Math.round(school?.properties?.distance ?? 0),
    })) || [];

  useEffect(() => {
    setFilter(search);
  }, [search]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
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
          {closestSchools !== null && (
            <>
              <li>
                <CSVLink
                  data={csvData}
                  headers={headers}
                  filename={"closest_nursery.csv"}
                  className="flex px-3 my-2.5 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                  style={{ transform: "translateY(4px)" }}
                  target="_blank"
                >
                  <FaFileCsv />
                </CSVLink>
              </li>
              <li>
                <button
                  onClick={handlePrint}
                  className="flex px-3 my-2.5 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                  style={{ transform: "translateY(4px)" }}
                >
                  <FaPrint />
                </button>
              </li>
            </>
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
              {closestSchools !== null && (
                <>
                  <li>
                    <CSVLink
                      data={csvData}
                      headers={headers}
                      filename={"closest_nursery.csv"}
                      className="flex px-3 my-2.5 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                      target="_blank"
                      onClick={() => toggleDropdown()}
                    >
                      Export <FaFileCsv />
                    </CSVLink>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        toggleDropdown();
                        handlePrint();
                      }}
                      className="flex px-3 my-2.5 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                    >
                      Print <FaPrint />
                    </button>
                  </li>
                </>
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

      {/* Hidden print area */}
      <div ref={printRef} style={{ display: "none" }}>
        <table>
          <thead>
            <tr>
              <th>k-th closest</th>
              <th>title</th>
              <th>address</th>
              <th>telephone</th>
              <th>email</th>
              <th>distance (meters)</th>
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, index) => (
              <tr key={index}>
                <td>{row.kthclosest}</td>
                <td>{row.title}</td>
                <td>{row.address}</td>
                <td>{row.telephone}</td>
                <td>{row.email}</td>
                <td>{row.distance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </nav>
  );
};

export default Navigation;

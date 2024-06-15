import { useRef } from "react";
import { FaPrint } from "react-icons/fa";
import { ClosestSchoolType } from "@/types/map-type";
import { useLanguageContext } from "@/contexts/language-context";

type PrintType = {
  closestSchools: ClosestSchoolType[];
  isInMobileMenu: boolean;
};

const Print = ({ closestSchools, isInMobileMenu }: PrintType) => {
  const printRef = useRef<HTMLDivElement>(null);
  const { translations } = useLanguageContext();

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
    <>
      <button
        onClick={handlePrint}
        className="flex px-3 my-2.5 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
        style={{ transform: "translateY(4px)" }}
      >
        {isInMobileMenu && translations.print}
        <FaPrint />
      </button>
      <div ref={printRef} style={{ display: "none" }}>
        <table>
          <thead>
            <tr>
              <th>{translations.kClosest}</th>
              <th>{translations.title}</th>
              <th>{translations.address}</th>
              <th>{translations.telephone}</th>
              <th>{translations.email}</th>
              <th>
                {translations.distance} ({translations.meters})
              </th>
            </tr>
          </thead>
          <tbody>
            {closestSchools.map((row, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{row.properties?.title || "N/A"}</td>
                <td>{row.properties?.address || "N/A"}</td>
                <td>{row.properties?.telephone || "N/A"}</td>
                <td>{row.properties?.email || "N/A"}</td>
                <td>{Math.round(row.properties?.distance ?? 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Print;

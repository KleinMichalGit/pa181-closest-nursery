import { useRef } from "react";
import { FaPrint } from "react-icons/fa";

type PrintType = {
  isInMobileMenu: boolean;
};

const Print = ({ isInMobileMenu }: PrintType) => {
  const printRef = useRef<HTMLDivElement>(null);

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
    <button
      onClick={handlePrint}
      className="flex px-3 my-2.5 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
      style={{ transform: "translateY(4px)" }}
    >
      {isInMobileMenu && "Print"}
      <FaPrint />
    </button>
  );
};

export default Print;

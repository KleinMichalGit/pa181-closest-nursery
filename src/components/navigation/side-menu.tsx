import { ClosestSchoolType } from "@/types/map-type";
import { useLanguageContext } from "@/contexts/language-context";
import {
  HiClipboardDocument,
  HiPhoneArrowUpRight,
  HiEnvelope,
} from "react-icons/hi2";
import { useRef, useState } from "react";

const SideMenu = ({
  closestSchool,
}: {
  closestSchool: ClosestSchoolType | null;
}) => {
  const { translations } = useLanguageContext();
  const [copySuccess, setCopySuccess] = useState(false);
  const addressRef = useRef<HTMLInputElement>(null);

  const copyToClipboard = (ref: React.RefObject<HTMLInputElement>) => {
    const text = ref.current?.value;
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000); // Hide success message after 2 seconds
      });
    }
  };

  return (
    <aside className="p-2.5 h-full w-full md:w-96">
      {closestSchool?.properties ? (
        <>
          <h1 className="font-medium mb-2">Closest nursery</h1>

          <ul className="space-y-1 list-inside">
            <li>
              <label htmlFor="message" className="block mb-2 font-medium">
                Title
              </label>
              <textarea
                id="message"
                rows={4}
                className="block p-2.5 w-full rounded-lg focus:ring-blue-500"
                placeholder={closestSchool.properties.title}
                value={closestSchool.properties.title}
                disabled={true}
              ></textarea>
            </li>
            <li>
              <label htmlFor="input-address" className="block mb-2 font-medium">
                Address
              </label>
              <div className="relative mb-6">
                <input
                  type="text"
                  id="input-address"
                  ref={addressRef}
                  disabled={true}
                  className="rounded-lg block w-full p-2.5" // Explicit text color
                  placeholder={closestSchool.properties.address}
                  value={closestSchool.properties.address}
                />
                <button
                  onClick={() => copyToClipboard(addressRef)}
                  data-tooltip-target="tooltip-copy"
                  className="absolute end-2 top-1/2 -translate-y-1/2 rounded-lg p-2 inline-flex items-center justify-center"
                >
                  <HiClipboardDocument
                    id="default-icon"
                    className={copySuccess ? "hidden" : "inline"}
                  />
                  <span
                    id="success-icon"
                    className={
                      copySuccess ? "inline-flex items-center" : "hidden"
                    }
                  >
                    <svg
                      className="w-3.5 h-3.5 text-blue-700 dark:text-blue-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </li>
            <li>
              <label htmlFor="input-phone" className="block mb-2 font-medium">
                Telephone
              </label>
              <div className="relative mb-6">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5">
                  <HiPhoneArrowUpRight />
                </div>
                <a href={`tel:${closestSchool.properties.telephone}`}>
                  <input
                    type="text"
                    id="input-phone"
                    disabled={true}
                    className="rounded-lg block w-full ps-10 p-2.5 hover:bg-blue-700 cursor-pointer"
                    placeholder={closestSchool.properties.telephone}
                    value={closestSchool.properties.telephone}
                  />
                </a>
              </div>
            </li>
            <li>
              <label htmlFor="input-email" className="block mb-2 font-medium">
                Email
              </label>
              <div className="relative mb-6">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5">
                  <HiEnvelope />
                </div>
                <a href={`mailto:${closestSchool.properties.email}`}>
                  <input
                    type="text"
                    id="input-email"
                    disabled={true}
                    className="rounded-lg block w-full ps-10 p-2.5 hover:bg-blue-700 cursor-pointer"
                    placeholder={closestSchool.properties.email}
                    value={closestSchool.properties.email}
                  />
                </a>
              </div>
            </li>
            <li>
              <label htmlFor="distance" className="block mb-2 font-medium">
                Distance
              </label>
              <p className="text-warning" id="distance">
                {Math.round(closestSchool.properties.distance)} meters
              </p>
            </li>
          </ul>
        </>
      ) : (
        <p>{translations.beforeSelectingCurrentPosition}</p>
      )}
    </aside>
  );
};

export default SideMenu;

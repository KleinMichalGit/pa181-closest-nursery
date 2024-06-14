import { ClosestSchoolType } from "@/types/map-type";
import { useLanguageContext } from "@/contexts/language-context";

const SideMenu = ({
  closestSchools,
}: {
  closestSchools: ClosestSchoolType[] | null;
}) => {
  const { translations } = useLanguageContext();
  const closestSchool = closestSchools?.[0];

  return (
    <aside
      className="p-2.5 w-full md:w-96 overflow-y-scroll scrol"
      style={{ height: "calc(100dvh - 76px)", scrollbarWidth: "thin" }}
      aria-label={translations.closestSchool}
    >
      {closestSchool?.properties ? (
        <>
          <ul className="space-y-1 list-inside">
            <li>
              <label htmlFor="message" className="block mb-2 font-medium">
                {translations.title}
              </label>
              <div className="relative mb-6">
                {closestSchool.properties.title}
              </div>
            </li>
            <li>
              <label htmlFor="input-address" className="block mb-2 font-medium">
                {translations.address}
              </label>
              <div className="relative mb-6">
                {closestSchool.properties.address}
              </div>
            </li>
            <li>
              <label htmlFor="distance" className="block mb-2 font-medium">
                {translations.distance}
              </label>
              <div className="relative mb-6">
                {Math.round(closestSchool.properties.distance)}{" "}
                {translations.meters}
              </div>
            </li>
            <li>
              <label htmlFor="input-phone" className="block mb-2 font-medium">
                {translations.telephone}
              </label>
              <div className="relative mb-6">
                <a href={`tel:${closestSchool.properties.telephone}`}>
                  {closestSchool.properties.telephone}
                </a>
              </div>
            </li>
            <li>
              <label htmlFor="input-email" className="block mb-2 font-medium">
                {translations.email}
              </label>
              <div className="relative mb-6">
                <a href={`mailto:${closestSchool.properties.email}`}>
                  {closestSchool.properties.email}
                </a>
              </div>
            </li>
            <li>
              <label
                htmlFor="input-director"
                className="block mb-2 font-medium"
              >
                {translations.director}
              </label>
              <div className="relative mb-6">
                {closestSchool.properties.director}
              </div>
            </li>
            <li>
              <label htmlFor="input-website" className="block mb-2 font-medium">
                {translations.website}
              </label>
              <div className="relative mb-6">
                <a
                  href={closestSchool.properties.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  {closestSchool.properties.website}
                </a>
              </div>
            </li>
            <li>
              <label
                htmlFor="input-capacity"
                className="block mb-2 font-medium"
              >
                {translations.schoolCapacity}
              </label>
              <div className="relative mb-6">
                {closestSchool.properties.school_capacity === 0
                  ? translations.notSpecified
                  : closestSchool.properties.school_capacity}
              </div>
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

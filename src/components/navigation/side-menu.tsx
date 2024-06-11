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
    <aside className="p-2.5 h-full w-full md:w-96">
      {closestSchool?.properties ? (
        <>
          <ul className="space-y-1 list-inside">
            <li>
              <label htmlFor="message" className="block mb-2 font-medium">
                Title
              </label>
              <div className="relative mb-6">
                {closestSchool.properties.title}
              </div>
            </li>
            <li>
              <label htmlFor="input-address" className="block mb-2 font-medium">
                Address
              </label>
              <div className="relative mb-6">
                {closestSchool.properties.address}
              </div>
            </li>
            <li>
              <label htmlFor="input-phone" className="block mb-2 font-medium">
                Telephone
              </label>
              <div className="relative mb-6">
                <a href={`tel:${closestSchool.properties.telephone}`}>
                  {closestSchool.properties.telephone}
                </a>
              </div>
            </li>
            <li>
              <label htmlFor="input-email" className="block mb-2 font-medium">
                Email
              </label>
              <div className="relative mb-6">
                <a href={`mailto:${closestSchool.properties.email}`}>
                  {closestSchool.properties.email}
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

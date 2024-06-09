import { ClosestSchoolType } from "@/types/map-type";
import { useLanguageContext } from "@/contexts/language-context";

const SideMenu = ({
  closestSchool,
}: {
  closestSchool: ClosestSchoolType | null;
}) => {
  const { translations } = useLanguageContext();
  return (
    <aside className="p-2.5 h-full w-full md:w-2/12">
      {closestSchool?.properties ? (
        <>
          <h3 className="font-bold text-lg select-none">Closest nursery</h3>

          <div className="py-4">
            <p className="text-warning">
              {Math.round(closestSchool.properties.distance)} meters
            </p>
            <p>
              {closestSchool.properties.title}
              <br />
              {closestSchool.properties.address}
              <br />
              {closestSchool.properties.telephone}
              <br />
              {closestSchool.properties.email}
            </p>
          </div>
        </>
      ) : (
        <p>{translations.beforeSelectingCurrentPosition}</p>
      )}
    </aside>
  );
};

export default SideMenu;

import MainContent from "@/components/main-content";
import { Nursery } from "@/types/nursery";

async function fetchData(): Promise<Nursery> {
  const response = await fetch(
    "https://gis.brno.cz/ags1/rest/services/ODAE/ODAE_zapis_ms/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
  );

  return response.json();
}

export default async function Home() {
  const data = await fetchData();
  return <MainContent schools={data.features} />;
}

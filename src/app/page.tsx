import { Nursery } from "@/types/nursery";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/map"), { ssr: false });

async function fetchData(): Promise<Nursery> {
  const response = await fetch(
    "https://gis.brno.cz/ags1/rest/services/ODAE/ODAE_zapis_ms/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
  );

  return response.json();
}

export default async function Home() {
  const data = await fetchData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>PA181</h1>
      <Map schools={data.features} />
      {data.features.map(
        ({
          properties: { title, address, telephone, longitude, latitude, email },
        }) => (
          <div key={title} className="p-4 m-4 border border-gray-300">
            <h2>{address}</h2>
            <p>{telephone}</p>
            <p>{longitude}</p>
            <p>{latitude}</p>
            <p>{email}</p>
          </div>
        ),
      )}
    </main>
  );
}

import { Nursery } from "@/types/nursery";

export default async function Home() {
  const data: Nursery = await (
    await fetch(
      "https://gis.brno.cz/ags1/rest/services/ODAE/ODAE_zapis_ms/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
    )
  ).json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>PA181</h1>
      {data.features.map((feature: any) => (
        <div
          key={feature.properties.title}
          className="p-4 m-4 border border-gray-300"
        >
          <h2>{feature.properties.address}</h2>
          <p>{feature.properties.telephone}</p>
          <p>{feature.properties.longitude}</p>
          <p>{feature.properties.latitude}</p>
          <p>{feature.properties.email}</p>
        </div>
      ))}
    </main>
  );
}

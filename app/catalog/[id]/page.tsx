import CamperDetailsContent from "@/components/CamperDetailsContent/CamperDetailsContent";

export default async function CamperDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  return (
    <main style={{ padding: "40px 64px" }}>
      <CamperDetailsContent id={id} />
    </main>
  );
}

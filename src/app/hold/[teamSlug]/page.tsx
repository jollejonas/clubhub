import Link from "next/link";
import { clubConfig } from "@/config/club.config";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ teamSlug: string }>;
}

export default async function TeamPage({ params }: Props) {
  const { teamSlug } = await params;
  const team = clubConfig.teams.find((t) => t.id === teamSlug);

  if (!team) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Link href="/hold" className="text-sm mb-6 block hover:underline" style={{ color: "var(--club-secondary)" }}>
        ← Alle hold
      </Link>
      <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--club-secondary)" }}>
        {team.name}
      </h1>
      <p style={{ color: "var(--club-textMuted)" }}>
        {team.ageGroup} · {team.gender === "men" ? "Herrer" : team.gender === "women" ? "Damer" : "Mixed"}
      </p>
      <div className="mt-8 p-6 rounded border" style={{ borderColor: "var(--club-border)", backgroundColor: "var(--club-surface)" }}>
        <p style={{ color: "var(--club-textMuted)" }}>Spillerinfo og kampprogram kommer snart.</p>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return clubConfig.teams.map((team) => ({ teamSlug: team.id }));
}

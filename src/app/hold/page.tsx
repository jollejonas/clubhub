import Link from "next/link";
import { clubConfig } from "@/config/club.config";

export default function HoldPage() {
  return (
    <>
      <section className="bg-secondary text-white py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-display-lg font-heading font-bold">Hold</h1>
          <p className="text-body-sm text-white/70 mt-2">
            <Link href="/" className="hover:text-accent transition-colors">Forside</Link>
            {" / Hold"}
          </p>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {clubConfig.teams.map((team) => (
            <Link
              key={team.id}
              href={`/hold/${team.id}`}
              className="p-4 rounded border border-l-4 bg-surface hover:shadow-md hover:-translate-y-0.5 transition-all"
              style={{ borderColor: "var(--club-border)", borderLeftColor: "var(--club-primary)" }}
            >
              <div className="font-semibold text-lg">{team.name}</div>
              <div className="text-sm mt-1 text-primary">
                {team.ageGroup} · {team.gender === "men" ? "Herrer" : team.gender === "women" ? "Damer" : "Mixed"}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

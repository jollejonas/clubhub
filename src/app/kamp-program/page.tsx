"use client";

import { useState } from "react";
import { clubConfig } from "@/config/club.config";
import { dummyMatches } from "@/lib/dbu/dummy-data";

// Dummy league table — Herrer Serie 4 Pulje 91, Forår 2026 (clubs sourced from live site)
const dummyTable = [
  { pos: 1, club: "Grindsted GIF",     k: 5, v: 4, u: 1, t: 0, mf: 16, mm: 4,  diff: 12, pts: 13 },
  { pos: 2, club: "Vandel IF",         k: 5, v: 4, u: 0, t: 1, mf: 14, mm: 7,  diff: 7,  pts: 12 },
  { pos: 3, club: "Vorbasse B",        k: 5, v: 3, u: 1, t: 1, mf: 13, mm: 6,  diff: 7,  pts: 10, isOwn: true },
  { pos: 4, club: "Give IF",           k: 5, v: 2, u: 1, t: 2, mf: 10, mm: 9,  diff: 1,  pts: 7 },
  { pos: 5, club: "Holsted FB",        k: 5, v: 2, u: 0, t: 3, mf: 8,  mm: 11, diff: -3, pts: 6 },
  { pos: 6, club: "Andrup IF",        k: 5, v: 1, u: 1, t: 3, mf: 6,  mm: 13, diff: -7, pts: 4 },
  { pos: 7, club: "Filskov-Egtved IF", k: 5, v: 1, u: 0, t: 4, mf: 5,  mm: 15, diff: -10, pts: 3 },
  { pos: 8, club: "Bramming IF",       k: 5, v: 0, u: 0, t: 5, mf: 3,  mm: 20, diff: -17, pts: 0 },
];

const TEAM_TABS = ["Alle", "Herre Senior", "Kvinde Senior", "U15", "U13", "U11", "U9", "U7", "U5"];

function formatDate(iso: string) {
  const d = new Date(iso);
  return {
    num: d.getDate(),
    month: d.toLocaleDateString("da-DK", { month: "short" }),
    time: d.toLocaleTimeString("da-DK", { hour: "2-digit", minute: "2-digit" }),
    monthKey: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
    monthLabel: d.toLocaleDateString("da-DK", { month: "long", year: "numeric" }),
  };
}

function ResultBadge({ homeScore, awayScore }: { homeScore?: number; awayScore?: number }) {
  if (homeScore === undefined || awayScore === undefined) return null;
  const diff = homeScore - awayScore;
  const [label, cls] =
    diff > 0 ? ["V", "bg-result-win text-white"] :
    diff < 0 ? ["T", "bg-result-loss text-white"] :
               ["U", "bg-result-draw text-white"];
  return <span className={`text-body-sm font-bold px-2 py-0.5 rounded ${cls}`}>{label}</span>;
}

export default function KampProgramPage() {
  const [activeTab, setActiveTab] = useState("Alle");

  const grouped = dummyMatches.reduce<Record<string, typeof dummyMatches>>((acc, m) => {
    const { monthKey, monthLabel } = formatDate(m.matchDate);
    const key = `${monthKey}|${monthLabel}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(m);
    return acc;
  }, {});

  return (
    <>
      {/* PageHero */}
      <section className="bg-secondary text-white py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-display-lg font-heading font-bold">Kamp-program</h1>
          <p className="text-body-sm text-white/70 mt-2">
            <a href="/" className="hover:text-accent transition-colors">Forside</a>
            {" / Kamp-program"}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 flex flex-col gap-10">
        {/* TeamFilterTabs */}
        <div className="sticky top-16 z-40 bg-background py-3 -mx-4 px-4 border-b border-club-border">
          <div className="flex gap-2 overflow-x-auto pb-1 flex-wrap">
            {TEAM_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-body-sm font-semibold flex-shrink-0 transition-colors ${
                  activeTab === tab
                    ? "bg-secondary text-white"
                    : "bg-surface text-club-text border border-club-border hover:border-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* MatchesByMonth */}
        <div className="flex flex-col gap-8">
          {Object.entries(grouped).map(([key, matches]) => {
            const monthLabel = key.split("|")[1];
            return (
              <div key={key}>
                <div className="sticky top-28 bg-background border-b border-club-border py-2 mb-4">
                  <span className="text-heading-sm font-bold text-primary uppercase tracking-wide">
                    {monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1)}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {matches.map((match, i) => {
                    const dt = formatDate(match.matchDate);
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-4 rounded-lg border border-club-border bg-surface hover:bg-primary/5 transition-colors"
                      >
                        {/* DateBlock */}
                        <div className="w-16 text-center bg-background border border-club-border rounded-lg p-2 flex-shrink-0">
                          <div className="text-heading-md text-primary font-bold leading-none">{dt.num}</div>
                          <div className="text-body-sm text-club-muted">{dt.month}</div>
                        </div>

                        {/* Match details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-body-md">{match.homeTeam}</span>
                            {match.isPlayed ? (
                              <span className="font-mono text-score font-bold text-primary">
                                {match.homeScore} – {match.awayScore}
                              </span>
                            ) : (
                              <span className="font-mono text-body-sm text-club-muted px-2">{dt.time}</span>
                            )}
                            <span className="font-semibold text-body-md">{match.awayTeam}</span>
                          </div>
                          <div className="text-body-sm text-club-muted mt-1">
                            {[match.venue, match.competition].filter(Boolean).join(" · ")}
                          </div>
                        </div>

                        {match.isPlayed && (
                          <ResultBadge homeScore={match.homeScore} awayScore={match.awayScore} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* LeagueTable */}
        <div>
          <h2 className="text-heading-md font-bold text-primary mb-4">Stilling — Senior Herrer</h2>
          <div className="overflow-x-auto rounded-lg border border-club-border">
            <table className="w-full text-body-sm">
              <thead>
                <tr className="bg-secondary text-white">
                  {["#", "Klub", "K", "V", "U", "T", "MF", "MM", "+/-", "Pts"].map((col) => (
                    <th key={col} className="px-3 py-2 text-left font-semibold whitespace-nowrap">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dummyTable.map((row, i) => (
                  <tr
                    key={row.pos}
                    className={`border-t border-club-border ${
                      row.isOwn
                        ? "bg-accent/20 font-semibold"
                        : i % 2 === 0 ? "bg-surface" : "bg-background"
                    }`}
                  >
                    <td className="px-3 py-2">{row.pos}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{row.club}</td>
                    <td className="px-3 py-2">{row.k}</td>
                    <td className="px-3 py-2">{row.v}</td>
                    <td className="px-3 py-2">{row.u}</td>
                    <td className="px-3 py-2">{row.t}</td>
                    <td className="px-3 py-2">{row.mf}</td>
                    <td className="px-3 py-2">{row.mm}</td>
                    <td className="px-3 py-2">{row.diff > 0 ? `+${row.diff}` : row.diff}</td>
                    <td className="px-3 py-2 font-bold text-primary">{row.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { dummyMatches } from "@/lib/dbu/dummy-data";
import type { MatchCardProps } from "@/types/club";

interface AdminMatch extends MatchCardProps {
  id: string;
}

function loadMatches(): AdminMatch[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("clubhub:kampe");
    if (stored) return JSON.parse(stored) as AdminMatch[];
  } catch {
    // ignore
  }
  return dummyMatches.map((m, i) => ({ ...m, id: String(i + 1) }));
}

function saveMatches(matches: AdminMatch[]) {
  localStorage.setItem("clubhub:kampe", JSON.stringify(matches));
}

function newId() {
  return String(Date.now());
}

function ScoreInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <input
      type="number"
      min="0"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-14 px-2 py-1 rounded border border-club-border bg-white text-club-text text-body-sm text-center focus:outline-none focus:ring-2 focus:ring-secondary/30 transition"
    />
  );
}

interface AddMatchFormProps {
  onAdd: (match: Omit<AdminMatch, "id">) => void;
  onCancel: () => void;
}

function AddMatchForm({ onAdd, onCancel }: AddMatchFormProps) {
  const [form, setForm] = useState({
    homeTeam: "",
    awayTeam: "",
    matchDate: "",
    competition: "",
    venue: "",
    isPlayed: false,
    homeScore: "",
    awayScore: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onAdd({
      homeTeam: form.homeTeam,
      awayTeam: form.awayTeam,
      matchDate: form.matchDate,
      competition: form.competition,
      venue: form.venue,
      isPlayed: form.isPlayed,
      homeScore: form.isPlayed && form.homeScore !== "" ? Number(form.homeScore) : undefined,
      awayScore: form.isPlayed && form.awayScore !== "" ? Number(form.awayScore) : undefined,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-secondary/30 p-5 space-y-4"
    >
      <h3 className="font-semibold text-secondary text-body-md">Ny kamp</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(
          [
            { id: "homeTeam", label: "Hjemmehold", key: "homeTeam", ph: "Vorbasse B" },
            { id: "awayTeam", label: "Udehold", key: "awayTeam", ph: "Billund FC" },
          ] as const
        ).map(({ id, label, key, ph }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-xs font-semibold text-secondary mb-1">
              {label} *
            </label>
            <input
              id={id}
              type="text"
              required
              value={form[key]}
              onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
              placeholder={ph}
              className="w-full px-3 py-2 rounded-lg border border-club-border bg-white text-club-text text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 transition"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="matchDate" className="block text-xs font-semibold text-secondary mb-1">
            Dato & tid *
          </label>
          <input
            id="matchDate"
            type="datetime-local"
            required
            value={form.matchDate}
            onChange={(e) => setForm((p) => ({ ...p, matchDate: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-club-border bg-white text-club-text text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 transition"
          />
        </div>
        <div>
          <label htmlFor="competition" className="block text-xs font-semibold text-secondary mb-1">
            Turnering
          </label>
          <input
            id="competition"
            type="text"
            value={form.competition}
            onChange={(e) => setForm((p) => ({ ...p, competition: e.target.value }))}
            placeholder="Herrer Serie 4"
            className="w-full px-3 py-2 rounded-lg border border-club-border bg-white text-club-text text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 transition"
          />
        </div>
        <div>
          <label htmlFor="venue" className="block text-xs font-semibold text-secondary mb-1">
            Bane / Venue
          </label>
          <input
            id="venue"
            type="text"
            value={form.venue}
            onChange={(e) => setForm((p) => ({ ...p, venue: e.target.value }))}
            placeholder="Vorbasse Fritidscenter"
            className="w-full px-3 py-2 rounded-lg border border-club-border bg-white text-club-text text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 transition"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="isPlayed"
          checked={form.isPlayed}
          onChange={(e) => setForm((p) => ({ ...p, isPlayed: e.target.checked }))}
          className="w-4 h-4 rounded border-club-border accent-secondary"
        />
        <label htmlFor="isPlayed" className="text-body-sm text-club-text cursor-pointer">
          Kampen er spillet — indtast resultat
        </label>
      </div>

      {form.isPlayed && (
        <div className="flex items-center gap-3">
          <ScoreInput
            value={form.homeScore}
            onChange={(v) => setForm((p) => ({ ...p, homeScore: v }))}
            placeholder="0"
          />
          <span className="text-club-muted font-bold">–</span>
          <ScoreInput
            value={form.awayScore}
            onChange={(v) => setForm((p) => ({ ...p, awayScore: v }))}
            placeholder="0"
          />
          <span className="text-body-sm text-club-muted">(hjem – ude)</span>
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-secondary text-white font-semibold text-body-sm hover:bg-secondary-dark transition-colors"
        >
          Tilføj kamp
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-club-border text-club-text font-semibold text-body-sm hover:bg-surface transition-colors"
        >
          Annuller
        </button>
      </div>
    </form>
  );
}

export default function KampeAdminPage() {
  const [matches, setMatches] = useState<AdminMatch[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [adding, setAdding] = useState(false);
  const [editingScores, setEditingScores] = useState<Record<string, { home: string; away: string }>>({});

  useEffect(() => {
    setMatches(loadMatches());
    setLoaded(true);
  }, []);

  function handleSave() {
    saveMatches(matches);
    setSaved(true);
  }

  function handleDelete(id: string) {
    if (!confirm("Slet denne kamp?")) return;
    const updated = matches.filter((m) => m.id !== id);
    setMatches(updated);
    saveMatches(updated);
    setSaved(true);
  }

  function handleAddMatch(match: Omit<AdminMatch, "id">) {
    const newMatch: AdminMatch = { ...match, id: newId() };
    const updated = [newMatch, ...matches];
    setMatches(updated);
    saveMatches(updated);
    setAdding(false);
    setSaved(true);
  }

  function startEditScore(match: AdminMatch) {
    setEditingScores((prev) => ({
      ...prev,
      [match.id]: {
        home: match.homeScore !== undefined ? String(match.homeScore) : "",
        away: match.awayScore !== undefined ? String(match.awayScore) : "",
      },
    }));
  }

  function saveScore(id: string) {
    const scores = editingScores[id];
    if (!scores) return;
    const updated = matches.map((m) =>
      m.id === id
        ? {
            ...m,
            isPlayed: true,
            homeScore: scores.home !== "" ? Number(scores.home) : undefined,
            awayScore: scores.away !== "" ? Number(scores.away) : undefined,
          }
        : m
    );
    setMatches(updated);
    saveMatches(updated);
    setEditingScores((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setSaved(true);
  }

  function cancelEditScore(id: string) {
    setEditingScores((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  if (!loaded) {
    return <div className="text-club-muted text-body-sm">Indlæser…</div>;
  }

  const upcoming = matches.filter((m) => !m.isPlayed);
  const played = matches.filter((m) => m.isPlayed);

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-heading-md font-heading text-secondary mb-1">
            Kampe & Resultater
          </h1>
          <p className="text-club-muted text-body-sm">
            {upcoming.length} kommende · {played.length} spillede
          </p>
        </div>
        <button
          type="button"
          onClick={() => { setAdding(true); setSaved(false); }}
          className="px-4 py-2 rounded-lg bg-secondary text-white font-semibold text-body-sm hover:bg-secondary-dark transition-colors"
        >
          + Tilføj kamp
        </button>
      </div>

      {adding && (
        <div className="mb-6">
          <AddMatchForm
            onAdd={handleAddMatch}
            onCancel={() => setAdding(false)}
          />
        </div>
      )}

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section className="mb-8">
          <h2 className="text-heading-sm font-heading text-secondary mb-3">
            Kommende kampe
          </h2>
          <div className="bg-white rounded-xl border border-club-border overflow-hidden">
            <table className="w-full text-body-sm">
              <thead className="bg-surface border-b border-club-border">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-club-muted uppercase tracking-wide">
                    Kamp
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-club-muted uppercase tracking-wide hidden sm:table-cell">
                    Turnering
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-club-muted uppercase tracking-wide hidden md:table-cell">
                    Dato
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-club-border">
                {upcoming.map((match) => (
                  <tr key={match.id} className="hover:bg-surface transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-club-text">
                        {match.homeTeam} – {match.awayTeam}
                      </p>
                      {match.venue && (
                        <p className="text-xs text-club-muted mt-0.5">{match.venue}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-club-muted hidden sm:table-cell text-xs">
                      {match.competition}
                    </td>
                    <td className="px-4 py-3 text-club-muted hidden md:table-cell text-xs">
                      {new Date(match.matchDate).toLocaleString("da-DK", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      {editingScores[match.id] ? (
                        <div className="flex items-center gap-2 justify-end">
                          <ScoreInput
                            value={editingScores[match.id].home}
                            onChange={(v) =>
                              setEditingScores((p) => ({
                                ...p,
                                [match.id]: { ...p[match.id], home: v },
                              }))
                            }
                            placeholder="0"
                          />
                          <span className="text-club-muted font-bold">–</span>
                          <ScoreInput
                            value={editingScores[match.id].away}
                            onChange={(v) =>
                              setEditingScores((p) => ({
                                ...p,
                                [match.id]: { ...p[match.id], away: v },
                              }))
                            }
                            placeholder="0"
                          />
                          <button
                            onClick={() => saveScore(match.id)}
                            className="text-xs text-result-win font-semibold hover:underline"
                          >
                            Gem
                          </button>
                          <button
                            onClick={() => cancelEditScore(match.id)}
                            className="text-xs text-club-muted hover:underline"
                          >
                            Annuller
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 justify-end">
                          <button
                            onClick={() => startEditScore(match)}
                            className="text-xs text-secondary hover:underline"
                          >
                            Indtast resultat
                          </button>
                          <button
                            onClick={() => handleDelete(match.id)}
                            className="text-xs text-result-loss hover:underline"
                          >
                            Slet
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Played */}
      {played.length > 0 && (
        <section>
          <h2 className="text-heading-sm font-heading text-secondary mb-3">
            Resultater
          </h2>
          <div className="bg-white rounded-xl border border-club-border overflow-hidden">
            <table className="w-full text-body-sm">
              <thead className="bg-surface border-b border-club-border">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-club-muted uppercase tracking-wide">
                    Kamp
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-club-muted uppercase tracking-wide">
                    Resultat
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-club-muted uppercase tracking-wide hidden md:table-cell">
                    Dato
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-club-border">
                {played.map((match) => (
                  <tr key={match.id} className="hover:bg-surface transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-club-text">
                        {match.homeTeam} – {match.awayTeam}
                      </p>
                      {match.competition && (
                        <p className="text-xs text-club-muted mt-0.5">
                          {match.competition}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {editingScores[match.id] ? (
                        <div className="flex items-center gap-1 justify-center">
                          <ScoreInput
                            value={editingScores[match.id].home}
                            onChange={(v) =>
                              setEditingScores((p) => ({
                                ...p,
                                [match.id]: { ...p[match.id], home: v },
                              }))
                            }
                            placeholder="0"
                          />
                          <span className="text-club-muted font-bold">–</span>
                          <ScoreInput
                            value={editingScores[match.id].away}
                            onChange={(v) =>
                              setEditingScores((p) => ({
                                ...p,
                                [match.id]: { ...p[match.id], away: v },
                              }))
                            }
                            placeholder="0"
                          />
                        </div>
                      ) : (
                        <span className="font-bold text-secondary">
                          {match.homeScore ?? "–"} – {match.awayScore ?? "–"}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-club-muted hidden md:table-cell text-xs">
                      {new Date(match.matchDate).toLocaleDateString("da-DK")}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      {editingScores[match.id] ? (
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => saveScore(match.id)}
                            className="text-xs text-result-win font-semibold hover:underline"
                          >
                            Gem
                          </button>
                          <button
                            onClick={() => cancelEditScore(match.id)}
                            className="text-xs text-club-muted hover:underline"
                          >
                            Annuller
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-3 justify-end">
                          <button
                            onClick={() => startEditScore(match)}
                            className="text-xs text-secondary hover:underline"
                          >
                            Ret resultat
                          </button>
                          <button
                            onClick={() => handleDelete(match.id)}
                            className="text-xs text-result-loss hover:underline"
                          >
                            Slet
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {matches.length === 0 && !adding && (
        <div className="bg-white rounded-xl border border-club-border p-10 text-center">
          <p className="text-club-muted text-body-sm mb-4">Ingen kampe endnu.</p>
        </div>
      )}

      {saved && (
        <p className="mt-4 text-body-sm text-result-win font-medium">✓ Gemt</p>
      )}

      <p className="mt-4 text-body-sm text-club-muted">
        Bemærk: Ændringer gemmes i browseren. Permanent lagring kræver en
        backend-integration.
      </p>
    </div>
  );
}

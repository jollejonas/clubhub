"use client";

import { useState, useEffect } from "react";
import { clubConfig } from "@/config/club.config";

interface TrainingTime {
  day: string;
  startTime: string;
  endTime: string;
  location: string;
}

interface AdminTeam {
  id: string;
  name: string;
  gender: "men" | "women" | "mixed";
  ageGroup: string;
  dbuTeamId: string;
  coach: string;
  trainingTimes: TrainingTime[];
}

const DAYS = [
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lørdag",
  "Søndag",
];

function loadTeams(): AdminTeam[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("clubhub:hold");
    if (stored) return JSON.parse(stored) as AdminTeam[];
  } catch {
    // ignore
  }
  return clubConfig.teams.map((t) => ({
    id: t.id,
    name: t.name,
    gender: t.gender as "men" | "women" | "mixed",
    ageGroup: t.ageGroup ?? "",
    dbuTeamId: t.dbuTeamId ?? "",
    coach: "",
    trainingTimes: [],
  }));
}

function saveTeams(teams: AdminTeam[]) {
  localStorage.setItem("clubhub:hold", JSON.stringify(teams));
}

function newId() {
  return String(Date.now());
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-secondary mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border border-club-border bg-white text-club-text text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition"
      />
    </div>
  );
}

interface TeamFormProps {
  team: AdminTeam;
  onChange: (team: AdminTeam) => void;
  onDelete: () => void;
}

function TeamForm({ team, onChange, onDelete }: TeamFormProps) {
  const [open, setOpen] = useState(false);

  function setField<K extends keyof AdminTeam>(key: K, value: AdminTeam[K]) {
    onChange({ ...team, [key]: value });
  }

  function addTrainingTime() {
    onChange({
      ...team,
      trainingTimes: [
        ...team.trainingTimes,
        { day: "Mandag", startTime: "18:00", endTime: "19:30", location: "" },
      ],
    });
  }

  function updateTrainingTime(i: number, patch: Partial<TrainingTime>) {
    const updated = team.trainingTimes.map((tt, idx) =>
      idx === i ? { ...tt, ...patch } : tt
    );
    onChange({ ...team, trainingTimes: updated });
  }

  function removeTrainingTime(i: number) {
    onChange({
      ...team,
      trainingTimes: team.trainingTimes.filter((_, idx) => idx !== i),
    });
  }

  return (
    <div className="bg-white rounded-xl border border-club-border overflow-hidden">
      <div
        className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-surface transition-colors"
        onClick={() => setOpen((o) => !o)}
      >
        <div>
          <p className="font-semibold text-secondary text-body-md">{team.name || "Nyt hold"}</p>
          <p className="text-body-sm text-club-muted">
            {team.ageGroup || "–"} ·{" "}
            {team.gender === "men"
              ? "Herrer"
              : team.gender === "women"
              ? "Damer"
              : "Blandet"}{" "}
            {team.coach ? `· Træner: ${team.coach}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {team.trainingTimes.length > 0 && (
            <span className="text-xs text-club-muted">
              {team.trainingTimes.length} trænings
              {team.trainingTimes.length !== 1 ? "tider" : "tid"}
            </span>
          )}
          <span className="text-club-muted text-sm select-none">
            {open ? "▲" : "▼"}
          </span>
        </div>
      </div>

      {open && (
        <div className="border-t border-club-border p-5 space-y-5">
          {/* Basic info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Holdnavn"
              id={`name-${team.id}`}
              value={team.name}
              onChange={(v) => setField("name", v)}
              placeholder="Herre Senior"
            />
            <Field
              label="Aldersgruppe"
              id={`ageGroup-${team.id}`}
              value={team.ageGroup}
              onChange={(v) => setField("ageGroup", v)}
              placeholder="Senior, U15, U13…"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={`gender-${team.id}`}
                className="block text-xs font-semibold text-secondary mb-1"
              >
                Køn
              </label>
              <select
                id={`gender-${team.id}`}
                value={team.gender}
                onChange={(e) =>
                  setField("gender", e.target.value as AdminTeam["gender"])
                }
                className="w-full px-3 py-2 rounded-lg border border-club-border bg-white text-club-text text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition"
              >
                <option value="men">Herrer</option>
                <option value="women">Damer</option>
                <option value="mixed">Blandet</option>
              </select>
            </div>
            <Field
              label="Træner"
              id={`coach-${team.id}`}
              value={team.coach}
              onChange={(v) => setField("coach", v)}
              placeholder="Fuldt navn"
            />
          </div>

          <Field
            label="DBU Hold-ID (til live resultater)"
            id={`dbuTeamId-${team.id}`}
            value={team.dbuTeamId}
            onChange={(v) => setField("dbuTeamId", v)}
            placeholder="fx 12345"
          />

          {/* Training times */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-secondary uppercase tracking-wide">
                Træningstider
              </p>
              <button
                type="button"
                onClick={addTrainingTime}
                className="text-xs text-secondary font-semibold hover:underline"
              >
                + Tilføj tid
              </button>
            </div>

            {team.trainingTimes.length === 0 ? (
              <p className="text-body-sm text-club-muted">Ingen træningstider endnu.</p>
            ) : (
              <div className="space-y-3">
                {team.trainingTimes.map((tt, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-end"
                  >
                    <div>
                      <label className="block text-xs font-semibold text-secondary mb-1">
                        Dag
                      </label>
                      <select
                        value={tt.day}
                        onChange={(e) =>
                          updateTrainingTime(i, { day: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-club-border bg-white text-club-text text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition"
                      >
                        {DAYS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-secondary mb-1">
                        Start
                      </label>
                      <input
                        type="time"
                        value={tt.startTime}
                        onChange={(e) =>
                          updateTrainingTime(i, { startTime: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-club-border bg-white text-club-text text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-secondary mb-1">
                        Slut
                      </label>
                      <input
                        type="time"
                        value={tt.endTime}
                        onChange={(e) =>
                          updateTrainingTime(i, { endTime: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-club-border bg-white text-club-text text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 transition"
                      />
                    </div>
                    <div className="flex gap-2 items-end">
                      <div className="flex-1">
                        <label className="block text-xs font-semibold text-secondary mb-1">
                          Sted
                        </label>
                        <input
                          type="text"
                          value={tt.location}
                          onChange={(e) =>
                            updateTrainingTime(i, { location: e.target.value })
                          }
                          placeholder="Bane 1"
                          className="w-full px-3 py-2 rounded-lg border border-club-border bg-white text-club-text text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 transition"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeTrainingTime(i)}
                        className="px-2 py-2 text-result-loss text-sm hover:bg-red-50 rounded transition-colors"
                        aria-label="Fjern træningstid"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onDelete}
              className="text-xs text-result-loss hover:underline"
            >
              Slet hold
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HoldAdminPage() {
  const [teams, setTeams] = useState<AdminTeam[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setTeams(loadTeams());
    setLoaded(true);
  }, []);

  function handleChange(id: string, updated: AdminTeam) {
    setSaved(false);
    setTeams((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  function handleDelete(id: string) {
    if (!confirm("Slet dette hold?")) return;
    setSaved(false);
    setTeams((prev) => prev.filter((t) => t.id !== id));
  }

  function handleAdd() {
    const id = newId();
    setSaved(false);
    setTeams((prev) => [
      ...prev,
      {
        id,
        name: "",
        gender: "men",
        ageGroup: "",
        dbuTeamId: "",
        coach: "",
        trainingTimes: [],
      },
    ]);
  }

  function handleSave() {
    saveTeams(teams);
    setSaved(true);
  }

  if (!loaded) {
    return <div className="text-club-muted text-body-sm">Indlæser…</div>;
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-heading-md font-heading text-secondary mb-1">
            Hold & Trænere
          </h1>
          <p className="text-club-muted text-body-sm">
            {teams.length} hold konfigureret
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2 rounded-lg bg-secondary text-white font-semibold text-body-sm hover:bg-secondary-dark transition-colors"
        >
          + Tilføj hold
        </button>
      </div>

      <div className="space-y-3">
        {teams.map((team) => (
          <TeamForm
            key={team.id}
            team={team}
            onChange={(updated) => handleChange(team.id, updated)}
            onDelete={() => handleDelete(team.id)}
          />
        ))}
      </div>

      {teams.length === 0 && (
        <div className="bg-white rounded-xl border border-club-border p-10 text-center">
          <p className="text-club-muted text-body-sm mb-4">Ingen hold endnu.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="px-4 py-2 rounded-lg bg-secondary text-white font-semibold text-body-sm hover:bg-secondary-dark transition-colors"
          >
            Tilføj første hold
          </button>
        </div>
      )}

      {teams.length > 0 && (
        <div className="mt-6 flex items-center gap-4">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-lg bg-secondary text-white font-semibold text-body-sm hover:bg-secondary-dark transition-colors"
          >
            Gem ændringer
          </button>
          {saved && (
            <span className="text-body-sm text-result-win font-medium">
              ✓ Gemt
            </span>
          )}
        </div>
      )}

      <p className="mt-4 text-body-sm text-club-muted">
        Bemærk: Ændringer gemmes i browseren. Permanent lagring kræver en
        backend-integration.
      </p>
    </div>
  );
}

"use client";

import { useState } from "react";
import { clubConfig } from "@/config/club.config";
import type { ClubColorTokens } from "@/types/club";

type ColorKey = keyof ClubColorTokens;

interface ColorGroup {
  label: string;
  keys: { key: ColorKey; label: string }[];
}

const COLOR_GROUPS: ColorGroup[] = [
  {
    label: "Brand",
    keys: [
      { key: "primary",        label: "Primær" },
      { key: "primaryDark",    label: "Primær mørk" },
      { key: "primaryLight",   label: "Primær lys" },
      { key: "secondary",      label: "Sekundær" },
      { key: "secondaryDark",  label: "Sekundær mørk" },
      { key: "secondaryLight", label: "Sekundær lys" },
      { key: "accent",         label: "Accent" },
    ],
  },
  {
    label: "Baggrund & tekst",
    keys: [
      { key: "background", label: "Baggrund" },
      { key: "surface",    label: "Flade (kort/panel)" },
      { key: "border",     label: "Kant" },
      { key: "text",       label: "Tekst" },
      { key: "textMuted",  label: "Dæmpet tekst" },
    ],
  },
  {
    label: "Resultater",
    keys: [
      { key: "success", label: "Sejr" },
      { key: "draw",    label: "Uafgjort" },
      { key: "loss",    label: "Nederlag" },
    ],
  },
];

function ColorRow({
  label,
  colorKey,
  value,
  onChange,
}: {
  label: string;
  colorKey: ColorKey;
  value: string;
  onChange: (key: ColorKey, value: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor={colorKey} className="w-40 text-body-sm text-club-text shrink-0">
        {label}
      </label>
      <div className="flex items-center gap-2 flex-1">
        <input
          id={colorKey}
          type="color"
          value={value}
          onChange={(e) => onChange(colorKey, e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border border-club-border"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(colorKey, e.target.value)}
          className="w-28 px-2 py-1 text-body-sm font-mono rounded border border-club-border bg-white focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary"
        />
      </div>
    </div>
  );
}

function LivePreview({ colors }: { colors: ClubColorTokens }) {
  return (
    <div className="sticky top-8 space-y-4">
      <h2 className="text-heading-sm font-heading text-secondary">Live preview</h2>

      {/* Mini navbar */}
      <div
        className="rounded-lg overflow-hidden shadow-sm"
        style={{ background: colors.secondary }}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <div
            className="w-6 h-6 rounded-full"
            style={{ background: colors.primary }}
          />
          <span
            className="text-body-sm font-bold"
            style={{ color: colors.primary }}
          >
            {clubConfig.shortName}
          </span>
          <div className="flex-1 flex justify-end gap-3">
            {["Hold", "Kampe", "Nyheder"].map((item) => (
              <span
                key={item}
                className="text-body-sm opacity-70"
                style={{ color: colors.primary }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Mini card */}
      <div
        className="rounded-lg p-4 border shadow-sm"
        style={{ background: colors.surface, borderColor: colors.border }}
      >
        <div
          className="text-body-sm font-semibold mb-1"
          style={{ color: colors.text }}
        >
          Nyhed: Sæsonstart 2025
        </div>
        <div
          className="text-body-sm"
          style={{ color: colors.textMuted }}
        >
          Holdet er klar til den nye sæson med nye spillere og trænere.
        </div>
        <div
          className="mt-3 inline-block px-3 py-1 rounded text-body-sm font-semibold"
          style={{ background: colors.accent, color: colors.secondary }}
        >
          Læs mere
        </div>
      </div>

      {/* Result badges */}
      <div className="flex gap-2">
        {[
          { label: "Sejr", color: colors.success },
          { label: "Uafgjort", color: colors.draw },
          { label: "Nederlag", color: colors.loss },
        ].map(({ label, color }) => (
          <span
            key={label}
            className="px-2 py-1 rounded text-white text-body-sm font-semibold text-xs"
            style={{ background: color }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function FarvetemaPage() {
  const [colors, setColors] = useState<ClubColorTokens>({ ...clubConfig.colors });
  const [saved, setSaved] = useState(false);

  function handleChange(key: ColorKey, value: string) {
    setSaved(false);
    setColors((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem("clubhub:farver", JSON.stringify(colors));
    setSaved(true);
  }

  function handleReset() {
    setColors({ ...clubConfig.colors });
    setSaved(false);
  }

  return (
    <div className="max-w-5xl">
      <h1 className="text-heading-md font-heading text-secondary mb-1">Farvetema</h1>
      <p className="text-club-muted text-body-sm mb-8">
        Tilpas klubbens farvepalette. Preview opdateres i realtid.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        {/* Color editor */}
        <form onSubmit={handleSave} className="space-y-5">
          {COLOR_GROUPS.map((group) => (
            <div
              key={group.label}
              className="bg-white rounded-xl border border-club-border p-6 space-y-4"
            >
              <h2 className="text-heading-sm font-heading text-secondary">{group.label}</h2>
              {group.keys.map(({ key, label }) => (
                <ColorRow
                  key={key}
                  colorKey={key}
                  label={label}
                  value={colors[key]}
                  onChange={handleChange}
                />
              ))}
            </div>
          ))}

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-secondary text-white font-semibold text-body-sm hover:bg-secondary-dark transition-colors"
            >
              Gem farvetema
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 rounded-lg border border-club-border text-club-text font-semibold text-body-sm hover:bg-surface transition-colors"
            >
              Nulstil
            </button>
            {saved && (
              <span className="text-body-sm text-result-win font-medium">✓ Gemt</span>
            )}
          </div>
          <p className="text-body-sm text-club-muted">
            Bemærk: Ændringer gemmes i browseren. Permanent lagring kræver en backend-integration.
          </p>
        </form>

        {/* Live preview */}
        <LivePreview colors={colors} />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { clubConfig } from "@/config/club.config";

interface Features {
  news: boolean;
  membership: boolean;
  liveScores: boolean;
  gallery: boolean;
}

interface FeatureItem {
  key: keyof Features;
  label: string;
  description: string;
  note?: string;
}

const FEATURE_ITEMS: FeatureItem[] = [
  {
    key: "news",
    label: "Nyheder",
    description: "Vis nyheder på forsiden og /nyheder-siden.",
  },
  {
    key: "membership",
    label: "Bliv Medlem",
    description: "Vis 'Bliv Medlem'-CTA på forsiden og /bliv-medlem-siden.",
  },
  {
    key: "liveScores",
    label: "Live Resultater",
    description: "Hent live kamperesultater via DBU API.",
    note: "Kræver at hold har et dbuTeamId konfigureret under Integrationer → DBU.",
  },
  {
    key: "gallery",
    label: "Galleri",
    description: "Vis gallerisektionen (fremtidig funktion).",
    note: "Galleri-indhold er ikke implementeret endnu.",
  },
];

function Toggle({
  enabled,
  onChange,
  id,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
  id: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      id={id}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/30 ${
        enabled ? "bg-secondary" : "bg-club-border"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function FeatureFlagsPage() {
  const [features, setFeatures] = useState<Features>({
    news:       clubConfig.features.news,
    membership: clubConfig.features.membership,
    liveScores: clubConfig.features.liveScores,
    gallery:    clubConfig.features.gallery,
  });
  const [saved, setSaved] = useState(false);

  function handleToggle(key: keyof Features, value: boolean) {
    setSaved(false);
    setFeatures((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem("clubhub:features", JSON.stringify(features));
    setSaved(true);
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-heading-md font-heading text-secondary mb-1">Feature-flags</h1>
      <p className="text-club-muted text-body-sm mb-8">
        Slå sidesektioner til eller fra for denne klub.
      </p>

      <form onSubmit={handleSave}>
        <div className="bg-white rounded-xl border border-club-border divide-y divide-club-border">
          {FEATURE_ITEMS.map((item) => (
            <div key={item.key} className="flex items-start gap-4 px-6 py-5">
              <div className="flex-1 min-w-0">
                <label
                  htmlFor={`toggle-${item.key}`}
                  className="block font-semibold text-body-md text-club-text cursor-pointer"
                >
                  {item.label}
                </label>
                <p className="text-body-sm text-club-muted mt-0.5">{item.description}</p>
                {item.note && (
                  <p className="text-body-sm text-result-draw mt-1">ℹ {item.note}</p>
                )}
              </div>
              <div className="pt-0.5 shrink-0">
                <Toggle
                  id={`toggle-${item.key}`}
                  enabled={features[item.key]}
                  onChange={(v) => handleToggle(item.key, v)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-secondary text-white font-semibold text-body-sm hover:bg-secondary-dark transition-colors"
          >
            Gem indstillinger
          </button>
          {saved && (
            <span className="text-body-sm text-result-win font-medium">✓ Gemt</span>
          )}
        </div>
        <p className="mt-3 text-body-sm text-club-muted">
          Bemærk: Ændringer gemmes i browseren. Permanent lagring kræver en backend-integration.
        </p>
      </form>
    </div>
  );
}

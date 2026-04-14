"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { clubConfig } from "@/config/club.config";
import { dummyMatches } from "@/lib/dbu/dummy-data";
import type { NewsArticle } from "@/app/admin/nyheder/page";
import type { MatchCardProps } from "@/types/club";

interface WizardState {
  completedSteps: number[];
  finished: boolean;
}

interface AdminMatch extends MatchCardProps {
  id: string;
}

const WIZARD_TOTAL_STEPS = 7;

const QUICK_LINKS = [
  {
    href: "/admin/nyheder/ny",
    label: "Ny nyhed",
    desc: "Opret en ny artikel",
  },
  {
    href: "/admin/nyheder",
    label: "Alle nyheder",
    desc: "Rediger og administrer artikler",
  },
  {
    href: "/admin/hold",
    label: "Hold & Trænere",
    desc: "Administrer hold og træningstider",
  },
  {
    href: "/admin/kampe",
    label: "Kampe & Resultater",
    desc: "Kommende kampe og resultater",
  },
  {
    href: "/admin/klub/profil",
    label: "Klubprofil",
    desc: "Navn, logo, kontaktinfo",
  },
  {
    href: "/admin/klub/farver",
    label: "Farvetema",
    desc: "Farver og brandidentitet",
  },
];

export default function AdminDashboard() {
  const [wizardState, setWizardState] = useState<WizardState>({
    completedSteps: [],
    finished: false,
  });
  const [draftCount, setDraftCount] = useState(0);
  const [nextMatch, setNextMatch] = useState<AdminMatch | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load wizard state
    try {
      const stored = localStorage.getItem("clubhub:wizard");
      if (stored) {
        const parsed = JSON.parse(stored) as WizardState;
        setWizardState(parsed);
      }
    } catch {
      // ignore
    }

    // Load draft news count
    try {
      const stored = localStorage.getItem("clubhub:nyheder");
      if (stored) {
        const articles = JSON.parse(stored) as NewsArticle[];
        setDraftCount(articles.filter((a) => a.isDraft).length);
      }
    } catch {
      // ignore
    }

    // Load next match
    try {
      const stored = localStorage.getItem("clubhub:kampe");
      const matches: AdminMatch[] = stored
        ? (JSON.parse(stored) as AdminMatch[])
        : dummyMatches.map((m, i) => ({ ...m, id: String(i + 1) }));

      const now = new Date();
      const upcoming = matches
        .filter((m) => !m.isPlayed && new Date(m.matchDate) >= now)
        .sort(
          (a, b) =>
            new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime()
        );
      setNextMatch(upcoming[0] ?? null);
    } catch {
      // ignore
    }

    setLoaded(true);
  }, []);

  const wizardProgress = Math.round(
    (wizardState.completedSteps.length / WIZARD_TOTAL_STEPS) * 100
  );

  if (!loaded) {
    return <div className="text-club-muted text-body-sm">Indlæser…</div>;
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-heading-md font-heading text-secondary mb-1">
        Dashboard
      </h1>
      <p className="text-club-muted text-body-sm mb-8">
        Velkommen til admin-panelet for {clubConfig.name}.
      </p>

      {/* Setup progress card — hidden once wizard is fully complete */}
      {!wizardState.finished && (
        <div className="mb-6 bg-white rounded-xl border border-accent/40 p-5">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="font-semibold text-secondary text-body-md">
                Setup-guide
              </p>
              <p className="text-club-muted text-body-sm">
                {wizardState.completedSteps.length === 0
                  ? "Kom i gang – gennemgå guiden for at konfigurere klubben."
                  : `${wizardState.completedSteps.length} af ${WIZARD_TOTAL_STEPS} trin fuldført.`}
              </p>
            </div>
            <Link
              href="/admin/setup-guide"
              className="shrink-0 px-4 py-2 rounded-lg bg-accent text-secondary font-semibold text-body-sm hover:opacity-90 transition-opacity"
            >
              {wizardState.completedSteps.length === 0
                ? "Start guide"
                : "Fortsæt guide"}
            </Link>
          </div>
          <div className="h-2 bg-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary rounded-full transition-all duration-500"
              style={{ width: `${wizardProgress}%` }}
            />
          </div>
          <p className="mt-1.5 text-xs text-club-muted text-right">
            {wizardProgress}% fuldført
          </p>
        </div>
      )}

      {wizardState.finished && (
        <div className="mb-6 bg-white rounded-xl border border-result-win/30 p-4 flex items-center gap-3">
          <span className="text-result-win text-xl">✓</span>
          <div className="flex-1">
            <p className="text-body-sm font-semibold text-result-win">
              Setup-guide fuldført
            </p>
            <p className="text-xs text-club-muted">
              Siden er klar.{" "}
              <Link
                href="/admin/setup-guide"
                className="text-secondary hover:underline"
              >
                Gennemgå guiden igen
              </Link>
            </p>
          </div>
        </div>
      )}

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* Drafts */}
        <Link
          href="/admin/nyheder"
          className="bg-white rounded-xl border border-club-border p-4 hover:border-secondary/40 transition-colors"
        >
          <p className="text-2xl font-bold text-secondary mb-0.5">{draftCount}</p>
          <p className="text-body-sm text-club-muted">
            Kladde{draftCount !== 1 ? "r" : ""}
          </p>
          <p className="text-xs text-club-muted mt-0.5">Upublicerede nyheder</p>
        </Link>

        {/* Members (placeholder) */}
        <Link
          href="/admin/medlemmer/ansogninger"
          className="bg-white rounded-xl border border-club-border p-4 hover:border-secondary/40 transition-colors"
        >
          <p className="text-2xl font-bold text-secondary mb-0.5">–</p>
          <p className="text-body-sm text-club-muted">Ansøgninger</p>
          <p className="text-xs text-club-muted mt-0.5">Afventende medlemmer</p>
        </Link>

        {/* Next match */}
        <Link
          href="/admin/kampe"
          className="bg-white rounded-xl border border-club-border p-4 hover:border-secondary/40 transition-colors"
        >
          {nextMatch ? (
            <>
              <p className="text-body-sm font-semibold text-secondary mb-0.5 line-clamp-1">
                {nextMatch.homeTeam} – {nextMatch.awayTeam}
              </p>
              <p className="text-body-sm text-club-muted">Næste kamp</p>
              <p className="text-xs text-club-muted mt-0.5">
                {new Date(nextMatch.matchDate).toLocaleDateString("da-DK", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </p>
            </>
          ) : (
            <>
              <p className="text-2xl font-bold text-secondary mb-0.5">–</p>
              <p className="text-body-sm text-club-muted">Næste kamp</p>
              <p className="text-xs text-club-muted mt-0.5">Ingen planlagte kampe</p>
            </>
          )}
        </Link>
      </div>

      {/* Quick links */}
      <h2 className="text-heading-sm font-heading text-secondary mb-4">
        Genveje
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {QUICK_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block p-4 rounded-xl bg-white border border-club-border hover:border-secondary/40 hover:shadow-sm transition-all"
          >
            <p className="font-semibold text-secondary text-body-md">
              {link.label}
            </p>
            <p className="text-club-muted text-body-sm mt-0.5">{link.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

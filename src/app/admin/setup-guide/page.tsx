"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { clubConfig } from "@/config/club.config";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface WizardState {
  completedSteps: number[];
  currentStep: number;
  finished: boolean;
}

function loadWizard(): WizardState {
  if (typeof window === "undefined") {
    return { completedSteps: [], currentStep: 0, finished: false };
  }
  try {
    const stored = localStorage.getItem("clubhub:wizard");
    if (stored) return JSON.parse(stored) as WizardState;
  } catch {
    // ignore
  }
  return { completedSteps: [], currentStep: 0, finished: false };
}

function saveWizard(state: WizardState) {
  localStorage.setItem("clubhub:wizard", JSON.stringify(state));
}

// ─── SVG step icons ────────────────────────────────────────────────────────────
function StepIcon({ step, size = 28 }: { step: number; size?: number }) {
  const s = size;
  const sw = (s / 28) * 1.6; // stroke-width scales with icon size
  const icons: React.ReactNode[] = [
    // 0: Klubidentitet — shield
    <g key="shield">
      <path d="M10 3L4 6v5c0 3.9 2.6 7.5 6 8.5 3.4-1 6-4.6 6-8.5V6L10 3Z" strokeWidth={sw} />
      <path d="M7.5 10l2 2 3-3" strokeWidth={sw} />
    </g>,
    // 1: Farvetema — palette
    <g key="palette">
      <circle cx="10" cy="10" r="7" strokeWidth={sw} />
      <circle cx="7" cy="8.5" r="1.2" fill="currentColor" strokeWidth="0" />
      <circle cx="13" cy="8.5" r="1.2" fill="currentColor" strokeWidth="0" />
      <circle cx="10" cy="13.5" r="1.2" fill="currentColor" strokeWidth="0" />
      <circle cx="7" cy="12" r="1.2" fill="currentColor" strokeWidth="0" />
      <circle cx="13" cy="12" r="1.2" fill="currentColor" strokeWidth="0" />
    </g>,
    // 2: Kontakt & Sociale — envelope
    <g key="envelope">
      <rect x="3" y="5.5" width="14" height="9" rx="1.5" strokeWidth={sw} />
      <path d="M3 7l7 5 7-5" strokeWidth={sw} />
    </g>,
    // 3: Hold — users
    <g key="users">
      <circle cx="7.5" cy="7" r="2.5" strokeWidth={sw} />
      <circle cx="13" cy="7" r="2.5" strokeWidth={sw} />
      <path d="M2 17a5.5 5.5 0 0 1 11 0" strokeWidth={sw} />
      <path d="M13 14a5.5 5.5 0 0 1 5 3" strokeWidth={sw} />
    </g>,
    // 4: Træningstider — clock
    <g key="clock">
      <circle cx="10" cy="10" r="7.5" strokeWidth={sw} />
      <path d="M10 6.5V10l2.5 2.5" strokeWidth={sw} />
    </g>,
    // 5: Funktioner — toggles
    <g key="toggles">
      <rect x="2" y="5.5" width="8" height="4" rx="2" strokeWidth={sw} />
      <circle cx="8.5" cy="7.5" r="1.5" fill="currentColor" strokeWidth="0" />
      <rect x="10" y="10.5" width="8" height="4" rx="2" strokeWidth={sw} />
      <circle cx="11.5" cy="12.5" r="1.5" fill="currentColor" strokeWidth="0" />
    </g>,
    // 6: Færdig — star
    <g key="star">
      <path d="M10 2l2.4 5 5.6.8-4 3.9.9 5.5L10 14.5l-4.9 2.7.9-5.5-4-3.9 5.6-.8L10 2Z" strokeWidth={sw} />
    </g>,
  ];
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={s}
      height={s}
    >
      {icons[step] ?? icons[0]}
    </svg>
  );
}

// ─── Steps config ──────────────────────────────────────────────────────────────
const STEPS = [
  {
    title: "Klubidentitet",
    description: "Angiv klubbens navn, korte navn og stiftelsesår, og upload et logo.",
    link: "/admin/klub/profil",
    linkLabel: "Åbn Klubprofil",
  },
  {
    title: "Farvetema",
    description: "Vælg primær-, sekundær- og accentfarver med live-preview.",
    link: "/admin/klub/farver",
    linkLabel: "Åbn Farvetema",
  },
  {
    title: "Kontakt & Sociale medier",
    description: "Tilføj kontakt-email, adresse og links til Facebook/Instagram.",
    link: "/admin/klub/sociale",
    linkLabel: "Åbn Sociale medier",
  },
  {
    title: "Hold",
    description: "Tilføj mindst ét hold med navn, aldersgruppe og evt. træner.",
    link: "/admin/hold",
    linkLabel: "Åbn Hold & Trænere",
  },
  {
    title: "Træningstider",
    description: "Angiv træningstider for holdene – vises på hjemmesiden.",
    link: "/admin/hold",
    linkLabel: "Åbn Hold & Trænere",
  },
  {
    title: "Funktioner",
    description: "Vælg hvilke sektioner der skal være synlige på hjemmesiden.",
    link: "/admin/klub/funktioner",
    linkLabel: "Åbn Feature-flags",
  },
  {
    title: "Færdig!",
    description:
      "Gennemgå opsummeringen og gå til dashboardet. Du kan altid vende tilbage til setup-guiden.",
    link: "/admin",
    linkLabel: "Gå til Dashboard",
  },
];

// ─── Check icon ────────────────────────────────────────────────────────────────
function CheckIcon({ size = 12 }: { size?: number }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
      <path d="M2 6l3 3 5-5" />
    </svg>
  );
}

// ─── Step list item ────────────────────────────────────────────────────────────
function StepListItem({
  stepIndex,
  current,
  completed,
  onClick,
}: {
  stepIndex: number;
  current: number;
  completed: boolean;
  onClick: () => void;
}) {
  const isActive = stepIndex === current;
  const step = STEPS[stepIndex];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg transition-all duration-150
        ${isActive
          ? "bg-secondary/10 text-secondary"
          : completed
          ? "text-result-win hover:bg-surface"
          : "text-club-muted hover:bg-surface"
        }
      `}
    >
      {/* Step number / check bubble */}
      <span
        className={`
          shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all
          ${completed
            ? "bg-result-win text-white shadow-sm"
            : isActive
            ? "bg-secondary text-white shadow-sm"
            : "bg-club-border/60 text-club-muted"
          }
        `}
      >
        {completed
          ? <CheckIcon size={12} />
          : <span className="text-xs font-bold leading-none">{stepIndex + 1}</span>
        }
      </span>

      {/* Label */}
      <span className={`text-sm leading-tight ${isActive ? "font-semibold" : "font-medium"}`}>
        {step.title}
      </span>

      {/* Active dot */}
      {isActive && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
      )}
    </button>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function SetupGuidePage() {
  const [wizard, setWizard] = useState<WizardState>({
    completedSteps: [],
    currentStep: 0,
    finished: false,
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setWizard(loadWizard());
    setLoaded(true);
  }, []);

  function goToStep(i: number) {
    const next = { ...wizard, currentStep: i };
    setWizard(next);
    saveWizard(next);
  }

  function markDone(stepIndex: number) {
    const completedSteps = wizard.completedSteps.includes(stepIndex)
      ? wizard.completedSteps
      : [...wizard.completedSteps, stepIndex];

    const isLastStep = stepIndex === STEPS.length - 1;
    const allDone = completedSteps.length === STEPS.length;

    const next: WizardState = {
      completedSteps,
      currentStep: isLastStep ? stepIndex : stepIndex + 1,
      finished: allDone,
    };
    setWizard(next);
    saveWizard(next);
  }

  function unmarkDone(stepIndex: number) {
    const next = {
      ...wizard,
      completedSteps: wizard.completedSteps.filter((i) => i !== stepIndex),
      finished: false,
    };
    setWizard(next);
    saveWizard(next);
  }

  function resetWizard() {
    if (!confirm("Nulstil setup-guiden?")) return;
    const next: WizardState = { completedSteps: [], currentStep: 0, finished: false };
    setWizard(next);
    saveWizard(next);
  }

  if (!loaded) {
    return (
      <div className="flex items-center gap-2 text-club-muted text-sm">
        <span className="w-4 h-4 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin inline-block" />
        Indlæser…
      </div>
    );
  }

  const progress = Math.round(
    (wizard.completedSteps.length / STEPS.length) * 100
  );
  const step = STEPS[wizard.currentStep];
  const isCompleted = wizard.completedSteps.includes(wizard.currentStep);
  const isLastStep = wizard.currentStep === STEPS.length - 1;

  return (
    <div className="max-w-4xl">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-heading-md font-heading text-secondary mb-1">
          Setup-guide
        </h1>
        <p className="text-club-muted text-body-sm">
          Konfigurér {clubConfig.name} trin for trin.
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-6 bg-white rounded-xl border border-club-border p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-secondary">Fremgang</span>
          <span className="text-sm text-club-muted tabular-nums">
            {wizard.completedSteps.length}&thinsp;/&thinsp;{STEPS.length} trin
          </span>
        </div>
        <div className="h-2 bg-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-secondary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        {wizard.finished && (
          <p className="mt-2.5 flex items-center gap-1.5 text-sm text-result-win font-semibold">
            <CheckIcon size={13} />
            Setup-guiden er fuldført!
          </p>
        )}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Step list */}
        <aside className="md:col-span-1">
          <div className="bg-white rounded-xl border border-club-border p-2 space-y-0.5">
            {STEPS.map((_, i) => (
              <StepListItem
                key={i}
                stepIndex={i}
                current={wizard.currentStep}
                completed={wizard.completedSteps.includes(i)}
                onClick={() => goToStep(i)}
              />
            ))}
          </div>
        </aside>

        {/* Active step content */}
        <main className="md:col-span-2">
          <div className="bg-white rounded-xl border border-club-border overflow-hidden">
            {/* Step header */}
            <div className="flex items-start gap-4 p-6 border-b border-club-border">
              <div
                className={`
                  shrink-0 w-12 h-12 rounded-xl flex items-center justify-center
                  ${isLastStep && wizard.finished
                    ? "bg-result-win/10 text-result-win"
                    : isCompleted
                    ? "bg-result-win/10 text-result-win"
                    : "bg-secondary/10 text-secondary"
                  }
                `}
              >
                <StepIcon step={wizard.currentStep} size={26} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-club-muted mb-0.5">
                  Trin {wizard.currentStep + 1} af {STEPS.length}
                </p>
                <h2 className="text-heading-sm font-heading text-secondary leading-tight mb-1">
                  {step.title}
                </h2>
                <p className="text-sm text-club-muted leading-relaxed">{step.description}</p>
              </div>
            </div>

            {/* Summary checklist for last step */}
            {isLastStep && (
              <div className="px-6 py-4 border-b border-club-border bg-surface/50">
                <p className="text-sm font-semibold text-secondary mb-3">Tjekliste:</p>
                <div className="space-y-2">
                  {STEPS.slice(0, -1).map((s, i) => {
                    const done = wizard.completedSteps.includes(i);
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => goToStep(i)}
                        className="flex items-center gap-3 w-full text-left group"
                      >
                        <span
                          className={`
                            shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-colors
                            ${done ? "bg-result-win text-white" : "border-2 border-club-border text-transparent"}
                          `}
                        >
                          {done && <CheckIcon size={10} />}
                        </span>
                        <span className={`text-sm transition-colors ${done ? "text-club-text" : "text-club-muted group-hover:text-secondary"}`}>
                          {s.title}
                        </span>
                        {!done && (
                          <span className="ml-auto text-xs text-club-muted group-hover:text-secondary transition-colors">
                            Åbn →
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="px-6 py-5 flex flex-wrap items-center gap-3">
              <Link
                href={step.link}
                className="px-4 py-2 rounded-lg bg-secondary text-white font-semibold text-sm hover:bg-secondary-dark transition-colors"
              >
                {step.linkLabel}
              </Link>

              {!isCompleted ? (
                <button
                  type="button"
                  onClick={() => markDone(wizard.currentStep)}
                  className="px-4 py-2 rounded-lg border border-result-win text-result-win font-semibold text-sm hover:bg-result-win hover:text-white transition-all"
                >
                  <span className="flex items-center gap-1.5">
                    <CheckIcon size={13} />
                    Markér som færdig
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => unmarkDone(wizard.currentStep)}
                  className="px-4 py-2 rounded-lg border border-club-border text-club-muted font-semibold text-sm hover:bg-surface transition-colors"
                >
                  Markér som ikke færdig
                </button>
              )}

              {wizard.currentStep < STEPS.length - 1 && (
                <button
                  type="button"
                  onClick={() => goToStep(wizard.currentStep + 1)}
                  className="ml-auto px-4 py-2 rounded-lg bg-surface border border-club-border text-club-text font-semibold text-sm hover:border-secondary/40 hover:text-secondary transition-all"
                >
                  Næste trin →
                </button>
              )}
            </div>
          </div>

          {/* Previous step link */}
          {wizard.currentStep > 0 && (
            <div className="mt-3 text-right">
              <button
                type="button"
                onClick={() => goToStep(wizard.currentStep - 1)}
                className="text-sm text-club-muted hover:text-secondary transition-colors"
              >
                ← Forrige trin
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Reset */}
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={resetWizard}
          className="text-xs text-club-muted/60 hover:text-result-loss transition-colors"
        >
          Nulstil guide
        </button>
      </div>
    </div>
  );
}

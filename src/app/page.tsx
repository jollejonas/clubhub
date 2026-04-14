import Link from "next/link";
import { clubConfig } from "@/config/club.config";
import { dummyMatches, dummyNews } from "@/lib/dbu/dummy-data";

// Training schedule — sourced from live site (vorbasseboldklub.dk)
const trainingSchedule = [
  { day: "Mandag",  group: "U9 / U11",          time: "16:15–17:30", location: "Vorbasse Idrætsanlæg" },
  { day: "Mandag",  group: "U13 / U15",          time: "17:30–19:00", location: "Vorbasse Idrætsanlæg" },
  { day: "Tirsdag", group: "U5",                 time: "16:00–16:45", location: "Vorbasse Idrætsanlæg" },
  { day: "Tirsdag", group: "U7",                 time: "16:30–17:30", location: "Bane 2A" },
  { day: "Tirsdag", group: "Fodbold for Piger",  time: "16:45–18:00", location: "Vorbasse Idrætsanlæg" },
  { day: "Tirsdag", group: "Herre Senior",        time: "19:00–20:30", location: "Bane 2 (11M)" },
  { day: "Onsdag",  group: "U9 / U11",           time: "16:15–17:30", location: "Vorbasse Idrætsanlæg" },
  { day: "Onsdag",  group: "Kvinde Senior",       time: "19:00–21:00", location: "Bane 2 (11M)" },
];

const TRAINING_DAYS = ["Mandag", "Tirsdag", "Onsdag"];

const DAYS_DA: Record<number, string> = {
  0: "Søndag",
  1: "Mandag",
  2: "Tirsdag",
  3: "Onsdag",
  4: "Torsdag",
  5: "Fredag",
  6: "Lørdag",
};

export default function HomePage() {
  const nextMatch = dummyMatches.find((m) => !m.isPlayed);
  const moreMatches = dummyMatches.filter((m) => !m.isPlayed).slice(1, 5);
  const latestNews = dummyNews.slice(0, 3);

  const today = DAYS_DA[new Date().getDay()];

  return (
    <>
      {/*
        ─────────────────────────────────────────────────────────────
        IDENTITY STRIP — compact brand presence, never dominates fold
        Aesthetic: stadium kit stripes + matchday programme
        ─────────────────────────────────────────────────────────────
      */}
      <section
        className="border-b-4 border-primary relative overflow-hidden"
        style={{
          background: "var(--club-secondary)",
          backgroundImage: `repeating-linear-gradient(
            -55deg,
            transparent,
            transparent 18px,
            rgba(255,255,255,0.03) 18px,
            rgba(255,255,255,0.03) 22px
          )`,
        }}
      >
        <div className="container mx-auto px-4 py-5 flex items-center gap-4">
          {/* Logo */}
          <img
            src={clubConfig.logoPath}
            alt={`${clubConfig.shortName} logo`}
            className="w-14 h-14 md:w-16 md:h-16 drop-shadow flex-shrink-0"
          />

          {/* Club identity */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-primary font-heading font-bold text-display-lg leading-none uppercase tracking-tight">
                {clubConfig.shortName}
              </span>
              <span className="hidden sm:block text-white/40 text-body-lg">·</span>
              <span className="hidden sm:block text-white/80 font-heading font-semibold text-heading-sm uppercase tracking-wide">
                {clubConfig.name}
              </span>
            </div>
            <p className="text-white/45 text-body-sm mt-0.5 font-mono">
              Fodbolden for alle i Vorbasse &nbsp;·&nbsp; est. {clubConfig.founded}
            </p>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <Link
              href="/kamp-program"
              className="px-4 py-2 rounded-full text-body-sm font-bold bg-primary text-secondary transition-opacity hover:opacity-90"
            >
              Kamp-program
            </Link>
            <Link
              href="/bliv-medlem"
              className="px-4 py-2 rounded-full text-body-sm font-bold border border-white/30 text-white transition-colors hover:bg-white/10"
            >
              Bliv Medlem
            </Link>
          </div>
        </div>
      </section>

      {/*
        ─────────────────────────────────────────────────────────────
        PRIORITY ZONE — above the fold, mobile-first
        Next Match (3/5) + Training This Week (2/5)
        ─────────────────────────────────────────────────────────────
      */}
      <section className="bg-background">
        <div className="container mx-auto px-4 py-5 grid grid-cols-1 md:grid-cols-5 gap-4">

          {/* ── NEXT MATCH CARD ─────────────────────────────────── */}
          {nextMatch ? (
            <div
              className="md:col-span-3 rounded-2xl overflow-hidden shadow-lg flex flex-col"
              style={{ background: "var(--club-secondary-dark)" }}
            >
              {/* Card header */}
              <div
                className="px-5 pt-4 pb-3 flex items-center justify-between border-b"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: "var(--club-primary)" }}
                  />
                  <span
                    className="text-body-sm font-bold uppercase tracking-widest font-heading"
                    style={{ color: "var(--club-primary)" }}
                  >
                    Næste Kamp
                  </span>
                </div>
                <span className="text-body-sm font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {new Date(nextMatch.matchDate).toLocaleDateString("da-DK", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </div>

              {/* Match face-off */}
              <div className="px-5 py-6 flex-1">
                <div className="flex items-center gap-3 mb-5">
                  {/* Home team */}
                  <div className="flex-1 text-right">
                    <p
                      className="font-heading font-bold text-heading-md uppercase leading-tight text-white"
                      style={{ wordBreak: "break-word" }}
                    >
                      {nextMatch.homeTeam}
                    </p>
                  </div>

                  {/* VS badge */}
                  <div
                    className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center border-2"
                    style={{
                      borderColor: "var(--club-primary)",
                      background: "rgba(245,195,0,0.08)",
                    }}
                  >
                    <span
                      className="font-heading font-black text-body-sm uppercase"
                      style={{ color: "var(--club-primary)" }}
                    >
                      VS
                    </span>
                  </div>

                  {/* Away team */}
                  <div className="flex-1">
                    <p
                      className="font-heading font-bold text-heading-md uppercase leading-tight text-white"
                      style={{ wordBreak: "break-word" }}
                    >
                      {nextMatch.awayTeam}
                    </p>
                  </div>
                </div>

                {/* Match meta */}
                <div className="space-y-1">
                  <p
                    className="text-body-sm font-semibold"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {new Date(nextMatch.matchDate).toLocaleDateString("da-DK", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                    {" · "}
                    {new Date(nextMatch.matchDate).toLocaleTimeString("da-DK", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {nextMatch.venue && (
                    <p className="text-body-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {nextMatch.venue}
                    </p>
                  )}
                  <p className="text-body-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {nextMatch.competition}
                  </p>
                </div>
              </div>

              {/* Card footer */}
              <div
                className="px-5 py-3 border-t"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <Link
                  href="/kamp-program"
                  className="text-body-sm font-bold transition-opacity hover:opacity-80"
                  style={{ color: "var(--club-primary)" }}
                >
                  Se alle kampe →
                </Link>
              </div>
            </div>
          ) : (
            <div
              className="md:col-span-3 rounded-2xl p-6 flex items-center justify-center"
              style={{ background: "var(--club-secondary-dark)" }}
            >
              <p className="text-white/40 text-body-sm">Ingen kommende kampe</p>
            </div>
          )}

          {/* ── TRAINING THIS WEEK CARD ──────────────────────────── */}
          <div
            className="md:col-span-2 rounded-2xl overflow-hidden border flex flex-col"
            style={{
              background: "var(--club-surface)",
              borderColor: "var(--club-border)",
            }}
          >
            {/* Card header */}
            <div
              className="px-5 pt-4 pb-3 flex items-center justify-between border-b"
              style={{ borderColor: "var(--club-border)" }}
            >
              <span
                className="text-body-sm font-bold uppercase tracking-widest font-heading"
                style={{ color: "var(--club-primary)" }}
              >
                Træningstider
              </span>
              <Link
                href="/hold"
                className="text-body-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: "var(--club-primary)" }}
              >
                Alle hold →
              </Link>
            </div>

            {/* Day-by-day sessions */}
            <div className="px-5 py-4 flex-1 space-y-4">
              {TRAINING_DAYS.map((day) => {
                const sessions = trainingSchedule.filter((t) => t.day === day);
                const isToday = day === today;
                return (
                  <div key={day}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="text-body-sm font-bold px-2 py-0.5 rounded font-heading uppercase tracking-wide"
                        style={
                          isToday
                            ? {
                                background: "var(--club-primary)",
                                color: "var(--club-secondary)",
                              }
                            : {
                                background: "var(--club-secondary)",
                                color: "#fff",
                              }
                        }
                      >
                        {day}
                      </span>
                      {isToday && (
                        <span
                          className="text-body-sm font-semibold"
                          style={{ color: "var(--club-primary)" }}
                        >
                          I dag
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 pl-1">
                      {sessions.map((s, i) => (
                        <div
                          key={i}
                          className="flex items-baseline gap-2 text-body-sm"
                        >
                          <span
                            className="font-mono w-24 flex-shrink-0"
                            style={{ color: "var(--club-textMuted)" }}
                          >
                            {s.time}
                          </span>
                          <span style={{ color: "var(--club-text)" }}>{s.group}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Mobile CTAs ─────────────────────────────────────── */}
          <div className="md:hidden col-span-1 flex gap-3">
            <Link
              href="/kamp-program"
              className="flex-1 text-center px-4 py-3 rounded-xl font-bold text-body-md transition-opacity hover:opacity-90"
              style={{ background: "var(--club-primary)", color: "var(--club-secondary)" }}
            >
              Kamp-program
            </Link>
            <Link
              href="/bliv-medlem"
              className="flex-1 text-center px-4 py-3 rounded-xl font-bold text-body-md border-2 transition-colors hover:bg-secondary/5"
              style={{ borderColor: "var(--club-secondary)", color: "var(--club-secondary)" }}
            >
              Bliv Medlem
            </Link>
          </div>

        </div>
      </section>

      {/*
        ─────────────────────────────────────────────────────────────
        NEWS SECTION
        ─────────────────────────────────────────────────────────────
      */}
      {clubConfig.features.news && (
        <section className="container mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-heading-md font-bold text-primary">Seneste Nyheder</h2>
            <Link href="/nyheder" className="text-body-sm text-primary hover:underline font-medium">
              Se alle →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="bg-surface border border-club-border rounded-xl overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <img src={clubConfig.logoPath} alt="" className="w-12 h-12 opacity-40" />
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <span className="inline-block bg-primary text-secondary text-body-sm font-bold px-2 py-0.5 rounded w-fit">
                    {article.category}
                  </span>
                  <h3 className="text-heading-sm font-semibold line-clamp-2">{article.title}</h3>
                  <p className="text-body-sm text-club-muted line-clamp-2">{article.excerpt}</p>
                  <p className="text-body-sm text-primary font-medium mt-auto">Læs mere →</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/*
        ─────────────────────────────────────────────────────────────
        MORE UPCOMING MATCHES
        ─────────────────────────────────────────────────────────────
      */}
      {moreMatches.length > 0 && (
        <section className="bg-secondary py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-heading-md font-bold text-white mb-5">Kommende Kampe</h2>
            <div className="flex overflow-x-auto gap-4 pb-2 snap-x md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible">
              {moreMatches.map((match, i) => (
                <div
                  key={i}
                  className="snap-start min-w-[240px] md:min-w-0 bg-white/10 border border-white/20 rounded-xl p-4 flex flex-col gap-2 flex-shrink-0"
                >
                  <div className="text-body-sm text-white/60">{match.competition}</div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-body-md text-white truncate">{match.homeTeam}</span>
                    <span className="font-mono text-accent font-bold">–</span>
                    <span className="font-semibold text-body-md text-white truncate text-right">{match.awayTeam}</span>
                  </div>
                  <div className="text-body-sm text-white/60">
                    {new Date(match.matchDate).toLocaleDateString("da-DK", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                    {" · "}
                    {new Date(match.matchDate).toLocaleTimeString("da-DK", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  {match.venue && (
                    <div className="text-body-sm text-white/60">{match.venue}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/*
        ─────────────────────────────────────────────────────────────
        MEMBERSHIP CTA
        ─────────────────────────────────────────────────────────────
      */}
      {clubConfig.features.membership && (
        <section className="bg-accent py-14 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-heading-md font-bold text-secondary mb-3">
              Bliv en del af VBK-familien
            </h2>
            <p className="text-body-md text-secondary/80 mb-8 max-w-lg mx-auto">
              Uanset alder og niveau er der plads til dig i Vorbasse Boldklub. Tilmeld dig i dag og
              vær med fra næste træning.
            </p>
            <Link
              href="/bliv-medlem"
              className="inline-block bg-secondary text-white px-8 py-3 rounded-full font-semibold text-body-lg hover:opacity-90 transition-opacity"
            >
              Meld dig ind nu
            </Link>
          </div>
        </section>
      )}
    </>
  );
}

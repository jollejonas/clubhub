"use client";

import { clubConfig } from "@/config/club.config";

const timeline = [
  { year: 1912, text: "Vorbasse Boldklub stiftes af lokale fodboldentusiaster i Vorbasse." },
  { year: 1960, text: "Klubhus og anlæg ved Drivvejen etableres. Klubben vokser med nye ungdomshold." },
  { year: 2000, text: "Kvindefodbold oprettes. VBK åbner for alle køn og aldersgrupper." },
  { year: 2025, text: "Ny hjemmeside lanceres. Klubben moderniserer sin digitale tilstedeværelse." },
];

const boardMembers = [
  { name: "Henrik Sørensen",  role: "Formand",                    email: "formand@vbk1912.dk" },
  { name: "Lene Christensen", role: "Næstformand" },
  { name: "Poul Madsen",      role: "Kasserer",                   email: "kasse@vbk1912.dk" },
  { name: "Anne Kjeldsen",    role: "Sekretær" },
  { name: "Jens Holm",        role: "Menigt bestyrelsesmedlem" },
  { name: "Gitte Nielsen",    role: "Menigt bestyrelsesmedlem" },
];

const documents = [
  { title: "Vedtægter",                             note: "Opdateret 2024" },
  { title: "Børneattester & Sikker Sport-politik",  note: "" },
  { title: "Referat — seneste generalforsamling",   note: "2026" },
];

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

export default function OmKlubbenPage() {
  return (
    <>
      {/* PageHero */}
      <section className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-display-lg text-white font-bold">Om Vorbasse Boldklub</h1>
          <p className="text-body-sm text-white/70 mt-2">
            <a href="/" className="hover:text-accent transition-colors">Forside</a>
            {" / Om Klubben"}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 flex flex-col gap-16 max-w-5xl">
        {/* ClubHistory */}
        <section>
          <h2 className="text-heading-md font-bold text-primary mb-6">Klubbens Historie</h2>
          <p className="text-body-lg leading-relaxed mb-8 max-w-3xl">
            {clubConfig.name} ({clubConfig.shortName}) er en dansk fodboldklub grundlagt i {clubConfig.founded} i
            hjertet af Vorbasse. Gennem mere end 100 år har vi samlet lokale spillere og familier om det smukke spil.
            Vi er en klub for alle — fra de yngste U5-spillere til seniorer og oldboys.
          </p>

          {/* Timeline */}
          <div className="relative ml-7 flex flex-col gap-6 border-l-2 border-primary pl-8">
            {timeline.map((item) => (
              <div key={item.year} className="relative">
                <span className="absolute -left-12 bg-secondary text-white text-body-sm font-bold rounded px-2 py-0.5 w-14 text-center">
                  {item.year}
                </span>
                <p className="text-body-md">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BoardSection */}
        <section>
          <h2 className="text-heading-md font-bold text-primary mb-6">Bestyrelsen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {boardMembers.map((member) => (
              <div
                key={member.name}
                className="bg-surface border border-club-border rounded-xl p-6 text-center flex flex-col items-center gap-3"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 text-primary font-bold text-heading-sm flex items-center justify-center">
                  {initials(member.name)}
                </div>
                <div>
                  <p className="text-heading-sm font-semibold">{member.name}</p>
                  <p className="text-body-sm text-club-muted">{member.role}</p>
                </div>
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="text-body-sm text-primary hover:underline"
                  >
                    {member.email}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* DocumentsSection */}
        <section>
          <h2 className="text-heading-md font-bold text-primary mb-4">Klub-dokumenter</h2>
          <div className="border border-club-border rounded-lg divide-y divide-club-border">
            {documents.map((doc) => (
              <div
                key={doc.title}
                className="flex items-center gap-4 px-5 py-4 hover:bg-primary/5 transition-colors cursor-pointer"
              >
                <span className="text-2xl text-club-muted">📄</span>
                <div className="flex-1">
                  <span className="text-body-md font-medium">{doc.title}</span>
                  {doc.note && (
                    <span className="ml-2 text-body-sm text-club-muted">({doc.note})</span>
                  )}
                </div>
                <span className="text-body-sm text-primary font-medium">Download →</span>
              </div>
            ))}
          </div>
        </section>

        {/* ContactSection */}
        <section>
          <h2 className="text-heading-md font-bold text-primary mb-6">Kontakt os</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact info */}
            <div className="bg-surface rounded-xl p-8 border border-club-border flex flex-col gap-4">
              {clubConfig.address && (
                <div className="flex gap-3 items-start">
                  <span className="text-xl">📍</span>
                  <span className="text-body-md">{clubConfig.address}</span>
                </div>
              )}
              {clubConfig.email && (
                <div className="flex gap-3 items-start">
                  <span className="text-xl">✉️</span>
                  <a href={`mailto:${clubConfig.email}`} className="text-primary hover:underline text-body-md">
                    {clubConfig.email}
                  </a>
                </div>
              )}
              {clubConfig.social.facebook && (
                <div className="flex gap-3 items-start">
                  <span className="text-xl">📘</span>
                  <a
                    href={clubConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-body-md"
                  >
                    Facebook
                  </a>
                </div>
              )}
              {/* Map placeholder */}
              <div className="mt-2 bg-primary/10 rounded-xl h-48 flex items-center justify-center text-club-muted text-body-sm">
                [Kort: Drivvejen 1, Vorbasse]
              </div>
            </div>

            {/* Contact form (client handled via kontakt page) */}
            <div className="bg-surface rounded-xl p-8 border border-club-border">
              <p className="text-heading-sm font-semibold mb-4">Send os en besked</p>
              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                {[
                  { label: "Navn", type: "text", placeholder: "Dit navn" },
                  { label: "E-mail", type: "email", placeholder: "din@email.dk" },
                ].map((f) => (
                  <div key={f.label} className="flex flex-col gap-1">
                    <label className="text-body-sm font-medium">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      className="border border-club-border rounded-lg px-4 py-2.5 text-body-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-1">
                  <label className="text-body-sm font-medium">Emne</label>
                  <select className="border border-club-border rounded-lg px-4 py-2.5 text-body-md focus:outline-none focus:ring-2 focus:ring-primary bg-background">
                    <option>Generelt</option>
                    <option>Tilmelding</option>
                    <option>Sponsorat</option>
                    <option>Presse</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-body-sm font-medium">Besked</label>
                  <textarea
                    rows={4}
                    className="border border-club-border rounded-lg px-4 py-2.5 text-body-md focus:outline-none focus:ring-2 focus:ring-primary bg-background resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-secondary text-white w-full py-3 rounded-full font-semibold text-body-lg hover:opacity-90 transition-opacity"
                >
                  Send besked
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

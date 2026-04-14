"use client";

import { clubConfig } from "@/config/club.config";
import { notFound } from "next/navigation";
import { useState } from "react";

if (!clubConfig.features.membership) {
  // Ensure build-time check is skipped client-side; notFound() triggers on render below
}

// Prices sourced from live site (vorbasseboldklub.dk) — sæson 2026/2027
const TIERS = [
  { id: "klubmedlem",        name: "Klubmedlem",          price: 0,    for: "Passivt medlemskab",      popular: false },
  { id: "u5",                name: "U5",                  price: 250,  for: "U5-spillere",             popular: false },
  { id: "u7",                name: "U7",                  price: 400,  for: "U7-spillere",             popular: false },
  { id: "u9",                name: "U9",                  price: 500,  for: "U9-spillere",             popular: false },
  { id: "u11",               name: "U11",                 price: 500,  for: "U11-spillere",            popular: false },
  { id: "u13",               name: "U13",                 price: 650,  for: "U13-spillere",            popular: false },
  { id: "u15",               name: "U15",                 price: 650,  for: "U15-spillere",            popular: false },
  { id: "dame-senior",       name: "Dame Senior",         price: 950,  for: "Senior kvindespillere",   popular: false },
  { id: "herre-senior",      name: "Herre Senior",        price: 1350, for: "Senior herrespillere",    popular: true  },
  { id: "old-boys",          name: "Old Boys",            price: 450,  for: "Old Boys-spillere",       popular: false },
  { id: "forzahestene",      name: "Forzahestene Supportere", price: 250, for: "Ikke-spillende støtter", popular: false },
] as const;

type TierId = (typeof TIERS)[number]["id"];

const FAQ_ITEMS = [
  {
    q: "Hvornår starter sæsonen?",
    a: "Sæsonen starter typisk i marts/april for udendørs hold. Kontakt os for præcise datoer for det aktuelle år.",
  },
  {
    q: "Hvad er inkluderet i kontingentet?",
    a: "Kontingentet dækker spillerbevis, forsikring, adgang til alle træningspas for dit hold, og kampprogram for sæsonen.",
  },
  {
    q: "Kan jeg prøvetræne?",
    a: "Ja! Du kan komme og prøvetræne et par gange inden du melder dig ind. Kontakt os på vbk1912@gmail.com for at aftale.",
  },
  {
    q: "Hvordan tilmelder jeg et barn?",
    a: "Udfyld formularen nedenfor og vælg 'Barn' som medlemstype. Husk at udfylde forældrenes kontaktoplysninger.",
  },
];

export default function BlivMedlemPage() {
  if (!clubConfig.features.membership) return notFound();

  const [selectedTier, setSelectedTier] = useState<TierId>("herre-senior");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    navn: "",
    foedselsdato: "",
    email: "",
    telefon: "",
    adresse: "",
    medlemstype: "herre-senior" as TierId,
    foraelder: "",
    kommentar: "",
    gdpr: false,
  });

  function handleTierClick(tier: TierId) {
    setSelectedTier(tier);
    setForm((f) => ({ ...f, medlemstype: tier }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    if (name === "medlemstype") setSelectedTier(value as TierId);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Membership signup:", form);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--club-background)" }}>
      {/* PageHero */}
      <section
        className="py-16 px-4 text-center text-white"
        style={{ backgroundColor: "var(--club-secondary)" }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Bliv Medlem af {clubConfig.shortName}
        </h1>
        <p className="text-lg opacity-80 max-w-xl mx-auto">
          Tilmeld dig {clubConfig.name} og bliv en del af vores fællesskab siden {clubConfig.founded}.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col gap-16">
        {/* MembershipTiers */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: "var(--club-primary)" }}>
            Vælg Medlemskab
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {TIERS.map((tier) => {
              const isSelected = selectedTier === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => handleTierClick(tier.id)}
                  className={`relative flex flex-col items-center text-center rounded-xl p-5 border-2 transition-all cursor-pointer hover:-translate-y-0.5 ${
                    tier.popular ? "shadow-lg" : ""
                  }`}
                  style={{
                    borderColor: isSelected ? "var(--club-primary)" : tier.popular ? "var(--club-secondary)" : "var(--club-border)",
                    backgroundColor: isSelected ? "color-mix(in srgb, var(--club-primary) 8%, var(--club-surface))" : "var(--club-surface)",
                  }}
                >
                  {tier.popular && (
                    <span
                      className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-xs font-bold px-2 py-0.5 rounded-full text-white whitespace-nowrap"
                      style={{ backgroundColor: "var(--club-secondary)" }}
                    >
                      Mest populær
                    </span>
                  )}
                  <div
                    className="text-2xl font-bold mb-0.5"
                    style={{ color: "var(--club-primary)" }}
                  >
                    {tier.price === 0 ? "Gratis" : `${tier.price} kr`}
                  </div>
                  <div className="text-xs mb-2" style={{ color: "var(--club-textMuted)" }}>
                    {tier.price > 0 ? "/år" : ""}
                  </div>
                  <div className="font-semibold text-sm mb-1" style={{ color: "var(--club-text)" }}>
                    {tier.name}
                  </div>
                  <div className="text-xs mb-4" style={{ color: "var(--club-textMuted)" }}>
                    {tier.for}
                  </div>
                  <span
                    className="mt-auto w-full py-1.5 rounded-full text-xs font-semibold text-center"
                    style={
                      isSelected
                        ? { backgroundColor: "var(--club-primary)", color: "var(--club-secondary)" }
                        : { border: "1.5px solid var(--club-primary)", color: "var(--club-primary)" }
                    }
                  >
                    {isSelected ? "Valgt" : "Vælg"}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* WhyJoin */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: "var(--club-primary)" }}>
            Hvorfor blive medlem?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "⚽",
                title: "Fodbold for alle aldre",
                desc: "Fra U5 til seniorer — der er plads til alle hos VBK.",
              },
              {
                icon: "🤝",
                title: "Stærkt fællesskab",
                desc: "Lokal klub siden 1912 med stærke rødder i Vorbasse.",
              },
              {
                icon: "🏆",
                title: "Alle niveauer",
                desc: "Konkurrence- og hyggefodbold for spillere på alle niveauer.",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center gap-3">
                <span className="text-5xl" style={{ color: "var(--club-primary)" }}>
                  {item.icon}
                </span>
                <h3 className="font-bold text-lg" style={{ color: "var(--club-text)" }}>
                  {item.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--club-textMuted)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SignUpForm */}
        <section>
          <div
            className="rounded-2xl border p-8 max-w-2xl mx-auto"
            style={{ backgroundColor: "var(--club-surface)", borderColor: "var(--club-border)" }}
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--club-primary)" }}>
              Udfyld tilmeldingsformular
            </h2>

            {submitted ? (
              <div
                className="rounded-xl p-6 text-center"
                style={{ backgroundColor: "#e8f5e9", border: "1px solid #2E7D32" }}
              >
                <div className="text-4xl mb-2">✅</div>
                <p className="font-semibold text-lg" style={{ color: "#2E7D32" }}>
                  Tak for din tilmelding!
                </p>
                <p style={{ color: "#1b5e20" }}>Vi kontakter dig snart på {form.email}.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium" style={{ color: "var(--club-text)" }}>
                    Navn <span style={{ color: "var(--club-loss)" }}>*</span>
                  </label>
                  <input
                    name="navn"
                    type="text"
                    required
                    value={form.navn}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2.5 w-full focus:outline-none focus:ring-2"
                    style={{
                      borderColor: "var(--club-border)",
                      color: "var(--club-text)",
                      backgroundColor: "var(--club-background)",
                    }}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium" style={{ color: "var(--club-text)" }}>
                    Fødselsdato <span style={{ color: "var(--club-loss)" }}>*</span>
                  </label>
                  <input
                    name="foedselsdato"
                    type="date"
                    required
                    value={form.foedselsdato}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2.5 w-full focus:outline-none focus:ring-2"
                    style={{
                      borderColor: "var(--club-border)",
                      color: "var(--club-text)",
                      backgroundColor: "var(--club-background)",
                    }}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium" style={{ color: "var(--club-text)" }}>
                    E-mail <span style={{ color: "var(--club-loss)" }}>*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2.5 w-full focus:outline-none focus:ring-2"
                    style={{
                      borderColor: "var(--club-border)",
                      color: "var(--club-text)",
                      backgroundColor: "var(--club-background)",
                    }}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium" style={{ color: "var(--club-text)" }}>
                    Telefon
                  </label>
                  <input
                    name="telefon"
                    type="tel"
                    value={form.telefon}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2.5 w-full focus:outline-none focus:ring-2"
                    style={{
                      borderColor: "var(--club-border)",
                      color: "var(--club-text)",
                      backgroundColor: "var(--club-background)",
                    }}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium" style={{ color: "var(--club-text)" }}>
                    Adresse
                  </label>
                  <input
                    name="adresse"
                    type="text"
                    value={form.adresse}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2.5 w-full focus:outline-none focus:ring-2"
                    style={{
                      borderColor: "var(--club-border)",
                      color: "var(--club-text)",
                      backgroundColor: "var(--club-background)",
                    }}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium" style={{ color: "var(--club-text)" }}>
                    Medlemstype <span style={{ color: "var(--club-loss)" }}>*</span>
                  </label>
                  <select
                    name="medlemstype"
                    required
                    value={form.medlemstype}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2.5 w-full focus:outline-none focus:ring-2"
                    style={{
                      borderColor: "var(--club-border)",
                      color: "var(--club-text)",
                      backgroundColor: "var(--club-background)",
                    }}
                  >
                    {TIERS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}{t.price > 0 ? ` — ${t.price} kr/år` : " — Gratis"}
                      </option>
                    ))}
                  </select>
                </div>

                {["u5", "u7", "u9", "u11", "u13", "u15"].includes(form.medlemstype) && (
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium" style={{ color: "var(--club-text)" }}>
                      Forælder/kontakt <span style={{ color: "var(--club-loss)" }}>*</span>
                    </label>
                    <input
                      name="foraelder"
                      type="text"
                      required
                      placeholder="Navn og telefonnummer"
                      value={form.foraelder}
                      onChange={handleChange}
                      className="border rounded-lg px-4 py-2.5 w-full focus:outline-none focus:ring-2"
                      style={{
                        borderColor: "var(--club-border)",
                        color: "var(--club-text)",
                        backgroundColor: "var(--club-background)",
                      }}
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium" style={{ color: "var(--club-text)" }}>
                    Kommentar
                  </label>
                  <textarea
                    name="kommentar"
                    rows={3}
                    value={form.kommentar}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2.5 w-full focus:outline-none focus:ring-2 resize-none"
                    style={{
                      borderColor: "var(--club-border)",
                      color: "var(--club-text)",
                      backgroundColor: "var(--club-background)",
                    }}
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    name="gdpr"
                    type="checkbox"
                    required
                    checked={form.gdpr}
                    onChange={handleChange}
                    className="mt-1 accent-[var(--club-primary)]"
                    id="gdpr"
                  />
                  <label htmlFor="gdpr" className="text-sm" style={{ color: "var(--club-textMuted)" }}>
                    Jeg accepterer, at {clubConfig.shortName} gemmer mine oplysninger i henhold til{" "}
                    <a href="/privatlivspolitik" className="underline" style={{ color: "var(--club-primary)" }}>
                      privatlivspolitikken
                    </a>
                    . <span style={{ color: "var(--club-loss)" }}>*</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full font-semibold text-lg text-white mt-2 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "var(--club-secondary)" }}
                >
                  Send tilmelding
                </button>
              </form>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-2xl mx-auto w-full">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--club-primary)" }}>
            Ofte stillede spørgsmål
          </h2>
          <div className="flex flex-col gap-2">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.q}
                className="border rounded-lg overflow-hidden group"
                style={{ borderColor: "var(--club-border)" }}
              >
                <summary
                  className="cursor-pointer px-5 py-4 font-semibold text-sm list-none flex justify-between items-center"
                  style={{ color: "var(--club-text)", backgroundColor: "var(--club-surface)" }}
                >
                  {item.q}
                  <span className="ml-4 text-lg leading-none" style={{ color: "var(--club-primary)" }}>
                    +
                  </span>
                </summary>
                <div
                  className="px-5 py-4 text-sm border-t"
                  style={{
                    color: "var(--club-textMuted)",
                    borderColor: "var(--club-border)",
                    backgroundColor: "var(--club-background)",
                  }}
                >
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

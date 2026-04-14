"use client";

import { useState } from "react";
import { clubConfig } from "@/config/club.config";

interface ProfileForm {
  name: string;
  shortName: string;
  founded: string;
  logoPath: string;
  faviconPath: string;
  email: string;
  address: string;
}

function Field({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-body-sm font-semibold text-secondary mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border border-club-border bg-white text-club-text text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition"
      />
    </div>
  );
}

export default function KlubprofilPage() {
  const [form, setForm] = useState<ProfileForm>({
    name:        clubConfig.name,
    shortName:   clubConfig.shortName,
    founded:     String(clubConfig.founded ?? ""),
    logoPath:    clubConfig.logoPath,
    faviconPath: clubConfig.faviconPath,
    email:       clubConfig.email ?? "",
    address:     clubConfig.address ?? "",
  });
  const [saved, setSaved] = useState(false);

  function set(key: keyof ProfileForm) {
    return (value: string) => {
      setSaved(false);
      setForm((prev) => ({ ...prev, [key]: value }));
    };
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    // In production this would call a server action / API route.
    // For now we store in localStorage so the intent is clear.
    localStorage.setItem("clubhub:profil", JSON.stringify(form));
    setSaved(true);
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-heading-md font-heading text-secondary mb-1">Klubprofil</h1>
      <p className="text-club-muted text-body-sm mb-8">
        Rediger klubbens grundlæggende identitet og kontaktoplysninger.
      </p>

      <form onSubmit={handleSave} className="space-y-5">
        <div className="bg-white rounded-xl border border-club-border p-6 space-y-5">
          <h2 className="text-heading-sm font-heading text-secondary">Identitet</h2>
          <Field
            label="Fuldt klubnavn"
            id="name"
            value={form.name}
            onChange={set("name")}
            placeholder="Vorbasse Boldklub"
          />
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Kort navn"
              id="shortName"
              value={form.shortName}
              onChange={set("shortName")}
              placeholder="VBK"
            />
            <Field
              label="Stiftelsesår"
              id="founded"
              type="number"
              value={form.founded}
              onChange={set("founded")}
              placeholder="1912"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-club-border p-6 space-y-5">
          <h2 className="text-heading-sm font-heading text-secondary">Aktiver</h2>
          <Field
            label="Logo (URL eller sti)"
            id="logoPath"
            value={form.logoPath}
            onChange={set("logoPath")}
            placeholder="/clubs/vbk/logo.png"
          />
          <Field
            label="Favicon (URL eller sti)"
            id="faviconPath"
            value={form.faviconPath}
            onChange={set("faviconPath")}
            placeholder="/clubs/vbk/favicon.ico"
          />
          {form.logoPath && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-surface border border-club-border">
              <img
                src={form.logoPath}
                alt="Logo preview"
                className="w-10 h-10 object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <span className="text-body-sm text-club-muted">Logo-preview</span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-club-border p-6 space-y-5">
          <h2 className="text-heading-sm font-heading text-secondary">Kontakt</h2>
          <Field
            label="E-mail"
            id="email"
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="kontakt@klub.dk"
          />
          <Field
            label="Adresse"
            id="address"
            value={form.address}
            onChange={set("address")}
            placeholder="Gade 1, 0000 By"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
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

        <p className="text-body-sm text-club-muted">
          Bemærk: Ændringer gemmes i browseren. Permanent lagring kræver en backend-integration.
        </p>
      </form>
    </div>
  );
}

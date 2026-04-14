"use client";

import Link from "next/link";
import { clubConfig } from "@/config/club.config";

export default function KontaktPage() {
  return (
    <>
      {/* PageHero */}
      <section className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-display-lg text-white font-bold">Kontakt</h1>
          <p className="text-body-sm text-white/70 mt-2">
            <Link href="/" className="hover:text-accent transition-colors">Forside</Link>
            {" / Kontakt"}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <p className="text-body-lg text-club-muted mb-8">
          Du er altid velkommen til at kontakte os — vi svarer hurtigst muligt.
          Du kan også besøge vores{" "}
          <Link href="/om-klubben" className="text-secondary hover:underline">Om Klubben</Link>
          {" "}side for mere information.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact info */}
          <div className="bg-surface rounded-xl p-8 border border-club-border flex flex-col gap-5">
            <h2 className="text-heading-sm font-semibold">{clubConfig.name}</h2>
            {clubConfig.address && (
              <div className="flex gap-3">
                <span className="text-xl flex-shrink-0">📍</span>
                <span className="text-body-md">{clubConfig.address}</span>
              </div>
            )}
            {clubConfig.email && (
              <div className="flex gap-3">
                <span className="text-xl flex-shrink-0">✉️</span>
                <a href={`mailto:${clubConfig.email}`} className="text-secondary hover:underline text-body-md">
                  {clubConfig.email}
                </a>
              </div>
            )}
            {clubConfig.social.facebook && (
              <div className="flex gap-3">
                <span className="text-xl flex-shrink-0">📘</span>
                <a
                  href={clubConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:underline text-body-md"
                >
                  Facebook
                </a>
              </div>
            )}
            <div className="mt-2 bg-primary/10 rounded-xl h-48 flex items-center justify-center text-club-muted text-body-sm">
              [Kort: Drivvejen 1, Vorbasse]
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-surface rounded-xl p-8 border border-club-border">
            <h2 className="text-heading-sm font-semibold mb-5">Send os en besked</h2>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-1">
                <label className="text-body-sm font-medium">Navn</label>
                <input
                  type="text"
                  placeholder="Dit fulde navn"
                  className="border border-club-border rounded-lg px-4 py-2.5 text-body-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-body-sm font-medium">E-mail</label>
                <input
                  type="email"
                  placeholder="din@email.dk"
                  className="border border-club-border rounded-lg px-4 py-2.5 text-body-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-body-sm font-medium">Emne</label>
                <select className="border border-club-border rounded-lg px-4 py-2.5 text-body-md bg-background focus:outline-none focus:ring-2 focus:ring-primary">
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
                  className="border border-club-border rounded-lg px-4 py-2.5 text-body-md bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
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
      </div>
    </>
  );
}

import Link from "next/link";
import { clubConfig } from "@/config/club.config";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1: brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <img src={clubConfig.logoPath} alt={clubConfig.shortName} className="w-10 h-10" />
              <span className="font-semibold text-body-lg">{clubConfig.name}</span>
            </div>
            <p className="text-white/70 text-body-sm">Fodbolden for alle i Vorbasse</p>
            {clubConfig.social.facebook && (
              <a
                href={clubConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-accent text-body-sm transition-colors"
              >
                Facebook
              </a>
            )}
          </div>

          {/* Col 2: links */}
          <div>
            <h3 className="font-semibold text-body-md mb-3">Sider</h3>
            <ul className="flex flex-col gap-2 text-body-sm text-white/80">
              {[
                { href: "/nyheder", label: "Nyheder" },
                { href: "/kamp-program", label: "Kamp-program" },
                { href: "/hold", label: "Hold & Træningstider" },
                { href: "/bliv-medlem", label: "Bliv Medlem" },
                { href: "/om-klubben", label: "Om Klubben" },
                { href: "/kontakt", label: "Kontakt" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-accent transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: contact */}
          <div>
            <h3 className="font-semibold text-body-md mb-3">Kontakt</h3>
            <address className="not-italic flex flex-col gap-2 text-body-sm text-white/80">
              {clubConfig.address && <span>{clubConfig.address}</span>}
              {clubConfig.email && (
                <a href={`mailto:${clubConfig.email}`} className="hover:text-accent transition-colors">
                  {clubConfig.email}
                </a>
              )}
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 py-4 text-center text-white/60 text-body-sm">
        © {new Date().getFullYear()} {clubConfig.name} · Stiftet {clubConfig.founded}
      </div>
    </footer>
  );
}

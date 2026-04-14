"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { clubConfig } from "@/config/club.config";

const NAV_LINKS = [
  { href: "/nyheder", label: "Nyheder", show: true },
  { href: "/kamp-program", label: "Kamp-program", show: true },
  { href: "/hold", label: "Hold & Træningstider", show: true },
  { href: "/bliv-medlem", label: "Bliv Medlem", show: clubConfig.features.membership },
  { href: "/om-klubben", label: "Om Klubben", show: true },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = NAV_LINKS.filter((l) => l.show);

  return (
    <nav className="sticky top-0 z-50 h-16 bg-secondary flex items-center px-4 md:px-8 shadow-md">
      <div className="flex-1 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 text-white font-semibold text-body-lg">
          <img src={clubConfig.logoPath} alt={clubConfig.shortName} className="w-9 h-9 drop-shadow" />
          <span className="hidden sm:block">{clubConfig.name}</span>
        </Link>
      </div>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-6">
        {links.filter((l) => l.href !== "/bliv-medlem").map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={`text-white text-body-sm font-medium pb-0.5 transition-colors hover:text-accent ${
                pathname === l.href || pathname.startsWith(l.href + "/")
                  ? "text-accent font-bold border-b-2 border-accent"
                  : ""
              }`}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Bliv Medlem CTA pill */}
      {clubConfig.features.membership && (
        <Link
          href="/bliv-medlem"
          className="hidden md:inline-block ml-6 px-4 py-1.5 rounded-full bg-accent text-secondary font-bold text-body-sm hover:opacity-90 transition-opacity"
        >
          Bliv Medlem
        </Link>
      )}

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-white p-2"
        aria-label="Menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="block w-6 h-0.5 bg-white mb-1.5" />
        <span className="block w-6 h-0.5 bg-white mb-1.5" />
        <span className="block w-6 h-0.5 bg-white" />
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-16 left-0 right-0 bg-secondary z-50 py-4 flex flex-col border-t border-white/20 shadow-lg">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`px-6 py-3 text-white text-body-md font-medium hover:bg-white/10 ${
                pathname === l.href ? "bg-white/10 border-l-4 border-accent text-accent font-bold" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

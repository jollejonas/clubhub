"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { clubConfig } from "@/config/club.config";

// ─── Inline SVG icon primitives ──────────────────────────────────────────────
function Icon({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-4 h-4 shrink-0 ${className}`}
    >
      {children}
    </svg>
  );
}

const Icons = {
  Dashboard: () => (
    <Icon>
      <rect x="2" y="2" width="7" height="7" rx="1.2" />
      <rect x="11" y="2" width="7" height="7" rx="1.2" />
      <rect x="2" y="11" width="7" height="7" rx="1.2" />
      <rect x="11" y="11" width="7" height="7" rx="1.2" />
    </Icon>
  ),
  Profil: () => (
    <Icon>
      <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M3 18a7 7 0 0 1 14 0" />
    </Icon>
  ),
  Farver: () => (
    <Icon>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 2.5a7.5 7.5 0 0 1 5.3 12.8L10 10V2.5Z" fill="currentColor" strokeWidth="0" />
    </Icon>
  ),
  Social: () => (
    <Icon>
      <circle cx="15.5" cy="4.5" r="2" />
      <circle cx="4.5" cy="10" r="2" />
      <circle cx="15.5" cy="15.5" r="2" />
      <path d="m6.4 11 7.2 3.5M13.6 6l-7.2 3.5" />
    </Icon>
  ),
  Funktioner: () => (
    <Icon>
      <rect x="1.5" y="6.5" width="7" height="7" rx="3.5" />
      <rect x="11.5" y="6.5" width="7" height="7" rx="3.5" />
      <circle cx="15" cy="10" r="2.5" fill="currentColor" strokeWidth="0" />
    </Icon>
  ),
  Nyheder: () => (
    <Icon>
      <rect x="2" y="3" width="16" height="14" rx="1.5" />
      <path d="M6 7h8M6 10h8M6 13h5" />
    </Icon>
  ),
  Hold: () => (
    <Icon>
      <circle cx="7" cy="7" r="2.5" />
      <circle cx="13.5" cy="7" r="2.5" />
      <path d="M1.5 17a5.5 5.5 0 0 1 11 0" />
      <path d="M13.5 14a5.5 5.5 0 0 1 5.5 3" />
    </Icon>
  ),
  Kampe: () => (
    <Icon>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M6 6.5c1 .5 2.5.5 4 0s3-.5 4 0" />
      <path d="M4 12.5c1.5-.5 3.5-.5 6 0s4 .5 5.5 0" />
      <path d="M10 2.5v15" />
    </Icon>
  ),
  Ansogninger: () => (
    <Icon>
      <path d="M14 2H6a1.5 1.5 0 0 0-1.5 1.5v13A1.5 1.5 0 0 0 6 18h8a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 14 2Z" />
      <path d="M7.5 7h5M7.5 10h5M7.5 13h3" />
    </Icon>
  ),
  DBU: () => (
    <Icon>
      <path d="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2Z" />
      <path d="M2 10h16M10 2c-2 2.5-3 5-3 8s1 5.5 3 8M10 2c2 2.5 3 5 3 8s-1 5.5-3 8" />
    </Icon>
  ),
  Setup: () => (
    <Icon>
      <circle cx="10" cy="10" r="2" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" />
    </Icon>
  ),
  Back: () => (
    <Icon>
      <path d="m11 5-5 5 5 5" />
      <path d="M6 10h8" />
    </Icon>
  ),
  Menu: () => (
    <Icon>
      <path d="M3 5h14M3 10h14M3 15h14" />
    </Icon>
  ),
  Close: () => (
    <Icon>
      <path d="m5 5 10 10M15 5 5 15" />
    </Icon>
  ),
};

// ─── Nav data ─────────────────────────────────────────────────────────────────
interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Klub & Identitet",
    items: [
      { href: "/admin/klub/profil",     label: "Klubprofil",    icon: Icons.Profil },
      { href: "/admin/klub/farver",     label: "Farvetema",     icon: Icons.Farver },
      { href: "/admin/klub/sociale",    label: "Sociale medier", icon: Icons.Social },
      { href: "/admin/klub/funktioner", label: "Feature-flags", icon: Icons.Funktioner },
    ],
  },
  {
    label: "Indhold",
    items: [
      { href: "/admin/nyheder", label: "Nyheder",          icon: Icons.Nyheder },
      { href: "/admin/hold",    label: "Hold & Trænere",   icon: Icons.Hold },
      { href: "/admin/kampe",   label: "Kampe & Resultater", icon: Icons.Kampe },
    ],
  },
  {
    label: "Medlemmer",
    items: [
      { href: "/admin/medlemmer/ansogninger", label: "Ansøgninger", icon: Icons.Ansogninger },
    ],
  },
  {
    label: "Integrationer",
    items: [
      { href: "/admin/integrationer/dbu", label: "DBU", icon: Icons.DBU },
    ],
  },
];

// ─── NavLink component ─────────────────────────────────────────────────────────
function NavLink({ href, label, icon: IconComp }: NavItem) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={`
        group flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150
        ${isActive
          ? "bg-white/15 text-white font-semibold shadow-sm"
          : "text-white/65 hover:bg-white/10 hover:text-white/90"
        }
      `}
    >
      <span className={`transition-opacity ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-90"}`}>
        <IconComp />
      </span>
      {label}
      {isActive && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
      )}
    </Link>
  );
}

// ─── Sidebar inner content (shared between desktop & mobile) ──────────────────
function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const isDashboard = pathname === "/admin";
  const isSetup = pathname === "/admin/setup-guide" || pathname.startsWith("/admin/setup-guide/");

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="h-16 flex items-center gap-3 px-4 border-b border-white/10 shrink-0">
        <img
          src={clubConfig.logoPath}
          alt={clubConfig.shortName}
          className="w-8 h-8 drop-shadow"
        />
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm leading-tight truncate">
            {clubConfig.shortName}
          </p>
          <p className="text-white/45 font-normal text-xs">Admin</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded text-white/50 hover:text-white hover:bg-white/10 transition-colors md:hidden"
            aria-label="Luk menu"
          >
            <Icons.Close />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {/* Dashboard */}
        <div className="px-1">
          <Link
            href="/admin"
            onClick={onClose}
            className={`
              flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150
              ${isDashboard
                ? "bg-white/15 text-white shadow-sm"
                : "text-white/65 hover:bg-white/10 hover:text-white/90"
              }
            `}
          >
            <span className={isDashboard ? "opacity-100" : "opacity-60"}>
              <Icons.Dashboard />
            </span>
            Dashboard
            {isDashboard && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            )}
          </Link>
        </div>

        {/* Groups */}
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="px-1">
            <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/35">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <div key={item.href} onClick={onClose}>
                  <NavLink {...item} />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Setup guide */}
        <div className="px-1 pt-1 border-t border-white/10">
          <Link
            href="/admin/setup-guide"
            onClick={onClose}
            className={`
              flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150
              ${isSetup
                ? "bg-accent/20 text-accent"
                : "text-accent/70 hover:bg-accent/10 hover:text-accent"
              }
            `}
          >
            <span className={isSetup ? "opacity-100" : "opacity-70"}>
              <Icons.Setup />
            </span>
            Setup-guide
            {isSetup && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            )}
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/10 shrink-0">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-2 text-xs text-white/35 hover:text-white/60 transition-colors rounded-lg hover:bg-white/5"
        >
          <Icons.Back />
          Tilbage til hjemmeside
        </Link>
      </div>
    </div>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────────
export default function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="w-60 shrink-0 bg-secondary min-h-screen hidden md:flex flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile: top bar with hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-secondary flex items-center gap-3 px-4 border-b border-white/10">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Åbn menu"
        >
          <Icons.Menu />
        </button>
        <img
          src={clubConfig.logoPath}
          alt={clubConfig.shortName}
          className="w-7 h-7 drop-shadow"
        />
        <span className="text-white font-bold text-sm">{clubConfig.shortName} Admin</span>
      </div>

      {/* Mobile: overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile: slide-in drawer */}
      <aside
        className={`
          md:hidden fixed top-0 left-0 z-50 h-full w-64 bg-secondary shadow-2xl
          transition-transform duration-300 ease-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <SidebarContent onClose={() => setMobileOpen(false)} />
      </aside>
    </>
  );
}

import type { MatchCardProps, NewsCardProps } from "@/types/club";

// Static dummy data — used when liveScores is false or dbuTeamId is absent.
// Replace with DBU API calls when dbuTeamId is configured on teams.

// Dummy matches — competitions and clubs sourced from live site (DBU Jylland data)
// Replace with real DBU API calls once dbuClubId is configured
export const dummyMatches: MatchCardProps[] = [
  {
    homeTeam: "Vorbasse B",
    awayTeam: "Andrup IF",
    homeScore: 6,
    awayScore: 0,
    matchDate: "2026-04-12T15:00:00",
    competition: "Herrer Serie 4 - Forår 2026",
    isPlayed: true,
    venue: "Skads Skole",
  },
  {
    homeTeam: "Vorbasse B",
    awayTeam: "Billund FC",
    homeScore: 4,
    awayScore: 2,
    matchDate: "2026-04-08T14:00:00",
    competition: "Herrer Serie 4 - Forår 2026",
    isPlayed: true,
    venue: "Vorbasse Fritidscenter",
  },
  {
    homeTeam: "FC Marsken (S2/276)",
    awayTeam: "Vorbasse B (S2/275)",
    matchDate: "2026-04-15T18:30:00",
    competition: "Gjensidige Kvindepokalen 2026 · Pulje 1",
    isPlayed: false,
    venue: "Marskhallen",
  },
  {
    homeTeam: "Skodborg IF",
    awayTeam: "Vorbasse B",
    matchDate: "2026-04-19T13:00:00",
    competition: "Herrer Serie 5 - Forår 2026",
    isPlayed: false,
    venue: "Skodborg Stadion",
  },
  {
    homeTeam: "Nr. Nebel IF",
    awayTeam: "Vorbasse B",
    matchDate: "2026-04-19T13:00:00",
    competition: "Kvinder Serie 2 - Forår 2026",
    isPlayed: false,
    venue: "Form & Fritid Nørre Nebel",
  },
  {
    homeTeam: "Vorbasse B",
    awayTeam: "Holsted FB",
    matchDate: "2026-04-19T15:00:00",
    competition: "Herrer Serie 4 - Forår 2026",
    isPlayed: false,
    venue: "Vorbasse Fritidscenter",
  },
];

export interface DummyNewsArticle extends NewsCardProps {
  slug: string;
}

// News sourced from live site titles — replace with real CMS/API integration
export const dummyNews: DummyNewsArticle[] = [
  {
    slug: "serie4-magtdemonstration-andrup",
    title: "Serie 4 Herrer: Magtdemonstration i Andrup – Vorbasse smadrer værterne 6-0",
    excerpt: "Mål, pres og spilleglæde – Hestene fortsætter stærkt i Serie 4.",
    publishedAt: "2026-04-12",
    category: "Nyheder 2026",
    href: "/nyheder/serie4-magtdemonstration-andrup",
  },
  {
    slug: "serie4-drommestart-hjemmebane",
    title: "Serie 4 Herrer: Drømmestart på hjemmebanen – Vorbasse vinder 4-2",
    excerpt: "Lynstart, masser af fysik og lidt for meget sløseri til sidst – men tre point blev i Vorbasse.",
    publishedAt: "2026-04-08",
    category: "Nyheder 2026",
    href: "/nyheder/serie4-drommestart-hjemmebane",
  },
  {
    slug: "serie2-kvinder-fremgang-trods-nederlag",
    title: "Serie 2 Kvinder: Tydelig fremgang trods nederlag",
    excerpt: "Stærkere spilopbygning og bedre kommunikation præger kampen.",
    publishedAt: "2026-04-07",
    category: "Nyheder 2026",
    href: "/nyheder/serie2-kvinder-fremgang-trods-nederlag",
  },
  {
    slug: "drommestart-serie4",
    title: "Drømmestart i Serie 4: Vorbasse åbner med sikker sejr",
    excerpt: "VBK Herre Senior åbner foråret med en overbevisende indsats.",
    publishedAt: "2026-04-01",
    category: "Nyheder 2026",
    href: "/nyheder/drommestart-serie4",
  },
  {
    slug: "generalforsamling-2026",
    title: "Generalforsamling i Vorbasse Boldklub: Fremgang, fællesskab og fokus på fremtiden",
    excerpt: "Referat og highlights fra årets generalforsamling.",
    publishedAt: "2026-03-27",
    category: "Nyheder 2026",
    href: "/nyheder/generalforsamling-2026",
  },
  {
    slug: "fodboldskole-2026-tilmelding",
    title: "Tilmeldingen er åben til Vorbasse Fodboldskole 2026",
    excerpt: "VBK afholder fodboldskole i uge 27 – for 3. år i træk!",
    publishedAt: "2026-03-09",
    category: "Nyheder 2026",
    href: "/nyheder/fodboldskole-2026-tilmelding",
  },
];

export const dummyTeamPlayers: Record<string, { name: string; position: string; squadNumber?: number }[]> = {
  "herre-senior": [
    { name: "Lars Nielsen",   position: "Målmand",  squadNumber: 1 },
    { name: "Mads Jensen",    position: "Forsvar",  squadNumber: 4 },
    { name: "Thomas Hansen",  position: "Midtbane", squadNumber: 8 },
    { name: "Rasmus Møller",  position: "Angreb",   squadNumber: 9 },
    { name: "Søren Pedersen", position: "Forsvar",  squadNumber: 5 },
  ],
  "kvinde-senior": [
    { name: "Emma Larsen",    position: "Målmand",  squadNumber: 1 },
    { name: "Sofie Andersen", position: "Forsvar",  squadNumber: 3 },
    { name: "Ida Christensen",position: "Midtbane", squadNumber: 7 },
  ],
};

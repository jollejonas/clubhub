// Club website TypeScript types
// Defined in VOR-12 Design System — all club-specific values flow from ClubConfig

export interface ClubColorTokens {
  primary:        string; // Main brand color
  primaryDark:    string; // Hover/pressed state on primary
  primaryLight:   string; // Subtle highlights / tag backgrounds
  secondary:      string; // Secondary brand color
  secondaryDark:  string; // Footer deep bg / pressed states
  secondaryLight: string; // Active nav / hover on dark bg
  accent:         string; // Highlight / CTA color
  background:     string; // Page background
  surface:        string; // Card / panel background
  text:           string; // Body text
  textMuted:      string; // Secondary text
  border:         string; // Dividers and outlines
  success:        string; // Win indicator
  draw:           string; // Draw indicator
  loss:           string; // Loss indicator
}

export interface ClubSocialLinks {
  facebook?:  string;
  instagram?: string;
  twitter?:   string;
  youtube?:   string;
  tiktok?:    string;
}

export interface ClubTeam {
  id:         string;  // slug e.g. "senior-herrer"
  name:       string;  // display e.g. "Senior Herrer"
  dbuTeamId?: string;  // DBU API id for live data
  gender:     "men" | "women" | "mixed";
  ageGroup?:  string;  // e.g. "U15", "Senior"
}

export interface ClubConfig {
  // Identity
  name:       string;  // "Vorbasse Boldklub"
  shortName:  string;  // "VBK"
  slug:       string;  // "vbk" — used in URLs
  founded?:   number;

  // Assets
  logoPath:    string; // "/clubs/vbk/logo.svg"
  faviconPath: string;

  // Colors
  colors: ClubColorTokens;

  // DBU
  dbuClubId?: string;
  teams:      ClubTeam[];

  // Contact
  email?:   string;
  address?: string;
  social:   ClubSocialLinks;

  // Feature flags
  features: {
    shop:       boolean; // out of scope for now
    membership: boolean;
    liveScores: boolean; // requires dbuTeamId on teams
    news:       boolean;
    gallery:    boolean;
  };
}

// Component prop interfaces

export interface MatchCardProps {
  homeTeam:     string;
  awayTeam:     string;
  homeScore?:   number;
  awayScore?:   number;
  matchDate:    string;  // ISO 8601
  venue?:       string;
  competition?: string;
  isPlayed:     boolean;
}

export interface NewsCardProps {
  title:       string;
  excerpt?:    string;
  publishedAt: string;
  imageUrl?:   string;
  category?:   string;
  href:        string;
}

export interface TeamCardProps {
  name:         string;
  position:     string;
  squadNumber?: number;
  imageUrl?:    string;
}

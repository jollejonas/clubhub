import type { ClubConfig } from "@/types/club";

// THE config file — swap this per club to deploy a new club
// To add a new club: duplicate this file with new values, add logo to /public/clubs/<slug>/

export const clubConfig: ClubConfig = {
  name:       "Vorbasse Boldklub",
  shortName:  "VBK",
  slug:       "vbk",
  founded:    1912,
  logoPath:    "/clubs/vbk/logo.png",
  faviconPath: "/clubs/vbk/favicon.ico",
  colors: {
    primary:        "#f5c400", // VBK yellow — avoid yellow-on-white and white-on-yellow (low contrast)
    primaryDark:    "#d4a900",
    primaryLight:   "#fde97a",
    secondary:      "#0a0f1e", // VBK midnight navy
    secondaryDark:  "#060b15",
    secondaryLight: "#1a2440",
    accent:         "#f5c400",
    background:     "#ffffff",
    surface:        "#f9f9f9",
    text:           "#111111",
    textMuted:      "#4B5563",
    border:         "#D1D5DB",
    success:        "#2E7D32",
    draw:           "#F57C00",
    loss:           "#C62828",
  },
  dbuClubId: undefined,
  teams: [
    { id: "herre-senior",        name: "Herre Senior",       gender: "men",   ageGroup: "Senior" },
    { id: "kvinde-senior",       name: "Kvinde Senior",      gender: "women", ageGroup: "Senior" },
    { id: "oldboys",             name: "Old Boys",           gender: "men",   ageGroup: "Senior" },
    { id: "u15",                 name: "U15",                gender: "men",   ageGroup: "U15" },
    { id: "u13",                 name: "U13",                gender: "men",   ageGroup: "U13" },
    { id: "u11",                 name: "U11",                gender: "men",   ageGroup: "U11" },
    { id: "u9",                  name: "U9",                 gender: "men",   ageGroup: "U9" },
    { id: "u7",                  name: "U7",                 gender: "men",   ageGroup: "U7" },
    { id: "u5",                  name: "U5",                 gender: "men",   ageGroup: "U5" },
    { id: "fodbold-for-piger",   name: "Fodbold for Piger",  gender: "women", ageGroup: "Mixed" },
  ],
  email:   "vbk1912@gmail.com",
  address: "Vorbasse, 7260, Denmark",
  social: {
    facebook: "https://www.facebook.com/pages/Vorbasse-boldklub/348646266240",
  },
  features: {
    shop:       false,
    membership: true,
    liveScores: false,
    news:       true,
    gallery:    false,
  },
};

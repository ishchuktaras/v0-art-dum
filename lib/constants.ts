export const SITE_CONFIG = {
  name: "ART DUM",
  fullName: "ART DUM Stavební firma",
  description: "23 let zkušeností ve stavebnictví. Rekonstrukce, stavby na klíč, opravy.",
  url: "https://artdum.cz",
  phone: "+420 774 335 592",
  email: "firma@artdum.cz",
  address: {
    street: "Karlovo nám 44/33",
    city: "Třebíč",
    zip: "674 01",
  },
  ico: "22401261",
  socialMedia: {
    facebook: "#",
  },
} as const

export const NAVIGATION_ITEMS = [
  { href: "/", label: "Domů" },
  { href: "/o-nas", label: "O nás" },
  { href: "/sluzby", label: "Služby" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/hodnoceni", label: "Hodnocení" },
  { href: "/blog", label: "Blog" },
] as const

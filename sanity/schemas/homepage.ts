import { defineField, defineType } from "sanity"
import { Home } from "lucide-react"

export const homepageSchema = defineType({
  name: "homepage",
  title: "Hlavní stránka",
  type: "document",
  icon: Home,
  fields: [
    defineField({
      name: "heroHeading",
      title: "Hlavní nadpis",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubheading",
      title: "Podnadpis",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hlavní obrázek",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternativní text",
        },
      ],
    }),
    defineField({
      name: "ctaButtonText",
      title: "Text tlačítka (CTA)",
      type: "string",
      initialValue: "Nezávazná poptávka",
    }),
    defineField({
      name: "aboutSectionHeading",
      title: "Nadpis sekce O nás",
      type: "string",
    }),
    defineField({
      name: "aboutSectionText",
      title: "Text sekce O nás",
      type: "text",
    }),
    defineField({
      name: "statCompletedProjects",
      title: "Počet dokončených projektů",
      type: "number",
    }),
    defineField({
      name: "statYearsExperience",
      title: "Roky zkušeností",
      type: "number",
      initialValue: 23,
    }),
    defineField({
      name: "statSatisfiedClients",
      title: "Spokojení klienti",
      type: "number",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Nastavení hlavní stránky",
      }
    },
  },
})

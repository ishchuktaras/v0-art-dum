import { defineField, defineType } from "sanity"
import { ImageIcon } from "lucide-react"

export const portfolioSchema = defineType({
  name: "portfolio",
  title: "Portfolio",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Název projektu",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL adresa (slug)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategorie",
      type: "string",
      options: {
        list: [
          { title: "Rekonstrukce bytu", value: "rekonstrukce-bytu" },
          { title: "Rekonstrukce domu", value: "rekonstrukce-domu" },
          { title: "Koupelna", value: "koupelna" },
          { title: "Kuchyň", value: "kuchyn" },
          { title: "Novostavba", value: "novostavba" },
          { title: "Zateplení", value: "zatepleni" },
          { title: "Střecha", value: "strecha" },
          { title: "Ostatní", value: "ostatni" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Místo realizace",
      type: "string",
      description: 'Např. "Třebíč", "Jihlava", "Brno"',
    }),
    defineField({
      name: "year",
      title: "Rok realizace",
      type: "number",
      validation: (Rule) => Rule.required().min(2000).max(2100),
    }),
    defineField({
      name: "shortDescription",
      title: "Krátký popis",
      type: "text",
      description: "Stručný popis projektu pro náhled",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "fullDescription",
      title: "Detailní popis",
      type: "array",
      of: [{ type: "block" }],
      description: "Podrobný popis projektu, průběhu prací, použitých materiálů",
    }),
    defineField({
      name: "imagesBefore",
      title: 'Fotografie "Před"',
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternativní text",
            },
            {
              name: "caption",
              type: "string",
              title: "Popisek",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "imagesAfter",
      title: 'Fotografie "Po"',
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternativní text",
            },
            {
              name: "caption",
              type: "string",
              title: "Popisek",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "services",
      title: "Provedené služby",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      description: "Služby, které byly v rámci projektu provedeny",
    }),
    defineField({
      name: "projectDuration",
      title: "Doba realizace",
      type: "string",
      description: 'Např. "3 měsíce", "6 týdnů"',
    }),
    defineField({
      name: "isFeatured",
      title: "Zvýrazněný projekt",
      type: "boolean",
      description: "Zobrazit na hlavní stránce?",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Pořadí zobrazení",
      type: "number",
    }),
    defineField({
      name: "isActive",
      title: "Aktivní",
      type: "boolean",
      description: "Zobrazit projekt na webu?",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "imagesAfter.0",
    },
  },
  orderings: [
    {
      title: "Nejnovější",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
    {
      title: "Pořadí",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
})

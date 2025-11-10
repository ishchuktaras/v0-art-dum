import { defineField, defineType } from "sanity"
import { Wrench } from "lucide-react"

export default defineType({
  name: "service",
  title: "Služby",
  type: "document",
  icon: Wrench,
  fields: [
    defineField({
      name: "title",
      title: "Název služby",
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
      name: "shortDescription",
      title: "Krátký popis",
      type: "text",
      description: "Stručný popis pro výpis služeb (2-3 věty)",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "fullDescription",
      title: "Detailní popis",
      type: "array",
      of: [{ type: "block" }],
      description: "Podrobný popis služby",
    }),
    defineField({
      name: "icon",
      title: "Ikona služby",
      type: "string",
      description: "Název ikony z Lucide React",
    }),
    defineField({
      name: "image",
      title: "Obrázek služby",
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
      name: "price",
      title: "Cenové rozmezí",
      type: "string",
      description: 'Např. "Od 5 000 Kč" nebo "Dle domluvy"',
    }),
    defineField({
      name: "features",
      title: "Klíčové vlastnosti",
      type: "array",
      of: [{ type: "string" }],
      description: "Seznam klíčových vlastností služby",
    }),
    defineField({
      name: "order",
      title: "Pořadí zobrazení",
      type: "number",
      description: "Číslo pro řazení služeb (menší číslo = vyšší pozice)",
    }),
    defineField({
      name: "isActive",
      title: "Aktivní",
      type: "boolean",
      description: "Zobrazit službu na webu?",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "shortDescription",
      media: "image",
    },
  },
  orderings: [
    {
      title: "Pořadí",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
})

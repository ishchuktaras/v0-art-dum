import { defineField, defineType } from "sanity"
import { Award } from "lucide-react"

export const certificateSchema = defineType({
  name: "certificate",
  title: "Certifikáty",
  type: "document",
  icon: Award,
  fields: [
    defineField({
      name: "title",
      title: "Název certifikátu",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "issuer",
      title: "Vydavatel",
      type: "string",
      description: 'Kdo certifikát vydal (např. "MŠMT ČR")',
    }),
    defineField({
      name: "issueDate",
      title: "Datum vydání",
      type: "date",
    }),
    defineField({
      name: "description",
      title: "Popis",
      type: "text",
      description: "Krátký popis certifikátu",
    }),
    defineField({
      name: "image",
      title: "Obrázek certifikátu",
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategorie",
      type: "string",
      options: {
        list: [
          { title: "Vzdělání", value: "vzdelani" },
          { title: "Profesní certifikát", value: "profesni" },
          { title: "Nostrifikace", value: "nostrifikace" },
          { title: "Osvědčení", value: "osvedceni" },
        ],
      },
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
      description: "Zobrazit certifikát na webu?",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "issuer",
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

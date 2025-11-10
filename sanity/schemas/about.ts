import { defineField, defineType } from "sanity"
import { Info } from "lucide-react"

export const aboutSchema = defineType({
  name: "about",
  title: "O nás",
  type: "document",
  icon: Info,
  fields: [
    defineField({
      name: "title",
      title: "Název stránky",
      type: "string",
      initialValue: "O nás",
    }),
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
      name: "story",
      title: "Náš příběh",
      type: "array",
      of: [{ type: "block" }],
      description: "Historie firmy, zkušenosti, hodnoty",
    }),
    defineField({
      name: "experience",
      title: "Zkušenosti",
      type: "string",
      description: 'Např. "23 let zkušeností ve stavebnictví"',
    }),
    defineField({
      name: "qualifications",
      title: "Kvalifikace a nostrifikace",
      type: "array",
      of: [{ type: "block" }],
      description: "Informace o kvalifikaci, nostrifikaci vzdělání",
    }),
    defineField({
      name: "teamMembers",
      title: "Členové týmu",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Jméno",
              type: "string",
            },
            {
              name: "position",
              title: "Pozice",
              type: "string",
            },
            {
              name: "bio",
              title: "Bio",
              type: "text",
            },
            {
              name: "photo",
              title: "Fotografie",
              type: "image",
              options: { hotspot: true },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "usp",
      title: "Naše výhody (USP)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Název",
              type: "string",
            },
            {
              name: "description",
              title: "Popis",
              type: "text",
            },
            {
              name: "icon",
              title: "Ikona",
              type: "string",
              description: "Název ikony z Lucide React",
            },
          ],
        },
      ],
      description: "Např. Cena, Rychlost, Kvalita",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "heroHeading",
    },
  },
})

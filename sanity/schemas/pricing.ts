import { defineField, defineType } from "sanity"
import { DollarSign } from "lucide-react"

export default defineType({
  name: "pricing",
  title: "Ceník",
  type: "document",
  icon: DollarSign,
  fields: [
    defineField({
      name: "category",
      title: "Kategorie služeb",
      type: "string",
      description: "Např. 'Rekonstrukce bytů', 'Zednické práce'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL adresa (slug)",
      type: "slug",
      options: {
        source: "category",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Popis kategorie",
      type: "text",
      description: "Stručný popis kategorie služeb",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "items",
      title: "Položky ceníku",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "service",
              title: "Název služby",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "price",
              title: "Cena",
              type: "string",
              description: "Např. 'od 300 000 Kč' nebo '450 Kč/m²'",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "note",
              title: "Poznámka",
              type: "string",
              description: "Např. 'včetně materiálu', 'práce + lepidlo'",
            }),
            defineField({
              name: "unit",
              title: "Jednotka",
              type: "string",
              description: "Např. 'm²', 'm', 'kus', 'paušál'",
            }),
          ],
          preview: {
            select: {
              title: "service",
              subtitle: "price",
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "order",
      title: "Pořadí zobrazení",
      type: "number",
      description: "Číslo pro řazení kategorií (menší číslo = vyšší pozice)",
      initialValue: 0,
    }),
    defineField({
      name: "isActive",
      title: "Aktivní",
      type: "boolean",
      description: "Zobrazit kategorii na webu?",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "category",
      subtitle: "description",
      order: "order",
    },
    prepare({ title, subtitle, order }) {
      return {
        title: `${order ? `${order}. ` : ""}${title}`,
        subtitle,
      }
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

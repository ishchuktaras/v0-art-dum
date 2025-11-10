import { defineField, defineType } from "sanity"
import { MessageSquare } from "lucide-react"

export const reviewSchema = defineType({
  name: "review",
  title: "Recenze",
  type: "document",
  icon: MessageSquare,
  fields: [
    defineField({
      name: "customerName",
      title: "Jméno zákazníka",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Hodnocení",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
      description: "Hodnocení od 1 do 5 hvězdiček",
    }),
    defineField({
      name: "reviewText",
      title: "Text recenze",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "project",
      title: "Související projekt",
      type: "reference",
      to: [{ type: "portfolio" }],
      description: "Volitelně - odkaz na projekt, kterého se recenze týká",
    }),
    defineField({
      name: "location",
      title: "Místo",
      type: "string",
      description: 'Např. "Třebíč"',
    }),
    defineField({
      name: "date",
      title: "Datum recenze",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "source",
      title: "Zdroj",
      type: "string",
      options: {
        list: [
          { title: "Firmy.cz", value: "firmy-cz" },
          { title: "Google", value: "google" },
          { title: "Přímo od zákazníka", value: "direct" },
        ],
      },
      initialValue: "direct",
    }),
    defineField({
      name: "isPublished",
      title: "Zveřejněno",
      type: "boolean",
      description: "Zobrazit recenzi na webu?",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "customerName",
      subtitle: "reviewText",
      rating: "rating",
    },
    prepare(selection) {
      const { title, subtitle, rating } = selection
      return {
        title: `${title} - ${"⭐".repeat(rating)}`,
        subtitle: subtitle?.substring(0, 60) + "...",
      }
    },
  },
  orderings: [
    {
      title: "Nejnovější",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
})

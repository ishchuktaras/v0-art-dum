import { defineField, defineType } from "sanity"
import { ImageIcon } from "lucide-react"

export default defineType({
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
          { title: "Zahrada a exteriér", value: "zahrada-exterier" },
          { title: "Interiér", value: "interier" },
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
      description: "Stručný popis projektu pro náhled (1-2 věty)",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "fullDescription",
      title: "Detailní popis projektu",
      type: "array",
      of: [{ type: "block" }],
      description: "Podrobný popis: průběh prací, použité materiály, splněné požadavky zákazníka",
    }),
    defineField({
      name: "images",
      title: "Fotografie projektu",
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
              description: "Popis obrázku pro SEO a přístupnost",
            },
            {
              name: "caption",
              type: "string",
              title: "Popisek",
              description: "Volitelný popis pro návštěvníky",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      description: "Faktické fotografie dokončeného projektu (minimálně 1, doporučeno 3-6)",
    }),
    defineField({
      name: "clientRequirements",
      title: "Požadavky zákazníka",
      type: "text",
      description: "Co zákazník požadoval a očekával od projektu",
    }),
    defineField({
      name: "materialsUsed",
      title: "Použité materiály",
      type: "array",
      of: [{ type: "string" }],
      description: "Seznam klíčových materiálů použitých v projektu",
    }),
    defineField({
      name: "servicesPerformed",
      title: "Provedené práce",
      type: "array",
      of: [{ type: "string" }],
      description: "Seznam konkrétních prací provedených v rámci projektu",
    }),
    defineField({
      name: "services",
      title: "Související kategorie služeb",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      description: "Propojení s kategoriemi služeb v ceníku",
    }),
    defineField({
      name: "projectDuration",
      title: "Doba realizace",
      type: "string",
      description: 'Např. "3 měsíce", "6 týdnů", "2 týdny"',
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
      description: "Čím nižší číslo, tím výše se projekt zobrazí",
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
      media: "images.0",
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

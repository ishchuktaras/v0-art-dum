import { defineField, defineType } from "sanity"
import { FileText } from "lucide-react"

export const blogSchema = defineType({
  name: "blog",
  title: "Blog / Aktuality",
  type: "document",
  icon: FileText,
  fields: [
    defineField({
      name: "title",
      title: "Nadpis článku",
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
      name: "excerpt",
      title: "Perex",
      type: "text",
      description: "Stručný úvod k článku (zobrazí se v náhledu)",
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "content",
      title: "Obsah článku",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
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
              title: "Popisek obrázku",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featuredImage",
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategorie",
      type: "string",
      options: {
        list: [
          { title: "Novinky", value: "novinky" },
          { title: "Tipy a rady", value: "tipy-a-rady" },
          { title: "Realizace", value: "realizace" },
          { title: "Materiály", value: "materialy" },
        ],
      },
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "string",
      initialValue: "ART DUM",
    }),
    defineField({
      name: "publishedAt",
      title: "Datum zveřejnění",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "isPublished",
      title: "Zveřejněno",
      type: "boolean",
      description: "Zobrazit článek na webu?",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "featuredImage",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString("cs-CZ") : "Bez data",
        media,
      }
    },
  },
  orderings: [
    {
      title: "Nejnovější",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
})

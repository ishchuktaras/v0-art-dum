import { defineType, defineField } from "sanity"

export default defineType({
  name: "contactInfo",
  title: "Kontaktní informace",
  type: "document",
  fields: [
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "address",
      title: "Adresa",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ico",
      title: "IČO",
      type: "string",
    }),
    defineField({
      name: "openingHours",
      title: "Otevírací hodiny",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "day",
              title: "Den",
              type: "string",
              options: {
                list: [
                  { title: "Pondělí", value: "po" },
                  { title: "Úterý", value: "ut" },
                  { title: "Středa", value: "st" },
                  { title: "Čtvrtek", value: "ct" },
                  { title: "Pátek", value: "pa" },
                  { title: "Sobota", value: "so" },
                  { title: "Neděle", value: "ne" },
                ],
              },
            },
            {
              name: "hours",
              title: "Hodiny",
              type: "string",
              description: "Např. 8:00 - 17:00",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "socialMedia",
      title: "Sociální sítě",
      type: "object",
      fields: [
        {
          name: "facebook",
          title: "Facebook",
          type: "url",
        },
        {
          name: "instagram",
          title: "Instagram",
          type: "url",
        },
        {
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
        },
      ],
    }),
  ],
  preview: {
    select: {
      phone: "phone",
      email: "email",
    },
    prepare({ phone, email }) {
      return {
        title: "Kontaktní informace",
        subtitle: `${phone} | ${email}`,
      }
    },
  },
})

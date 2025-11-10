import type { SchemaTypeDefinition } from "sanity"

import { serviceSchema } from "./schemas/service"
import { portfolioSchema } from "./schemas/portfolio"
import { blogSchema } from "./schemas/blog"
import { aboutSchema } from "./schemas/about"
import { certificateSchema } from "./schemas/certificate"
import { reviewSchema } from "./schemas/review"
import { homepageSchema } from "./schemas/homepage"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepageSchema, serviceSchema, portfolioSchema, blogSchema, aboutSchema, certificateSchema, reviewSchema],
}

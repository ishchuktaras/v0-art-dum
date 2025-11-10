export interface Service {
  _id: string
  title: string
  slug: string
  shortDescription: string
  description: string
  icon?: string
  image?: string
  features: string[]
  order: number
}

export interface PortfolioProject {
  _id: string
  title: string
  slug: string
  description: string
  category: string
  location: string
  year: number
  beforeImage?: string
  afterImage?: string
  gallery: string[]
  featured: boolean
}

export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  image?: string
  category: string
}

export interface Certificate {
  _id: string
  title: string
  issuer: string
  issueDate: string
  image: string
  order: number
}

export interface Service {
  _id: string
  title: string
  slug: { current: string }
  shortDescription: string
  fullDescription?: any[]
  icon?: string
  image?: any
  price?: string
  features?: string[]
  order?: number
  isActive: boolean
}

export interface Portfolio {
  _id: string
  title: string
  slug: { current: string }
  category: string
  location?: string
  year: number
  shortDescription: string
  fullDescription?: any[]
  imagesBefore: any[]
  imagesAfter: any[]
  services?: Service[]
  projectDuration?: string
  isFeatured: boolean
  order?: number
  isActive: boolean
}

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  content: any[]
  featuredImage: any
  category?: string
  author: string
  publishedAt: string
  isPublished: boolean
}

export interface About {
  _id: string
  title: string
  heroHeading: string
  heroSubheading?: string
  heroImage?: any
  story?: any[]
  experience?: string
  qualifications?: any[]
  teamMembers?: TeamMember[]
  usp?: USP[]
}

export interface TeamMember {
  name: string
  position: string
  bio?: string
  photo?: any
}

export interface USP {
  title: string
  description: string
  icon?: string
}

export interface Certificate {
  _id: string
  title: string
  issuer?: string
  issueDate?: string
  description?: string
  image: any
  category?: string
  order?: number
  isActive: boolean
}

export interface Review {
  _id: string
  customerName: string
  rating: number
  reviewText: string
  project?: Portfolio
  location?: string
  date: string
  source: string
  isPublished: boolean
}

export interface Homepage {
  _id: string
  heroHeading: string
  heroSubheading: string
  heroImage?: any
  ctaButtonText: string
  aboutSectionHeading?: string
  aboutSectionText?: string
  statCompletedProjects?: number
  statYearsExperience: number
  statSatisfiedClients?: number
}

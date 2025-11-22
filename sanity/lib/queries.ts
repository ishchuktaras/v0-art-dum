import { groq } from "next-sanity"

// Homepage
export const HOMEPAGE_QUERY = groq`*[_type == "homepage"][0]{
  _id,
  heroHeading,
  heroSubheading,
  heroImage,
  ctaButtonText,
  aboutSectionHeading,
  aboutSectionText,
  statCompletedProjects,
  statYearsExperience,
  statSatisfiedClients
}`

// Services
export const SERVICES_QUERY = groq`*[_type == "service" && (!defined(isActive) || isActive == true)] | order(order asc) {
  _id,
  title,
  slug,
  shortDescription,
  icon,
  image,
  price,
  features,
  order
}`

// Portfolio
export const PORTFOLIO_QUERY = groq`*[_type == "portfolio"] | order(year desc) {
  _id,
  title,
  slug,
  category,
  location,
  year,
  shortDescription,
  "mainImage": images[0]{
    asset->{
      _id,
      url
    },
    alt,
    caption
  },
  isFeatured
}`

export const FEATURED_PORTFOLIO_QUERY = groq`*[_type == "portfolio" && isFeatured == true] | order(order asc) [0...6] {
  _id,
  title,
  slug,
  category,
  location,
  year,
  shortDescription,
  "mainImage": images[0]{
    asset->{
      _id,
      url
    },
    alt,
    caption
  }
}`

export const PORTFOLIO_BY_SLUG_QUERY = groq`*[_type == "portfolio" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  location,
  year,
  shortDescription,
  "fullDescription": pt::text(fullDescription),
  images,
  services[]-> {
    _id,
    title,
    slug
  },
  projectDuration
}`

// Blog
export const BLOG_POSTS_QUERY = groq`*[_type == "blog" && isPublished == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  category,
  author,
  publishedAt
}`

export const BLOG_POST_BY_SLUG_QUERY = groq`*[_type == "blog" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  content,
  featuredImage,
  category,
  author,
  publishedAt
}`

// About
export const ABOUT_QUERY = groq`*[_type == "about"][0] {
  _id,
  title,
  heroHeading,
  heroSubheading,
  heroImage{
    asset->{
      _id,
      url
    },
    alt
  },
  story,
  experience,
  qualifications,
  teamMembers[]{
    name,
    position,
    bio,
    photo{
      asset->{
        _id,
        url
      }
    }
  },
  usp
}`

// Certificates
export const CERTIFICATES_QUERY = groq`*[_type == "certificate"] | order(order asc) {
  _id,
  title,
  issuer,
  issueDate,
  description,
  image,
  category
}`

// Contact Info
export const CONTACT_INFO_QUERY = groq`*[_type == "contactInfo"][0] {
  _id,
  phone,
  email,
  address,
  ico,
  openingHours,
  socialLinks
}`

// Reviews
export const REVIEWS_QUERY = groq`*[_type == "review" && isPublished == true] | order(date desc) {
  _id,
  customerName,
  rating,
  reviewText,
  location,
  date,
  source
}`

// Pricing
export const PRICING_QUERY = groq`*[_type == "pricing" && (!defined(isActive) || isActive == true)] | order(order asc) {
  _id,
  category,
  slug,
  description,
  items,
  order
}`

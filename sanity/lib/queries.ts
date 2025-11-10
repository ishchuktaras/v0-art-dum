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
export const SERVICES_QUERY = groq`*[_type == "service" && isActive == true] | order(order asc) {
  _id,
  title,
  slug,
  shortDescription,
  icon,
  image,
  price,
  order
}`

export const SERVICE_BY_SLUG_QUERY = groq`*[_type == "service" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  shortDescription,
  fullDescription,
  icon,
  image,
  price,
  features
}`

// Portfolio
export const PORTFOLIO_QUERY = groq`*[_type == "portfolio" && isActive == true] | order(year desc) {
  _id,
  title,
  slug,
  category,
  location,
  year,
  shortDescription,
  imagesAfter[0],
  isFeatured
}`

export const FEATURED_PORTFOLIO_QUERY = groq`*[_type == "portfolio" && isActive == true && isFeatured == true] | order(order asc) [0...6] {
  _id,
  title,
  slug,
  category,
  location,
  year,
  shortDescription,
  imagesAfter[0]
}`

export const PORTFOLIO_BY_SLUG_QUERY = groq`*[_type == "portfolio" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  location,
  year,
  shortDescription,
  fullDescription,
  imagesBefore,
  imagesAfter,
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
  heroImage,
  story,
  experience,
  qualifications,
  teamMembers,
  usp
}`

// Certificates
export const CERTIFICATES_QUERY = groq`*[_type == "certificate" && isActive == true] | order(order asc) {
  _id,
  title,
  issuer,
  issueDate,
  description,
  image,
  category
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

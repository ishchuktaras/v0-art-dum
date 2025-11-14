import { sanityFetch } from "@/sanity/lib/fetch"
import { BLOG_POSTS_QUERY, PORTFOLIO_QUERY, SERVICES_QUERY } from "@/sanity/lib/queries"

export async function GET() {
  const baseUrl = "https://artdum.cz"

  // Fetch dynamic content from Sanity
  const blogPosts = await sanityFetch<any[]>({
    query: BLOG_POSTS_QUERY,
    tags: ["post"],
  })

  const portfolio = await sanityFetch<any[]>({
    query: PORTFOLIO_QUERY,
    tags: ["project"],
  })

  const services = await sanityFetch<any[]>({
    query: SERVICES_QUERY,
    tags: ["service"],
  })

  // Static pages
  const staticPages = [
    { url: "", changefreq: "daily", priority: 1.0 },
    { url: "/sluzby", changefreq: "weekly", priority: 0.9 },
    { url: "/portfolio", changefreq: "weekly", priority: 0.9 },
    { url: "/blog", changefreq: "weekly", priority: 0.8 },
    { url: "/o-nas", changefreq: "monthly", priority: 0.7 },
    { url: "/hodnoceni", changefreq: "monthly", priority: 0.7 },
    { url: "/kontakt", changefreq: "monthly", priority: 0.8 },
    { url: "/gdpr", changefreq: "yearly", priority: 0.3 },
    { url: "/obchodni-podminky", changefreq: "yearly", priority: 0.3 },
    { url: "/pravni-ustanoveni", changefreq: "yearly", priority: 0.3 },
  ]

  // Dynamic blog posts
  const blogUrls = blogPosts?.map((post) => ({
    url: `/blog/${post.slug.current}`,
    changefreq: "monthly",
    priority: 0.6,
    lastmod: post._updatedAt,
  })) || []

  // Dynamic portfolio projects
  const portfolioUrls = portfolio?.map((project) => ({
    url: `/portfolio/${project.slug.current}`,
    changefreq: "monthly",
    priority: 0.6,
    lastmod: project._updatedAt,
  })) || []

  const allUrls = [...staticPages, ...blogUrls, ...portfolioUrls]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ""}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("")}
</urlset>`

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
    },
  })
}

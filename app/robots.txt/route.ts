export async function GET() {
  const baseUrl = "https://artdum.cz"

  const robotsTxt = `# Robots.txt pro artdum.cz
User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin and auth pages
User-agent: *
Disallow: /admin
Disallow: /auth

# Crawl delay (optional)
User-agent: *
Crawl-delay: 1
`

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
    },
  })
}

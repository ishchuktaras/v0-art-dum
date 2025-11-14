import { Calendar, Tag, User } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { sanityFetch } from "@/sanity/lib/fetch"
import { BLOG_POSTS_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import type { Metadata } from "next"

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  featuredImage: any
  category?: string
  author?: string
  publishedAt: string
}

const categoryLabels: Record<string, string> = {
  novinky: "Novinky",
  "tipy-a-rady": "Tipy a rady",
  realizace: "Realizace",
  materialy: "Materiály",
}

export const metadata: Metadata = {
  title: "Blog & Aktuality ze stavebnictví | Tipy a rady | ART DUM Třebíč",
  description:
    "Novinky, tipy a rady ze světa stavebnictví a rekonstrukcí od profesionálů. Praktické návody, trendy, materiály. Blog stavební firmy ART DUM.",
  keywords: [
    "blog stavebnictví",
    "tipy rekonstrukce",
    "stavební rady",
    "novinky stavby",
    "materiály",
    "trendy stavebnictví",
  ],
  openGraph: {
    title: "Blog & Aktuality | ART DUM",
    description: "Tipy, rady a novinky ze světa stavebnictví a rekonstrukcí",
    url: "https://artdum.cz/blog",
  },
  alternates: {
    canonical: "https://artdum.cz/blog",
  },
}

export default async function BlogPage() {
  const posts = await sanityFetch<BlogPost[]>({
    query: BLOG_POSTS_QUERY,
  })

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "ART DUM Blog",
    description: "Blog o stavebnictví, rekonstrukcích a stavebních pracích",
    url: "https://artdum.cz/blog",
    publisher: {
      "@type": "Organization",
      name: "ART DUM",
      logo: {
        "@type": "ImageObject",
        url: "https://artdum.cz/logo.png",
      },
    },
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black text-center mb-4">Blog & Aktuality</h1>
          <p className="text-xl text-center text-gray-200 max-w-2xl mx-auto">
            Novinky, tipy a rady ze světa stavebnictví a rekonstrukcí
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <Link href={`/blog/${post.slug.current}`}>
                    <div className="relative h-48 w-full">
                      {post.featuredImage ? (
                        <Image
                          src={urlFor(post.featuredImage)?.width(600).height(400).url() || "/placeholder.svg"}
                          alt={post.featuredImage.alt || post.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <span className="text-white text-6xl font-black opacity-20">ART DUM</span>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-6">
                    {post.category && (
                      <div className="mb-3">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                          <Tag className="w-3 h-3" />
                          {categoryLabels[post.category] || post.category}
                        </span>
                      </div>
                    )}

                    <Link href={`/blog/${post.slug.current}`}>
                      <h2 className="text-xl font-bold text-primary mb-3 hover:text-accent transition-colors">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author || "ART DUM"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={post.publishedAt}>
                          {new Date(post.publishedAt).toLocaleDateString("cs-CZ", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </time>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <Tag className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-2">Zatím zde nejsou žádné články</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Brzy zde najdete zajímavé články, tipy a aktuality ze světa stavebnictví.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">Máte dotaz nebo chcete konzultaci?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">Rádi vám poradíme s vaším projektem</p>
          <Link
            href="/kontakt"
            className="inline-block bg-accent hover:bg-accent/90 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-300"
          >
            Kontaktujte nás
          </Link>
        </div>
      </section>
    </main>
  )
}

import { Calendar, Tag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { BLOG_POSTS_QUERY } from "@/sanity/lib/queries";
import { urlForHeroImage, urlFor } from "@/sanity/lib/image";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  featuredImage: any;
  category?: string;
  author?: string;
  publishedAt: string;
}

const categoryLabels: Record<string, string> = {
  novinky: "Novinky",
  "tipy-a-rady": "Tipy a rady",
  realizace: "Realizace",
  materialy: "Materiály",
};

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
    siteName: "Oleh Kulish, OSVČ - ART DUM",
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: "https://artdum.cz/og-image-main.jpg",
        width: 1200,
        height: 630,
        alt: "Blog & Aktuality - Oleh Kulish, OSVČ - ART DUM | Stavební tipy a novinky",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Aktuality | ART DUM",
    description: "Tipy, rady a novinky ze světa stavebnictví a rekonstrukcí",
    images: ["https://artdum.cz/og-image-main.jpg"],
  },
  alternates: {
    canonical: "https://artdum.cz/blog",
  },
};

export default async function BlogPage() {
  const posts = await sanityFetch<BlogPost[]>({
    query: BLOG_POSTS_QUERY,
  });

  const featuredPortfolio = await sanityFetch<any[]>({
    query: `*[_type == "portfolio" && isFeatured == true] | order(order asc) [0...6] {
      _id,
      "mainImage": images[0]{
        asset->{
          _id,
          url
        }
      }
    }`,
  });

  const heroBackgroundImage = featuredPortfolio?.[3]?.mainImage
    ? urlForHeroImage(featuredPortfolio[3].mainImage)
    : null;

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
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-20 md:py-32 overflow-hidden">
        {/* Background image with overlay */}
        {heroBackgroundImage && (
          <div className="absolute inset-0">
            <Image
              src={heroBackgroundImage || "/placeholder.svg"}
              alt="Blog ART DUM"
              fill
              className="object-cover"
              priority
              quality={75}
              sizes="100vw"
            />
            {/* Multi-layer gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b192f]/95 via-[#0f2342]/90 to-[#0b192f]/95" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b192f]/90 via-transparent to-[#0b192f]/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Tag className="w-4 h-4" />
              <span>Tipy, rady a novinky</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Blog & Aktuality
            </h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
              Novinky, tipy a rady ze světa stavebnictví a rekonstrukcí
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-border"
                >
                  <Link href={`/blog/${post.slug.current}`}>
                    <div className="relative h-48 w-full bg-muted">
                      {post.featuredImage ? (
                        <Image
                          src={
                            urlFor(post.featuredImage, 600, 400) ||
                            "/placeholder.svg"
                          }
                          alt={post.featuredImage.alt || post.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <span className="text-white text-6xl font-black opacity-20">
                            ART DUM
                          </span>
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
                      <h2 className="text-xl font-bold text-foreground mb-3 hover:text-accent transition-colors">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author || "ART DUM"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={post.publishedAt}>
                          {new Date(post.publishedAt).toLocaleDateString(
                            "cs-CZ",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
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
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Zatím zde nejsou žádné články
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Brzy zde najdete zajímavé články, tipy a aktuality ze světa
                stavebnictví.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
            Máte dotaz nebo chcete konzultaci?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Rádi vám poradíme s vaším projektem
          </p>
          <Link href="/kontakt">
            <Button
              size="lg"
              className="group bg-gold text-primary-dark hover:bg-gold/90 font-bold text-lg px-8 py-6 h-auto shadow-2xl shadow-gold/20 hover:scale-105 transition-all"
            >
              <span>Kontaktujte nás</span>
              <svg
                className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

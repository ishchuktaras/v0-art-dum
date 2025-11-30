import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { notFound } from 'next/navigation';
import { PortableText } from "next-sanity";
import { sanityFetch, sanityFetchStatic } from "@/sanity/lib/fetch";
import {
  BLOG_POST_BY_SLUG_QUERY,
  BLOG_POSTS_QUERY,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  content: any[];
  featuredImage: any;
  category?: string;
  author?: string;
  publishedAt: string;
  mainImage: any
}

const categoryLabels: Record<string, string> = {
  novinky: "Novinky",
  "tipy-a-rady": "Tipy a rady",
  realizace: "Realizace",
  materialy: "Materiály",
};

export async function generateStaticParams() {
  try {
    const posts = await sanityFetchStatic<BlogPost[]>({
      query: BLOG_POSTS_QUERY,
    });

    if (!posts || posts.length === 0) {
      return [];
    }

    return posts.map((post) => ({
      slug: post.slug.current,
    }));
  } catch (error) {
    console.error("[v0] Error generating static params for blog:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  try {
    const post = await sanityFetchStatic<BlogPost>({
      query: BLOG_POST_BY_SLUG_QUERY,
      params: { slug },
    });

    if (!post) {
      return {
        title: "Článek nenalezen | ART DUM",
      };
    }

    return {
      title: `${post.title} | ART DUM Blog`,
      description: post.excerpt,
    };
  } catch (error) {
    console.error("[v0] Error generating metadata for blog post:", error);
    return {
      title: "Článek nenalezen | ART DUM",
    };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  try {
    const post = await sanityFetch<BlogPost>({
      query: BLOG_POST_BY_SLUG_QUERY,
      params: { slug },
    });

    if (!post) {
      notFound();
    }

    return (
      <main className="min-h-screen bg-white">
        {/* Hero with Featured Image */}
        <div className="relative h-[400px] w-full bg-primary">
          {post.featuredImage ? (
            <Image
              // OPRAVA 1: Použití nového formátu urlFor(image, width, height)
              src={urlFor(post.featuredImage, 1920, 800) || "/placeholder.svg"}
              alt={post.featuredImage.alt || post.title}
              fill
              className="object-cover opacity-30"
              priority
            />
          ) : null}

          <div className="absolute inset-0 bg-linear-to-t from-primary to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 pb-12">
            <div className="container mx-auto px-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-white hover:text-accent transition-colors mb-6"
              >
                <ArrowLeft className="w-5 h-5" />
                Zpět na blog
              </Link>

              {post.category && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-white bg-accent px-4 py-2 rounded-full">
                    <Tag className="w-4 h-4" />
                    {categoryLabels[post.category] || post.category}
                  </span>
                </div>
              )}

              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 max-w-4xl">
                {post.title}
              </h1>

              <div className="flex items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="font-semibold">
                    {post.author || "ART DUM"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
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
          </div>
        </div>

        {/* Article Content */}
        <article className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Excerpt */}
            <p className="text-xl text-gray-700 leading-relaxed mb-8 pb-8 border-b border-gray-200 italic">
              {post.excerpt}
            </p>

            {/* Content */}
            <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-primary prose-p:text-gray-700 prose-a:text-accent prose-a:font-semibold hover:prose-a:text-accent/80 prose-strong:text-primary prose-img:rounded-lg">
              <PortableText
                value={post.content}
                components={{
                  types: {
                    image: ({ value }) => (
                      <figure className="my-8">
                        <Image
                          // OPRAVA 2: Zde používáme 'value' (aktuální obrázek z textu), ne 'post.mainImage'
                          src={urlFor(value, 1200, 800) || "/placeholder.svg"}
                          alt={value.alt || "Obrázek článku"}
                          width={1200}
                          height={800}
                          className="rounded-lg"
                        />
                        {value.caption && (
                          <figcaption className="text-center text-sm text-gray-600 mt-2">
                            {value.caption}
                          </figcaption>
                        )}
                      </figure>
                    ),
                  },
                }}
              />
            </div>
          </div>
        </article>

        {/* CTA Section */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-black mb-4">Zaujal vás tento článek?</h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Kontaktujte nás pro konzultaci vašeho projektu
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-accent hover:bg-accent/90 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-300"
            >
              Nezávazná poptávka
            </Link>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("[v0] Error fetching blog post:", error);
    notFound();
  }
}
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { sanityFetch } from "@/sanity/lib/fetch"
import { PORTFOLIO_BY_SLUG_QUERY, PORTFOLIO_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import type { Metadata } from "next"
import { notFound } from 'next/navigation'

interface PortfolioImage {
  asset?: {
    _id: string
    url: string
  }
  alt?: string
  caption?: string
}

interface Service {
  _id: string
  title: string
  slug: { current: string }
}

interface PortfolioProject {
  _id: string
  title: string
  slug: { current: string }
  category: string
  location?: string
  year?: number
  shortDescription: string
  fullDescription?: string
  imagesBefore?: PortfolioImage[]
  imagesAfter?: PortfolioImage[]
  services?: Service[]
  projectDuration?: string
}

const categoryLabels: Record<string, string> = {
  "rekonstrukce-bytu": "Rekonstrukce bytu",
  "rekonstrukce-domu": "Rekonstrukce domu",
  koupelna: "Koupelna",
  kuchyn: "Kuchyň",
  novostavba: "Novostavba",
  zatepleni: "Zateplení",
  strecha: "Střecha",
  ostatni: "Ostatní",
}

export async function generateStaticParams() {
  const projects = await sanityFetch<Array<{ slug: { current: string } }>>({
    query: PORTFOLIO_QUERY,
    tags: ["portfolio"],
  })

  return projects.map((project) => ({
    slug: project.slug.current,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await sanityFetch<PortfolioProject>({
    query: PORTFOLIO_BY_SLUG_QUERY,
    params: { slug },
    tags: ["portfolio"],
  })

  if (!project) {
    return {
      title: "Projekt nenalezen | ART DUM",
    }
  }

  return {
    title: `${project.title} | Portfolio | ART DUM`,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: project.imagesAfter?.[0]?.asset?.url
        ? [{ url: project.imagesAfter[0].asset.url }]
        : [],
    },
  }
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await sanityFetch<PortfolioProject>({
    query: PORTFOLIO_BY_SLUG_QUERY,
    params: { slug },
    tags: ["portfolio"],
  })

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
          <div className="container mx-auto px-4 relative z-10">
            <Link
              href="/portfolio"
              className="inline-flex items-center text-gold hover:text-gold/80 transition-colors mb-6"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Zpět na portfolio
            </Link>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-semibold mb-6">
                {categoryLabels[project.category] || project.category}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-lg">
                {project.location && (
                  <span className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {project.location}
                  </span>
                )}
                {project.year && (
                  <span className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {project.year}
                  </span>
                )}
                {project.projectDuration && (
                  <span className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {project.projectDuration}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-black mb-6">O projektu</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed text-foreground whitespace-pre-line">
                  {project.fullDescription || project.shortDescription}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Before Images */}
        {project.imagesBefore && project.imagesBefore.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-black mb-8 text-center">
                Stav před rekonstrukcí
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.imagesBefore.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-video overflow-hidden rounded-lg shadow-lg"
                  >
                    <Image
                      src={image.asset?.url || "/placeholder.svg"}
                      alt={image.alt || `${project.title} - před ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 text-sm">
                        {image.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* After Images */}
        {project.imagesAfter && project.imagesAfter.length > 0 && (
          <section className="py-16 bg-muted">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-black mb-8 text-center">
                Stav po rekonstrukci
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.imagesAfter.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-video overflow-hidden rounded-lg shadow-lg"
                  >
                    <Image
                      src={image.asset?.url || "/placeholder.svg"}
                      alt={image.alt || `${project.title} - po ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 text-sm">
                        {image.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Services */}
        {project.services && project.services.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-black mb-8">Provedené služby</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.services.map((service) => (
                    <Link
                      key={service._id}
                      href={`/sluzby/${service.slug.current}`}
                      className="flex items-center p-4 bg-muted rounded-lg hover:bg-gold/10 hover:border-gold border border-transparent transition-all"
                    >
                      <svg
                        className="w-6 h-6 mr-3 text-gold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="font-semibold">{service.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
              Líbí se vám tento projekt?
            </h2>
            <p className="text-xl mb-10 text-white/80 max-w-2xl mx-auto leading-relaxed">
              Kontaktujte nás a společně vytvoříme podobné řešení i pro vás
            </p>
            <Link href="/kontakt">
              <Button
                size="lg"
                className="group bg-gold text-primary-dark hover:bg-gold/90 font-bold text-lg px-8 py-6 h-auto shadow-2xl shadow-gold/20 hover:scale-105 transition-all"
              >
                <span>Nezávazná konzultace</span>
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

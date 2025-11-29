"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

interface PortfolioProject {
  _id: string
  title: string
  slug: { current: string }
  shortDescription: string
  category: string
  location?: string
  year?: number
  mainImage?: {
    asset?: {
      url: string
    }
    alt?: string
  }
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
  "zahrada-exterier": "Zahrada a exteriér",
  interier: "Interiér"
}

export default function PortfolioFeed({ projects }: { projects: PortfolioProject[] }) {
  const [activeCategory, setActiveCategory] = useState("Všechny projekty")

  // Získání unikátních kategorií
  const uniqueCategories = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))
  const categories = ["Všechny projekty", ...uniqueCategories.map((cat) => categoryLabels[cat] || cat)]

  // Logika filtrace - porovnáváme s labelem (pokud je v seznamu) nebo s raw hodnotou
  const filteredProjects = activeCategory === "Všechny projekty"
    ? projects
    : projects.filter(project => (categoryLabels[project.category] || project.category) === activeCategory)

  return (
    <>
      {/* Sekce Filtrů */}
      <section className="py-8 border-b bg-muted sticky top-0 z-20 backdrop-blur-md bg-white/80 dark:bg-slate-900/80">
        <div className="container mx-auto px-4 overflow-x-auto pb-2">
          <div className="flex flex-nowrap md:flex-wrap gap-3 justify-start md:justify-center min-w-max md:min-w-0">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? "default" : "outline"}
                className={`whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-[#D4AF37] text-[#0B192F] hover:bg-[#D4AF37]/90 shadow-md shadow-[#D4AF37]/20 font-bold"
                    : "hover:border-[#D4AF37]/50 text-slate-600"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Mřížka projektů */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">V této kategorii zatím nejsou žádné projekty.</p>
              <Button onClick={() => setActiveCategory("Všechny projekty")} variant="outline">
                Zobrazit vše
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
              {filteredProjects.map((project) => {
                const imageUrl = project.mainImage?.asset?.url || "/placeholder.svg?height=600&width=800"

                return (
                  <Link key={project._id} href={`/portfolio/${project.slug?.current}`}>
                    <Card className="overflow-hidden hover:shadow-2xl hover:shadow-[#D4AF37]/10 transition-all duration-300 group cursor-pointer border-2 border-gray-100 hover:border-[#D4AF37]/30 h-full flex flex-col">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={project.mainImage?.alt || project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-4 right-4">
                          <span className="bg-[#D4AF37] text-[#0B192F] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                            {categoryLabels[project.category] || project.category}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold mb-2 text-[#0B192F] group-hover:text-[#D4AF37] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                          {project.shortDescription}
                        </p>
                        <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-100 mt-auto">
                          {project.location && (
                            <span className="flex items-center text-muted-foreground">
                              <svg className="w-4 h-4 mr-1 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {project.location}
                            </span>
                          )}
                          {project.year && <span className="font-semibold text-[#D4AF37]">{project.year}</span>}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
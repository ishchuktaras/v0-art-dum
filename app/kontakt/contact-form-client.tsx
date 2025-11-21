"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { submitInquiry } from "./actions"
import { useState } from "react"
import { ChevronRight, ChevronLeft, Home, Building2, Calendar } from "lucide-react"

const SERVICE_CATEGORIES = [
  {
    id: "zednicke",
    name: "Zednické práce",
    items: [
      "Výstavba příček",
      "Bourání zdí",
      "Omítky klasické",
      "Omítky stěrkové",
      "Ekologické omítky KEIM",
      "Dekorativní stěrky",
    ],
  },
  {
    id: "podlahy",
    name: "Podlahy",
    items: ["Laminátové", "Vinylové (SPC)", "Dřevěné (masiv, dub)", "Dlažba", "Betonové stěrky", "Epoxidové podlahy"],
  },
  {
    id: "stropy",
    name: "Stropy",
    items: ["SDK podhled", "Napínané stropy", "Kazetové stropy", "Zateplení stropu"],
  },
  {
    id: "montaze",
    name: "Montáže",
    items: ["Výměna dveří", "Instalace oken", "Kuchyňské linky", "Vestavěné skříně", "Montáž osvětlení"],
  },
  {
    id: "zemni",
    name: "Zemní práce",
    items: ["Výkopy", "Terénní úpravy", "Přípojky", "Základové práce"],
  },
  {
    id: "fasady",
    name: "Fasády",
    items: ["Zateplení fasády", "Minerální omítky", "Silikátové omítky", "Sanace fasády", "Nátěry KEIM"],
  },
  {
    id: "strechy",
    name: "Střechy",
    items: ["Výměna krytiny", "Opravy střech", "Klempířské práce", "Odvodnění"],
  },
  {
    id: "zahrada",
    name: "Zahradní úpravy",
    items: ["Terasy", "Dlažba venkovní", "Ploty a oplocení", "Zahradní domky"],
  },
  {
    id: "kominy",
    name: "Komíny",
    items: ["Výstavba komínů", "Sanace komínů", "Revize a opravy"],
  },
  {
    id: "zaklady",
    name: "Základy",
    items: ["Betonáž základů", "Izolace", "Drenáže"],
  },
  {
    id: "dalsi",
    name: "Další služby",
    items: ["Oplocení", "Venkovní schodiště", "Sklepy", "Garáže"],
  },
  {
    id: "svarecske",
    name: "Svářečské práce",
    items: ["Kovové konstrukce", "Zábradlí", "Brány a branky", "Opravy a svařování"],
  },
]

export function ContactFormClient() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const [formData, setFormData] = useState({
    // Krok 1: Kontaktní údaje
    name: "",
    phone: "",
    email: "",

    // Krok 2: Typ projektu a služby
    projectType: "",
    services: [] as string[],
    serviceDetails: {} as Record<string, string[]>,

    // Krok 3: Detaily projektu
    propertyType: "",
    propertySize: "",
    location: "",

    // Krok 4: Časový rámec a rozpočet
    timeline: "",
    budget: "",

    // Krok 5: Doplňující informace
    additionalInfo: "",
    gdpr: false,
  })

  const handleServiceToggle = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(categoryId)
        ? prev.services.filter((s) => s !== categoryId)
        : [...prev.services, categoryId],
    }))
  }

  const handleServiceDetailToggle = (categoryId: string, item: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceDetails: {
        ...prev.serviceDetails,
        [categoryId]: prev.serviceDetails[categoryId]?.includes(item)
          ? prev.serviceDetails[categoryId].filter((i) => i !== item)
          : [...(prev.serviceDetails[categoryId] || []), item],
      },
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const submissionData = new FormData()
      submissionData.append("name", formData.name)
      submissionData.append("phone", formData.phone)
      submissionData.append("email", formData.email)
      submissionData.append("projectType", formData.projectType)
      submissionData.append("propertyType", formData.propertyType)
      submissionData.append("propertySize", formData.propertySize)
      submissionData.append("location", formData.location)
      submissionData.append("timeline", formData.timeline)
      submissionData.append("budget", formData.budget)

      // Formátování služeb a detailů
      const servicesText = formData.services
        .map((categoryId) => {
          const category = SERVICE_CATEGORIES.find((c) => c.id === categoryId)
          const details = formData.serviceDetails[categoryId] || []
          return `${category?.name}: ${details.length > 0 ? details.join(", ") : "Nespecifikováno"}`
        })
        .join("\n")

      const fullMessage = `
POŽADOVANÉ SLUŽBY:
${servicesText}

TYP PROJEKTU: ${formData.projectType}
TYP NEMOVITOSTI: ${formData.propertyType}
VELIKOST: ${formData.propertySize}
LOKALITA: ${formData.location}
ČASOVÝ RÁMEC: ${formData.timeline}
ROZPOČET: ${formData.budget}

DOPLŇUJÍCÍ INFORMACE:
${formData.additionalInfo}
      `.trim()

      submissionData.append("message", fullMessage)
      submissionData.append("service", formData.services.join(", "))

      const result = await submitInquiry(submissionData)

      if (result.success) {
        setMessage({
          type: "success",
          text: "Děkujeme! Vaše poptávka byla úspěšně odeslána. Ozveme se vám do 24 hodin.",
        })
        setStep(1)
        setFormData({
          name: "",
          phone: "",
          email: "",
          projectType: "",
          services: [],
          serviceDetails: {},
          propertyType: "",
          propertySize: "",
          location: "",
          timeline: "",
          budget: "",
          additionalInfo: "",
          gdpr: false,
        })
      } else {
        setMessage({
          type: "error",
          text: result.error || "Nastala chyba při odesílání. Zkuste to prosím znovu.",
        })
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Nastala chyba při odesílání. Zkuste to prosím znovu.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name && formData.phone && formData.email
      case 2:
        return formData.services.length > 0
      case 3:
        return formData.propertyType && formData.location
      case 4:
        return formData.timeline && formData.budget
      case 5:
        return formData.gdpr
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>Odpovíme do 24 hodin</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">Kontaktujte nás</h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
                Pošlete nám nezávaznou poptávku. Odpovíme do 24 hodin s cenovou nabídkou přesně na míru vašim potřebám.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {message && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    message.type === "success"
                      ? "bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-200"
                      : "bg-red-50 border border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-red-200"
                  }`}
                >
                  <p className="font-medium">{message.text}</p>
                </div>
              )}

              <Card className="border-2 border-border shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-3xl font-black text-foreground">Nezávazná poptávka</CardTitle>
                    <span className="text-sm font-semibold text-muted-foreground">Krok {step} z 5</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gold h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(step / 5) * 100}%` }}
                    />
                  </div>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Krok 1: Kontaktní údaje */}
                    {step === 1 && (
                      <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="text-center mb-6">
                          <h3 className="text-2xl font-bold text-foreground mb-2">Kontaktní údaje</h3>
                          <p className="text-muted-foreground">Jak se s vámi můžeme spojit?</p>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Jméno a příjmení *</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Jan Novák"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="phone">Telefon *</Label>
                              <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+420 xxx xxx xxx"
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email">Email *</Label>
                              <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="vas@email.cz"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Krok 2: Výběr služeb */}
                    {step === 2 && (
                      <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="text-center mb-6">
                          <h3 className="text-2xl font-bold text-foreground mb-2">Jaké služby potřebujete?</h3>
                          <p className="text-muted-foreground">Vyberte jednu nebo více kategorií</p>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2 mb-6">
                            <Label>Typ projektu</Label>
                            <RadioGroup
                              value={formData.projectType}
                              onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="rekonstrukce" id="rekonstrukce" />
                                <Label htmlFor="rekonstrukce" className="font-normal cursor-pointer">
                                  Rekonstrukce / Renovace
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="novostavba" id="novostavba" />
                                <Label htmlFor="novostavba" className="font-normal cursor-pointer">
                                  Novostavba
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="opravy" id="opravy" />
                                <Label htmlFor="opravy" className="font-normal cursor-pointer">
                                  Opravy a údržba
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="komercni" id="komercni" />
                                <Label htmlFor="komercni" className="font-normal cursor-pointer">
                                  Komerční prostory
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div className="space-y-4">
                            <Label className="text-base">Kategorie služeb *</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {SERVICE_CATEGORIES.map((category) => (
                                <div key={category.id} className="space-y-3">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id={category.id}
                                      checked={formData.services.includes(category.id)}
                                      onCheckedChange={() => handleServiceToggle(category.id)}
                                    />
                                    <Label htmlFor={category.id} className="font-semibold cursor-pointer">
                                      {category.name}
                                    </Label>
                                  </div>

                                  {formData.services.includes(category.id) && (
                                    <div className="ml-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
                                      {category.items.map((item) => (
                                        <div key={item} className="flex items-center space-x-2">
                                          <Checkbox
                                            id={`${category.id}-${item}`}
                                            checked={formData.serviceDetails[category.id]?.includes(item)}
                                            onCheckedChange={() => handleServiceDetailToggle(category.id, item)}
                                          />
                                          <Label
                                            htmlFor={`${category.id}-${item}`}
                                            className="font-normal text-sm cursor-pointer text-muted-foreground"
                                          >
                                            {item}
                                          </Label>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Krok 3: Detaily projektu */}
                    {step === 3 && (
                      <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="text-center mb-6">
                          <Home className="w-12 h-12 mx-auto text-gold mb-3" />
                          <h3 className="text-2xl font-bold text-foreground mb-2">Detaily projektu</h3>
                          <p className="text-muted-foreground">Řekněte nám více o vaší nemovitosti</p>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Typ nemovitosti *</Label>
                            <RadioGroup
                              value={formData.propertyType}
                              onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                            >
                              <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="byt" id="byt" />
                                  <Label htmlFor="byt" className="font-normal cursor-pointer">
                                    Byt
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="dum" id="dum" />
                                  <Label htmlFor="dum" className="font-normal cursor-pointer">
                                    Rodinný dům
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="komercni" id="komercni-property" />
                                  <Label htmlFor="komercni-property" className="font-normal cursor-pointer">
                                    Komerční prostor
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="jine" id="jine" />
                                  <Label htmlFor="jine" className="font-normal cursor-pointer">
                                    Jiné
                                  </Label>
                                </div>
                              </div>
                            </RadioGroup>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="propertySize">Velikost (m²)</Label>
                            <Input
                              id="propertySize"
                              type="text"
                              value={formData.propertySize}
                              onChange={(e) => setFormData({ ...formData, propertySize: e.target.value })}
                              placeholder="např. 80 m²"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="location">Lokalita *</Label>
                            <Input
                              id="location"
                              value={formData.location}
                              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                              placeholder="např. Třebíč, Jihlava, okolí Vysočiny"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Krok 4: Časový rámec a rozpočet */}
                    {step === 4 && (
                      <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="text-center mb-6">
                          <Calendar className="w-12 h-12 mx-auto text-gold mb-3" />
                          <h3 className="text-2xl font-bold text-foreground mb-2">Časový rámec a rozpočet</h3>
                          <p className="text-muted-foreground">Pomozte nám naplánovat váš projekt</p>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Kdy chcete začít? *</Label>
                            <RadioGroup
                              value={formData.timeline}
                              onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="co-nejdrive" id="co-nejdrive" />
                                <Label htmlFor="co-nejdrive" className="font-normal cursor-pointer">
                                  Co nejdříve
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="1-mesic" id="1-mesic" />
                                <Label htmlFor="1-mesic" className="font-normal cursor-pointer">
                                  Do 1 měsíce
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="1-3-mesice" id="1-3-mesice" />
                                <Label htmlFor="1-3-mesice" className="font-normal cursor-pointer">
                                  1-3 měsíce
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="3-6-mesicu" id="3-6-mesicu" />
                                <Label htmlFor="3-6-mesicu" className="font-normal cursor-pointer">
                                  3-6 měsíců
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="planuji" id="planuji" />
                                <Label htmlFor="planuji" className="font-normal cursor-pointer">
                                  Zatím pouze plánuji
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div className="space-y-2">
                            <Label>Orientační rozpočet *</Label>
                            <RadioGroup
                              value={formData.budget}
                              onValueChange={(value) => setFormData({ ...formData, budget: value })}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="do-100k" id="do-100k" />
                                <Label htmlFor="do-100k" className="font-normal cursor-pointer">
                                  Do 100 000 Kč
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="100-300k" id="100-300k" />
                                <Label htmlFor="100-300k" className="font-normal cursor-pointer">
                                  100 000 - 300 000 Kč
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="300-500k" id="300-500k" />
                                <Label htmlFor="300-500k" className="font-normal cursor-pointer">
                                  300 000 - 500 000 Kč
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="500k-1m" id="500k-1m" />
                                <Label htmlFor="500k-1m" className="font-normal cursor-pointer">
                                  500 000 - 1 000 000 Kč
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="nad-1m" id="nad-1m" />
                                <Label htmlFor="nad-1m" className="font-normal cursor-pointer">
                                  Nad 1 000 000 Kč
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="nevim" id="nevim" />
                                <Label htmlFor="nevim" className="font-normal cursor-pointer">
                                  Nevím / Potřebuji poradit
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Krok 5: Doplňující informace */}
                    {step === 5 && (
                      <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="text-center mb-6">
                          <Building2 className="w-12 h-12 mx-auto text-gold mb-3" />
                          <h3 className="text-2xl font-bold text-foreground mb-2">Doplňující informace</h3>
                          <p className="text-muted-foreground">Máte ještě něco, co bychom měli vědět?</p>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="additionalInfo">Další informace (volitelné)</Label>
                            <Textarea
                              id="additionalInfo"
                              value={formData.additionalInfo}
                              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                              placeholder="Popište podrobněji váš projekt, specifické požadavky, materiály, které preferujete, nebo jakékoliv otázky..."
                              rows={6}
                            />
                          </div>

                          <div className="flex items-start space-x-2 p-4 bg-muted/50 rounded-lg">
                            <Checkbox
                              id="gdpr"
                              checked={formData.gdpr}
                              onCheckedChange={(checked) => setFormData({ ...formData, gdpr: checked as boolean })}
                              required
                            />
                            <Label htmlFor="gdpr" className="text-sm font-normal leading-relaxed cursor-pointer">
                              Souhlasím se zpracováním osobních údajů pro účely zaslání cenové nabídky v souladu s{" "}
                              <a href="/gdpr" className="text-gold hover:underline font-medium">
                                GDPR
                              </a>
                              . *
                            </Label>
                          </div>
                        </div>

                        <div className="bg-gold/10 border border-gold/20 rounded-lg p-6 mt-6">
                          <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Co se stane po odeslání?
                          </h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <span className="text-gold">•</span>
                              <span>Vaši poptávku zpracujeme do 24 hodin</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gold">•</span>
                              <span>Připravíme cenovou nabídku přesně na míru</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gold">•</span>
                              <span>Kontaktujeme vás pro případné upřesnění</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-gold">•</span>
                              <span>Domluvíme si schůzku nebo obhlídku místa</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Navigation buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-border">
                      {step > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={prevStep}
                          className="flex items-center gap-2 bg-transparent"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Zpět
                        </Button>
                      )}

                      {step < 5 ? (
                        <Button
                          type="button"
                          onClick={nextStep}
                          disabled={!isStepValid()}
                          className="ml-auto bg-gold text-white hover:bg-gold/90 flex items-center gap-2"
                        >
                          Pokračovat
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          disabled={isSubmitting || !isStepValid()}
                          className="ml-auto bg-gold text-white hover:bg-gold/90 font-bold"
                        >
                          {isSubmitting ? "Odesílám..." : "Odeslat poptávku"}
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Contact sidebar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <Card className="border-2 border-border">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-foreground">Kontaktní údaje</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Telefon</p>
                        <a href="tel:+420774335592" className="text-gold hover:underline">
                          +420 774 335 592
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Email</p>
                        <a href="mailto:firma@artdum.cz" className="text-gold hover:underline">
                          firma@artdum.cz
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Adresa</p>
                        <p className="text-sm text-muted-foreground">Karlovo nám 44/33, Třebíč</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gold/20 bg-gold/5">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-foreground">Pracovní doba</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Po – Pá:</span>
                        <span className="font-semibold text-foreground">7:00 – 17:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">So:</span>
                        <span className="font-semibold text-foreground">8:00 – 12:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">IČO:</span>
                        <span className="font-semibold text-foreground">22401261</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-black text-foreground mb-12 text-center">Kde nás najdete</h2>
            <div className="aspect-video w-full max-w-5xl mx-auto bg-muted rounded-2xl overflow-hidden shadow-2xl border-2 border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2611.7!2d15.8815!3d49.2141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDEyJzUwLjgiTiAxNcKwNTInNTMuNCJF!5e0!3m2!1scs!2scz!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa ART DUM"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { submitInquiry } from "./actions"
import { useState } from "react"

export function ContactFormClient() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await submitInquiry(formData)

      if (result.success) {
        setMessage({
          type: "success",
          text: "Děkujeme! Vaše poptávka byla úspěšně odeslána. Ozveme se vám do 24 hodin.",
        })
        // Reset form
        const form = document.querySelector("form") as HTMLFormElement
        form?.reset()
      } else {
        setMessage({
          type: "error",
          text: result.error || "Nastala chyba při odesílání. Zkuste to prosím znovu nebo nás kontaktujte telefonicky.",
        })
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Nastala chyba při odesílání. Zkuste to prosím znovu nebo nás kontaktujte telefonicky.",
      })
    } finally {
      setIsSubmitting(false)
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Odpovíme do 24 hodin</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">Kontaktujte nás</h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
                Máte dotaz nebo chcete nezávaznou cenovou nabídku? Rádi si s vámi promluvíme o vašem projektu.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="border-2 border-gray-100 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-3xl font-black text-navy">Poptávkový formulář</CardTitle>
                    <CardDescription className="text-lg">Vyplňte formulář a my se vám ozveme do 24 hodin</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {message && (
                      <div
                        className={`mb-6 p-4 rounded-lg ${
                          message.type === "success"
                            ? "bg-green-50 border border-green-200 text-green-800"
                            : "bg-red-50 border border-red-200 text-red-800"
                        }`}
                      >
                        <p className="font-medium">{message.text}</p>
                      </div>
                    )}

                    <form action={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Jméno a příjmení *</Label>
                          <Input id="name" name="name" placeholder="Jan Novák" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefon *</Label>
                          <Input id="phone" name="phone" type="tel" placeholder="+420 xxx xxx xxx" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" name="email" type="email" placeholder="vas@email.cz" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="service">Typ služby</Label>
                        <select
                          id="service"
                          name="service"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="">Vyberte službu...</option>
                          <option value="rekonstrukce">Rekonstrukce</option>
                          <option value="stavba">Stavba na klíč</option>
                          <option value="zednicke">Zednické práce</option>
                          <option value="zatepleni">Zateplení</option>
                          <option value="opravy">Opravy a údržba</option>
                          <option value="komercni">Komerční prostory</option>
                          <option value="jine">Jiné</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Zpráva *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Popište váš projekt... Co potřebujete realizovat? Jaký je odhadovaný termín?"
                          rows={6}
                          required
                        />
                      </div>

                      <div className="flex items-start space-x-2">
                        <input type="checkbox" id="gdpr" name="gdpr" className="mt-1" required />
                        <Label htmlFor="gdpr" className="text-sm text-muted-foreground font-normal leading-relaxed">
                          Souhlasím se zpracováním osobních údajů pro účely zaslání cenové nabídky v souladu s{" "}
                          <a href="/gdpr" className="text-gold hover:underline">
                            GDPR
                          </a>
                          .
                        </Label>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full md:w-auto bg-gold text-primary-dark hover:bg-gold/90 font-bold disabled:opacity-50"
                      >
                        {isSubmitting ? "Odesílám..." : "Odeslat poptávku"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-2 border-gray-100 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black text-navy">Kontaktní údaje</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start space-x-4 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold/80 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-gold/20 group-hover:scale-110 transition-transform">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-navy mb-1">Telefon</p>
                        <a href="tel:+420774335592" className="text-gray-600 hover:text-gold transition-colors font-semibold">
                          +420 774 335 592
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold/80 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-gold/20 group-hover:scale-110 transition-transform">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-navy mb-1">Email</p>
                        <a
                          href="mailto:firma@artdum.cz"
                          className="text-gray-600 hover:text-gold transition-colors font-semibold"
                        >
                          firma@artdum.cz
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold/80 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-gold/20 group-hover:scale-110 transition-transform">
                        <svg
                          className="w-6 h-6 text-white"
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
                      </div>
                      <div>
                        <p className="font-bold text-navy mb-1">Adresa</p>
                        <p className="text-gray-600 font-semibold">
                          Karlovo nám 44/33
                          <br />
                          674 01 Třebíč
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold/80 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-gold/20 group-hover:scale-110 transition-transform">
                        <svg
                          className="w-6 h-6 text-white"
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
                      </div>
                      <div>
                        <p className="font-bold text-navy mb-1">Pracovní doba</p>
                        <p className="text-gray-600 font-semibold">
                          Po–Pá: 7:00 – 17:00
                          <br />
                          So: 8:00 – 12:00
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gold/20 shadow-xl bg-gradient-to-br from-gold/5 to-transparent">
                  <CardHeader>
                    <CardTitle className="text-xl font-black text-navy">IČO</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 font-bold text-lg">22401261</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-black text-navy mb-12 text-center">Kde nás najdete</h2>
            <div className="aspect-video w-full max-w-5xl mx-auto bg-gray-200 rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-100">
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

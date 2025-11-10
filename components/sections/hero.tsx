import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HeroProps {
  title: string
  subtitle: string
  primaryCta?: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
}

export function Hero({ title, subtitle, primaryCta, secondaryCta }: HeroProps) {
  return (
    <section className="relative bg-primary-dark text-primary-foreground py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1
            className="text-4xl md:text-6xl font-black mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p className="text-lg md:text-xl mb-8 text-muted-foreground leading-relaxed">{subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            {primaryCta && (
              <Link href={primaryCta.href}>
                <Button size="lg" className="bg-gold text-primary-dark hover:bg-gold/90 font-bold">
                  {primaryCta.text}
                </Button>
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.href}>
                <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold/10 bg-transparent">
                  {secondaryCta.text}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

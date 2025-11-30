import type { Image } from "sanity"
import { dataset, projectId } from "../env"

/* -----------------------------------------------------------
  ŘEŠENÍ BEZ KNIHOVNY (MANUÁLNÍ PARSOVÁNÍ)
  Protože @sanity/image-url zlobí v Next.js 16, sestavíme
  si URL ručně. Sanity ID má formát:
  image-<id>-<width>x<height>-<format>
  -----------------------------------------------------------
*/

const buildUrl = (source: Image, params: Record<string, any> = {}) => {
  // Bezpečnostní kontrola na začátku
  if (!source?.asset?._ref && !(source?.asset as any)?.url) {
    return undefined
  }

  // 1. Pokud už máme hotovou URL (z GROQ query), vrátíme ji
  if ((source?.asset as any)?.url) {
    return (source.asset as any).url
  }

  // 2. Parsování Sanity Reference (_ref)
  // OPRAVA: Použijeme ?. pro bezpečný přístup k assetu
  const ref = source?.asset?._ref
  
  // Pokud ref náhodou neexistuje, vrátíme undefined (pro TypeScript)
  if (!ref) {
    return undefined
  }

  // Očekáváme formát: "image-Tb9E...-2000x3000-jpg"
  const parts = ref.split("-")
  
  if (parts.length !== 4) {
    console.error("Neplatné Sanity ID obrázku:", ref)
    return undefined
  }

  const [, assetId, dimensions, format] = parts

  // 3. Sestavení základní URL
  // https://cdn.sanity.io/images/<projectId>/<dataset>/<assetId>-<dimensions>.<format>
  const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}-${dimensions}.${format}`

  // 4. Přidání parametrů (?w=100&h=100...)
  const searchParams = new URLSearchParams()
  
  if (params.width) searchParams.set("w", params.width)
  if (params.height) searchParams.set("h", params.height)
  if (params.quality) searchParams.set("q", params.quality)
  if (params.format) searchParams.set("fm", params.format)
  if (params.blur) searchParams.set("blur", params.blur)
  if (params.fit) searchParams.set("fit", params.fit)

  const queryString = searchParams.toString()
  return queryString ? `${baseUrl}?${queryString}` : baseUrl
}

// -----------------------------------------------------------
// EXPORTY PRO APLIKACI
// (Upravené tak, aby nepoužívaly builder, ale naši funkci)
// -----------------------------------------------------------

export const urlForImage = (source: Image | undefined, width?: number, height?: number) => {
  return buildUrl(source as Image, { 
    width: width, 
    height: height,
    fit: 'crop' // Aby se fotka hezky ořízla, když zadáte rozměry
  })
}

export const urlForHeroImage = (source: Image | undefined) => {
  if (!source) return undefined
  
  // Hero obrázek: 1920x1080, webp, crop
  return buildUrl(source, {
    width: 1920,
    height: 1080,
    quality: 75,
    format: "webp",
    fit: "crop"
  })
}

export const urlForBlurPlaceholder = (source: Image | undefined) => {
  // Rozmazaný placeholder
  return buildUrl(source as Image, {
    width: 40,
    height: 30,
    quality: 10,
    format: "webp",
    blur: 50
  })
}

// Pro zpětnou kompatibilitu
export const urlFor = urlForImage
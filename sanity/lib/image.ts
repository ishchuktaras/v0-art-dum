import createImageUrlBuilder from "@sanity/image-url"
import type { Image } from "sanity"

import { dataset, projectId } from "../env"

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
})

export const urlForImage = (source: Image | undefined) => {
  if (!source?.asset?._ref) {
    return undefined
  }

  return imageBuilder.image(source).auto("format").fit("max")
}

export const urlForHeroImage = (source: Image | undefined) => {
  if (!source?.asset?._ref) {
    return undefined
  }

  return imageBuilder.image(source).width(1920).height(1080).quality(75).format("webp").fit("crop").url()
}

// export const urlForHeroImageMobile = (source: Image | undefined) => {
//   if (!source?.asset?._ref) {
//     return undefined
//   }

//   return imageBuilder.image(source).width(768).height(600).quality(80).format("webp").fit("crop").url()
// }

// export const urlForHeroImageTablet = (source: Image | undefined) => {
//   if (!source?.asset?._ref) {
//     return undefined
//   }

//   return imageBuilder.image(source).width(1280).height(800).quality(80).format("webp").fit("crop").url()
// }

export const urlForBlurPlaceholder = (source: Image | undefined) => {
  if (!source?.asset?._ref) {
    return undefined
  }

  return imageBuilder.image(source).width(40).height(30).quality(10).format("webp").blur(50).url()
}

export const urlFor = urlForImage

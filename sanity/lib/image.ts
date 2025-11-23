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

  return imageBuilder.image(source).width(1920).height(1080).quality(85).format("webp").fit("crop").auto("format").url()
}

export const urlFor = urlForImage

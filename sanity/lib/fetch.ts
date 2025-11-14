import "server-only"

import { draftMode } from "next/headers"
import { client } from "./client"

const DEFAULT_PARAMS = {} as Record<string, string>
const DEFAULT_TAGS = [] as string[]

async function isDraftModeEnabled(): Promise<boolean> {
  try {
    const draft = await draftMode()
    return draft.isEnabled
  } catch {
    // During static generation, draftMode is not available
    return false
  }
}

export async function sanityFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
}: {
  query: string
  params?: Record<string, string>
  tags?: string[]
}): Promise<QueryResponse> {
  const isDraftMode = await isDraftModeEnabled()

  if (isDraftMode && !client.config().token) {
    throw new Error("Missing SANITY_API_TOKEN for draft mode")
  }

  const perspective = isDraftMode ? "previewDrafts" : "published"

  return client.fetch<QueryResponse>(query, params, {
    cache: isDraftMode ? undefined : "force-cache",
    next: {
      tags,
      revalidate: isDraftMode ? 0 : 3600,
    },
    perspective,
    useCdn: !isDraftMode,
    stega: isDraftMode,
  })
}

export async function sanityFetchStatic<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
}: {
  query: string
  params?: Record<string, string>
  tags?: string[]
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params, {
    cache: "force-cache",
    next: {
      tags,
      revalidate: 3600,
    },
    perspective: "published",
    useCdn: true,
  })
}

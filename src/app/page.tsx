// ... existing code ...

import { createImageUrlBuilder } from "sanity";

const imageBuilder = createImageUrlBuilder({
  projectId: process.env.SANITY_PROJECT_ID || "",
  dataset: process.env.SANITY_DATASET,
});

// ... rest of page.tsx ...
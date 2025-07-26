import type { CollectionConfig } from "payload"

export const Media: CollectionConfig = {
   slug: "media",
   upload: {
      staticDir: "media",
      formatOptions: {
         format: "webp",
         options: {
            quality: 80,
         },
      },
      mimeTypes: ["image/*"],
   },
   fields: [
      {
         name: "alt",
         type: "text",
         required: true,
         label: "Alt Text",
         admin: {
            description: "Alternative text for accessibility and SEO",
         },
      },
   ],
}

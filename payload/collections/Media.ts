import { payloadAccess } from "@/utils/payload-access"
import type { CollectionConfig } from "payload"

export const Media: CollectionConfig = {
   slug: "media",
   access: payloadAccess({ isPublic: true }),
   upload: {
      staticDir: "media",
      mimeTypes: ["image/*", "image/gif", "video/*"],
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

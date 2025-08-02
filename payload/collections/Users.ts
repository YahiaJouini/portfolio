import { payloadAccess } from "@/utils/payload-access"
import type { CollectionConfig } from "payload"

export const Users: CollectionConfig = {
   slug: "users",
   auth: {
      maxLoginAttempts: 5,
      lockTime: 600 * 1000,
   },
   admin: {
      useAsTitle: "email",
   },
   access: payloadAccess({ isPublic: false }),
   fields: [
      {
         name: "role",
         type: "select",
         required: true,
         defaultValue: "admin",
         options: [
            {
               label: "Admin",
               value: "admin",
            },
         ],
         access: {
            // Only admins can change roles
            update: ({ req: { user } }) => user?.role === "admin",
         },
      },
   ],
}

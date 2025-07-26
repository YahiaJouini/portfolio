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
   access: {
      create: ({ req: { user } }) => {
         return user?.role === "admin"
      },
      read: ({ req: { user } }) => {
         if (user?.role === "admin") return true
         return {
            id: {
               equals: user?.id,
            },
         }
      },
      update: ({ req: { user } }) => {
         return user?.role === "admin"
      },
      delete: ({ req: { user } }) => {
         return user?.role === "admin"
      },
   },
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

import { Access, PayloadRequest } from "payload"

// only admin users can modify any of the collections
export const payloadAccess = (options?: {
   public: boolean
}): {
   admin?: ({ req }: { req: PayloadRequest }) => boolean | Promise<boolean>
   create?: Access
   delete?: Access
   read?: Access
   readVersions?: Access
   unlock?: Access
   update?: Access
} => {
   return {
      read: ({ req: { user } }) => {
         if (options && options.public) return true
         return user?.role === "admin"
      },
      create: ({ req: { user } }) => user?.role === "admin",
      update: ({ req: { user } }) => user?.role === "admin",
      delete: ({ req: { user } }) => user?.role === "admin",
   }
}

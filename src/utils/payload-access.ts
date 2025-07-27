import { CacheFn } from "@/services/project"
import { Access, PayloadRequest } from "payload"

type BaseOptions = {
   public: boolean
   clearCacheFn?: (options: CacheFn) => void
}

// only admin users can modify any of the collections
export const payloadAccess = (
   options: BaseOptions,
): {
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

      update: ({ req: { user, data, locale } }) => {
         if (user?.role === "admin") {
            if (options.clearCacheFn && data?.slug) {
               const resolvedLocale = locale !== "all" ? locale : undefined
               options.clearCacheFn({
                  locale: resolvedLocale,
                  slug: data.slug,
               })
            }
            return true
         }
         return false
      },
      delete: ({ req: { user, data, locale } }) => {
         if (user?.role === "admin") {
            if (options.clearCacheFn && data?.slug) {
               const resolvedLocale = locale !== "all" ? locale : undefined
               options.clearCacheFn({
                  locale: resolvedLocale,
                  slug: data.slug,
               })
            }
            return true
         }
         return false
      },
   }
}

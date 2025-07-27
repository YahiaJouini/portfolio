import { ProjectService } from "@/services/project"
import { Access, PayloadRequest } from "payload"

type PayloadAccess = {
   admin?: ({ req }: { req: PayloadRequest }) => boolean | Promise<boolean>
   create?: Access
   delete?: Access
   read?: Access
   readVersions?: Access
   unlock?: Access
   update?: Access
}

// only admin users can modify any of the collections
export const payloadAccess = ({
   isPublic = true,
}: {
   isPublic?: boolean
}): PayloadAccess => {
   return {
      read: ({ req: { user } }) => {
         if (isPublic) return true
         return user?.role === "admin"
      },
      create: ({ req: { user } }) => user?.role === "admin",

      update: ({ req: { user } }) => user?.role === "admin",
      delete: ({ req: { user } }) => user?.role === "admin",
   }
}

export const projectPayloadAccess = (): PayloadAccess => {
   return {
      read: () => true,
      create: ({ req: { user, data, locale } }) => {
         if (user?.role === "admin") {
            ProjectService.clearProjectsListCache()
            if (data?.slug) {
               const resolvedLocale = locale !== "all" ? locale : undefined
               ProjectService.clearProjectCache({
                  slug: data.slug,
                  locale: resolvedLocale,
               })
            }
            return true
         }
         return false
      },

      update: ({ req: { user, data, locale } }) => {
         if (user?.role === "admin") {
            ProjectService.clearProjectsListCache()
            if (data?.slug) {
               const resolvedLocale = locale !== "all" ? locale : undefined
               ProjectService.clearProjectCache({
                  slug: data.slug,
                  locale: resolvedLocale,
               })
            }
            return true
         }
         return false
      },
      delete: ({ req: { user, data, locale } }) => {
         if (user?.role === "admin") {
            ProjectService.clearProjectsListCache()
            if (data?.slug) {
               const resolvedLocale = locale !== "all" ? locale : undefined
               ProjectService.clearProjectCache({
                  slug: data.slug,
                  locale: resolvedLocale,
               })
            }
            return true
         }
         return false
      },
   }
}

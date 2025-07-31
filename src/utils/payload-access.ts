import { User } from "@/payload-types"
import { BlogService } from "@/services/blog"
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

type UserType =
   | (User & {
        collection: "users"
     })
   | null
   | undefined

const isAdmin = (user: UserType): boolean => user?.role === "admin"

export const payloadAccess = ({
   isPublic = true,
}: {
   isPublic?: boolean
}): PayloadAccess => {
   return {
      read: ({ req: { user } }) => isPublic || isAdmin(user),
      create: ({ req: { user } }) => isAdmin(user),
      update: ({ req: { user } }) => isAdmin(user),
      delete: ({ req: { user } }) => isAdmin(user),
   }
}

export const projectPayloadAccess = (): PayloadAccess => {
   const handleProjectAccess: Access = ({ req: { user, data, locale } }) => {
      if (!isAdmin(user)) return false

      // means an action happened
      if (data?.slug) {
         ProjectService.clearProjectsListCache()
         const resolvedLocale = locale !== "all" ? locale : undefined
         ProjectService.clearProjectCache({
            slug: data.slug,
            locale: resolvedLocale,
         })
      }
      return true
   }

   return {
      read: () => true,
      create: handleProjectAccess,
      update: handleProjectAccess,
      delete: handleProjectAccess,
   }
}

export const blogPayloadAccess = (): PayloadAccess => {
   const handleBlogAccess: Access = ({ req: { user, data } }) => {
      if (!isAdmin(user)) return false

      // means an action happened
      if (data) {
         BlogService.clearCache()
      }
      return true
   }

   return {
      read: () => true,
      create: handleBlogAccess,
      update: handleBlogAccess,
      delete: handleBlogAccess,
   }
}

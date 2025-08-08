import { User } from "@/payload-types"
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

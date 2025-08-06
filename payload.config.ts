import { sqliteAdapter } from "@payloadcms/db-sqlite"

import { cloudStoragePlugin } from "@payloadcms/plugin-cloud-storage"
import {
   defaultEditorFeatures,
   FixedToolbarFeature,
   lexicalEditor,
} from "@payloadcms/richtext-lexical"
import path from "path"
import { buildConfig } from "payload"
import sharp from "sharp"
import { fileURLToPath } from "url"

import { cloudinaryAdapter, generateFileURL } from "@/lib/cloudinary"
import {
   ADMIN_EMAIL,
   ADMIN_PASSWORD,
   DATABASE_AUTH_TOKEN,
   DATABASE_URL,
   PAYLOAD_SECRET,
} from "@/utils/env"
import { Blog } from "./payload/collections/Blog"
import { Media } from "./payload/collections/Media"
import { Projects } from "./payload/collections/Projects"
import { Users } from "./payload/collections/Users"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const config = buildConfig({
   localization: {
      defaultLocale: "en",
      locales: [
         {
            label: "English",
            code: "en",
            fallbackLocale: "en",
         },
         {
            label: "Arabic",
            code: "ar",
            rtl: true,
            fallbackLocale: "en",
         },
         {
            label: "French",
            code: "fr",
            fallbackLocale: "en",
         },
      ],
      fallback: true,
   },
   admin: {
      importMap: {
         baseDir: path.resolve(dirname),
      },
      user: Users.slug,
   },
   collections: [Media, Users, Projects, Blog],
   editor: lexicalEditor({
      features: [...defaultEditorFeatures, FixedToolbarFeature()],
   }),
   secret: PAYLOAD_SECRET,
   typescript: {
      outputFile: path.resolve(dirname, "src/payload-types.ts"),
   },
   db: sqliteAdapter({
      client: {
         url: DATABASE_URL,
         authToken: DATABASE_AUTH_TOKEN,
      },
      migrationDir: path.resolve(dirname, "migrations"),
   }),
   sharp,
   plugins: [
      cloudStoragePlugin({
         collections: {
            media: {
               adapter: cloudinaryAdapter,

               disableLocalStorage: true, // Prevent Payload from saving files to disk
               generateFileURL,
            },
         },
      }),
   ],
   onInit: async (payload) => {
      // create initial admin user if it doesn't exist
      const existingUsers = await payload.find({
         collection: "users",
         limit: 1,
         depth: 1,
      })

      if (existingUsers.docs.length === 0) {
         await payload.create({
            collection: "users",
            data: {
               email: ADMIN_EMAIL,
               password: ADMIN_PASSWORD,
               role: "admin",
            },
         })
      }
   },
})

export default config

import { sqliteAdapter } from "@payloadcms/db-sqlite"

import {
   defaultEditorFeatures,
   FixedToolbarFeature,
   lexicalEditor,
} from "@payloadcms/richtext-lexical"
import path from "path"
import { buildConfig } from "payload"
import sharp from "sharp"
import { fileURLToPath } from "url"

import {
   ADMIN_EMAIL,
   ADMIN_PASSWORD,
   DATABASE_URI,
   PAYLOAD_SECRET,
} from "@/utils/constants"
import { Media } from "./collections/Media"
import { Projects } from "./collections/Projects"
import { Users } from "./collections/Users"

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
   collections: [Media, Users, Projects],
   editor: lexicalEditor({
      features: [...defaultEditorFeatures, FixedToolbarFeature()],
   }),
   secret: PAYLOAD_SECRET,
   typescript: {
      outputFile: path.resolve(dirname, "payload-types.ts"),
   },
   db: sqliteAdapter({
      client: {
         url: DATABASE_URI || path.resolve(dirname, "data.db"),
      },
      migrationDir: path.resolve(dirname, "migrations"),
   }),
   sharp,
   plugins: [],
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

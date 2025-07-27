import { z } from "zod"

const envSchema = z.object({
   GITHUB_TOKEN: z.string().nonempty(),
   PAYLOAD_SECRET: z.string().nonempty(),
   DATABASE_URI: z.string().nonempty(),
   ADMIN_EMAIL: z.email().nonempty(),
   ADMIN_PASSWORD: z.string().nonempty(),
})

export const {
   GITHUB_TOKEN,
   PAYLOAD_SECRET,
   DATABASE_URI,
   ADMIN_EMAIL,
   ADMIN_PASSWORD,
} = envSchema.parse(process.env)

export const GITHUB_API = "https://api.github.com/graphql"

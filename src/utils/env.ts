import { z } from "zod"

const envSchema = z.object({
   GITHUB_TOKEN: z.string().nonempty(),
   PAYLOAD_SECRET: z.string().nonempty(),
   DATABASE_URI: z.string().nonempty(),
   ADMIN_EMAIL: z.email().nonempty(),
   ADMIN_PASSWORD: z.string().nonempty(),
   RESEND_API_KEY: z.string().nonempty(),
   NEXT_PUBLIC_BASE_URL: z.url().nonempty(),
})

export const {
   GITHUB_TOKEN,
   PAYLOAD_SECRET,
   DATABASE_URI,
   ADMIN_EMAIL,
   ADMIN_PASSWORD,
   RESEND_API_KEY,
   NEXT_PUBLIC_BASE_URL: BASE_URL,
} = envSchema.parse(process.env)

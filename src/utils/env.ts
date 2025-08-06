import { z } from "zod"

const envSchema = z.object({
   NEXT_PUBLIC_BASE_URL: z.url().nonempty(),
   GITHUB_TOKEN: z.string().nonempty(),
   PAYLOAD_SECRET: z.string().nonempty(),
   ADMIN_EMAIL: z.email().nonempty(),
   ADMIN_PASSWORD: z.string().nonempty(),
   RESEND_API_KEY: z.string().nonempty(),
   DATABASE_URL: z.url(),
   DATABASE_AUTH_TOKEN: z.string().nonempty(),
   CLOUDINARY_CLOUD_NAME: z.string().nonempty(),
   CLOUDINARY_API_KEY: z.string().nonempty(),
   CLOUDINARY_API_SECRET: z.string().nonempty(),
})

export const {
   NEXT_PUBLIC_BASE_URL: BASE_URL,
   GITHUB_TOKEN,
   PAYLOAD_SECRET,
   ADMIN_EMAIL,
   ADMIN_PASSWORD,
   RESEND_API_KEY,
   DATABASE_URL,
   DATABASE_AUTH_TOKEN,
   CLOUDINARY_API_KEY,
   CLOUDINARY_API_SECRET,
   CLOUDINARY_CLOUD_NAME,
} = envSchema.parse(process.env)

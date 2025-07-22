import { z } from "zod"

const envSchema = z.object({
   GITHUB_TOKEN: z.string().nonempty(),
})

const parsedEnv = envSchema.parse(process.env)

export const { GITHUB_TOKEN } = parsedEnv

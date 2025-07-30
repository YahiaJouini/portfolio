import { ContactPage } from "@/messages/types"
import { Locale } from "@/types"
import z from "zod"

export const contactSchema = (values: ContactPage[Locale]["form"]) =>
   z.object({
      name: z.string().min(1, values.name.errorMessage),
      email: z.email(values.email.errorMessage),
      message: z.string().min(10, values.message.errorMessage),
   })

export type ContactSchema = z.infer<ReturnType<typeof contactSchema>>

import { ContactPage } from "@/messages/types"
import { Locale } from "@/types"
import z from "zod"

export const contactSchema = (values?: ContactPage[Locale]["form"]) => {
   return z.object({
      name: z.string().min(1, values?.name.errorMessage ?? "Name is required"),
      email: z.email(values?.email.errorMessage ?? "Invalid email"),
      message: z
         .string()
         .min(10, values?.message.errorMessage ?? "Message is too short"),
   })
}

export type ContactSchema = z.infer<ReturnType<typeof contactSchema>>

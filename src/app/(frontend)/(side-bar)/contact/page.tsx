"use client"

import { t } from "@/app/(frontend)/(side-bar)/contact/t"
import InputField from "@/components/global/InputField"
import { Form, FormField } from "@/components/ui/form"
import { fullName } from "@/messages/global"
import { messages } from "@/messages/seperate/messages"
import { useLocale } from "@/providers/Locale"
import { contactSchema, ContactSchema } from "@/schemas/contact"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FaArrowLeftLong } from "react-icons/fa6"
import { toast } from "sonner"

export default function Page() {
   const { locale } = useLocale()
   const content = t[locale]
   const form = useForm<ContactSchema>({
      resolver: zodResolver(contactSchema(content.form)),
      mode: "all",
      defaultValues: {
         email: "",
         message: "",
         name: "",
      },
   })

   async function onSubmit(values: ContactSchema) {
      try {
         const res = await fetch("/api/contact", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
         })

         const data = await res.json()

         if (!res.ok) {
            throw new Error(data.message || data.errorMessage)
         }

         toast.success(data.message || content.successMessage)
         form.reset()
      } catch (err: any) {
         toast.error(content.errorMessage, {
            description: err?.message ?? content.errorMessage,
         })
      }
   }

   return (
      <div className="border-border-default flex w-full flex-col gap-6 rounded-md border p-6">
         <p className="font-mono text-xs">
            <span className="text-text-primary">
               {fullName.en.replace(" ", "")}
            </span>
            <span className="text-accent-icon mx-[2px]">/</span>
            <span className="text-text-primary">README</span>
            <span className="text-accent-icon false">.md</span>
         </p>
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit, ({ message }) => {
                  toast.error(content.errorMessage, {
                     description: message?.message,
                  })
               })}
               className="space-y-5"
            >
               {Object.entries(content.form).map(([key, value]) => (
                  <FormField
                     key={key}
                     control={form.control}
                     name={key as keyof ContactSchema}
                     render={({ field, fieldState }) => (
                        <InputField
                           {...field}
                           type={value.type}
                           label={value.title}
                           placeholder={value.placeholder}
                           hasError={!!fieldState.error}
                        />
                     )}
                  />
               ))}

               <button
                  disabled={
                     !form.formState.isValid || form.formState.isSubmitting
                  }
                  type="submit"
                  className="border-border-default w-fit gap-1 rounded-sm border bg-[#238636] px-4 py-2 font-medium text-white disabled:opacity-50"
               >
                  {form.formState.isSubmitting
                     ? messages[locale].submitting
                     : content.submitButton}
               </button>
            </form>
         </Form>
         <div className="flex w-full items-center justify-start max-md:px-4">
            <p className="flex items-center gap-4 max-md:hidden">
               <FaArrowLeftLong size={18} className="text-accent-icon" />
               {content.alternative}
            </p>
         </div>
      </div>
   )
}

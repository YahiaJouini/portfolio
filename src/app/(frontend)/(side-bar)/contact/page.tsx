"use client"

import InputField from "@/components/global/InputField"
import { Form, FormField } from "@/components/ui/form"
import { fullName } from "@/messages/global"
import { contactPage } from "@/messages/seperate/contact-page"
import { useLocale } from "@/providers/Locale"
import { contactSchema, ContactSchema } from "@/schemas/contact"
import { FaArrowLeftLong } from "react-icons/fa6"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function Page() {
   const { locale } = useLocale()
   const data = contactPage[locale]
   const form = useForm<ContactSchema>({
      resolver: zodResolver(contactSchema(data.form)),
      mode: "all",
      defaultValues: {
         email: "",
         message: "",
         name: "",
      },
   })

   async function onSubmit(values: ContactSchema) {
      // send to email here
      console.log(values)
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
                  toast.error(data.errorMessage, {
                     description: message?.message,
                  })
               })}
               className="space-y-5"
            >
               {Object.entries(data.form).map(([key, value]) => (
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
                  type="submit"
                  className="border-border-default w-fit gap-1 rounded-sm border bg-[#238636] px-4 py-2 font-medium text-white"
               >
                  {data.submitButton}
               </button>
            </form>
         </Form>
         <div className="flex w-full items-center justify-start max-md:px-4">
            <p className="flex items-center gap-4 max-md:hidden">
               <FaArrowLeftLong size={18} className="text-accent-icon" />
               {data.alternative}
            </p>
         </div>
      </div>
   )
}

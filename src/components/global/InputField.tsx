import {
   FormControl,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { SearchIcon } from "lucide-react"

type InputFieldProps = {
   type: "text" | "email" | "tel" | "date" | "password" | "number" | "textarea"
   value: string | undefined
   label?: string
   placeholder?: string
   onBlur?: () => void
   onChange: (val: string) => void
   className?: string
   hasError?: boolean
   reactHookForm?: boolean
   search?: boolean
}

const InputField = (props: InputFieldProps) => {
   const {
      hasError,
      type,
      reactHookForm = false,
      search = false,
      ...inputProps
   } = props
   const handleDisplay = () => {
      return (
         <div className="relative h-fit">
            {type === "textarea" && (
               <textarea
                  {...inputProps}
                  onChange={(e) => props.onChange(e.target.value)}
                  className={cn(
                     "border-border-default bg-secondary max-h-[400px] min-h-[180px] w-full rounded-md border px-3 py-2 outline-none",
                     props.className,
                     hasError && "border-red-500",
                  )}
               />
            )}
            {type !== "textarea" && (
               <input
                  {...inputProps}
                  type={type}
                  onChange={(e) => props.onChange(e.target.value)}
                  className={cn(
                     "border-border-default bg-secondary placeholder:text-text-secondary w-full rounded-md border px-3 py-2 transition-all outline-none",
                     props.className,
                     hasError && "border-red-500",
                     search && "pl-8",
                  )}
               />
            )}
            {search && (
               <SearchIcon className="text-text-secondary absolute top-1/2 left-3 mr-1 h-4 w-4 -translate-y-1/2" />
            )}
         </div>
      )
   }
   if (reactHookForm) {
      return (
         <FormItem className="relative flex w-full flex-col gap-2.5">
            {props.label && (
               <FormLabel className="!text-[14px] font-medium sm:text-base">
                  {props.label}
               </FormLabel>
            )}
            <FormControl>{handleDisplay()}</FormControl>

            {props.hasError && (
               <FormMessage className="-mt-1 text-sm">
                  This field has an error
               </FormMessage>
            )}
         </FormItem>
      )
   }
   return handleDisplay()
}

export default InputField

import {
   FormControl,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"

type InputFieldProps = {
   type: "text" | "email" | "tel" | "date" | "password" | "number" | "textarea"
   value: string | undefined
   label?: string
   placeholder?: string
   onBlur: () => void
   onChange: (val: string) => void
   classNameIcon?: string
   className?: string
   hasError?: boolean
}

const InputField = (props: InputFieldProps) => {
   const handleDisplay = () => {
      const { hasError, type, ...inputProps } = props
      return (
         <div className="relative">
            {type === "textarea" && (
               <textarea
                  {...inputProps}
                  onChange={(e) => props.onChange(e.target.value)}
                  className={cn(
                     "border-border-default bg-secondary max-h-[400px] min-h-[180px] w-full rounded-md border px-3 py-2 outline-none active:pr-4",
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
                     "border-border-default bg-secondary w-full rounded-md border px-3 py-2 outline-none active:pr-4",
                     props.className,
                     hasError && "border-red-500",
                  )}
               />
            )}
         </div>
      )
   }

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

export default InputField

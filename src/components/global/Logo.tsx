import { Link } from "@/i18n/navigation"
import { fullName } from "@/messages/global"

type Props = {
   loader?: boolean
   withName?: boolean
   text?: string
}
export default function Logo({ loader = false, withName = true, text }: Props) {
   if (loader) {
      return (
         <div className={`${withName && "flex items-center gap-3"}`}>
            <div className="border-text-primary center aspect-square h-10 w-10 border text-xl font-medium">
               {fullName.en[0].toUpperCase()}
            </div>
            {withName && (
               <p className="text-lg font-medium">{text || fullName.en}</p>
            )}
         </div>
      )
   }
   return (
      <Link
         aria-label="Go to home"
         href="/"
         className={`${withName && "flex items-center gap-3 rtl:flex-row-reverse"}`}
      >
         <div className="border-text-primary center aspect-square h-8 w-8 border text-lg font-medium">
            {fullName.en[0].toUpperCase()}
         </div>
         {withName && (
            <p className="text-sm font-medium">{text || fullName.en}</p>
         )}
      </Link>
   )
}

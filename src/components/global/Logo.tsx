import { fullName } from "@/messages/global"
import Link from "next/link"

export default function Logo({ loader = false, withName = true }) {
   if (loader) {
      return (
         <div className={`${withName && "flex items-center gap-3"}`}>
            <div className="border-text-primary center aspect-square h-10 w-10 border text-xl font-medium">
               {fullName.en[0].toUpperCase()}
            </div>
            {withName && <p className="text-lg font-medium">{fullName.en}</p>}
         </div>
      )
   }
   return (
      <Link href="/" className={`${withName && "flex items-center gap-3"}`}>
         <div className="border-text-primary center aspect-square h-8 w-8 border text-lg font-medium">
            {fullName.en[0].toUpperCase()}
         </div>
         {withName && <p className="text-sm font-medium">{fullName.en}</p>}
      </Link>
   )
}

import { fullName } from "@/messages/global"
import Link from "next/link"

export default function Logo({ loader = false }) {
   if (loader) {
      return (
         <div className="flex items-center gap-3">
            <div className="border-text-primary center aspect-square h-10 w-10 border text-xl font-medium">
               {fullName[0].toUpperCase()}
            </div>
            <p className="text-lg font-medium">{fullName}</p>
         </div>
      )
   }
   return (
      <Link href="/" className="flex items-center gap-3">
         <div className="border-text-primary center aspect-square h-8 w-8 border text-lg font-medium">
            {fullName[0].toUpperCase()}
         </div>
         <p className="text-sm font-medium">{fullName}</p>
      </Link>
   )
}

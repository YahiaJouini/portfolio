import Link from "next/link"

export default function Navbar() {
   return (
      <div className="bg-secondary border-borders w-full border-b">
         <div className="px-8 py-5">
            <div className="flex items-center justify-between">
               <Link href="/" className="flex items-center gap-3">
                  <div className="border-primary-t center aspect-square h-8 w-8 border text-lg font-medium">
                     Y
                  </div>
                  <p className="text-sm font-medium">Yahia Jouini</p>
               </Link>
            </div>
         </div>
      </div>
   )
}

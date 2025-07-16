"use client"
import { useTranslation } from "@/hooks/useTranslation"
import { NavBar } from "@/messages/types/navbar"
import Link from "next/link"
import Search from "./search"
import Theme from "./theme"
import Language from "./language"
import Sidebar from "./sidebar"

export default function Navbar() {
   const data = useTranslation<NavBar>({ translation: "navbar" })
   // TODO! show a skeleton while null to not layout shift
   if (!data) return null
   return (
      <div className="bg-secondary border-border-default w-full border-b">
         <div className="px-8 py-5">
            <div className="flex items-center justify-between">
               <Link href="/" className="flex items-center gap-3">
                  <div className="border-text-primary center aspect-square h-8 w-8 border text-lg font-medium">
                     Y
                  </div>
                  <p className="text-sm font-medium">{data.title}</p>
               </Link>
               <div className="flex items-center gap-4">
                  <Search data={data.search} />
                  <div className="bg-accent-border h-5 w-px" />
                  <Theme />
                  <Language data={data.languages} />
                  <div className="bg-accent-border h-5 w-px" />
                  <Sidebar />
               </div>
            </div>
         </div>
      </div>
   )
}

"use client"
import useActivePath from "@/hooks/useActivePath"
import { useTranslation } from "@/hooks/useTranslation"
import { cn } from "@/lib/utils"
import { iconMap } from "@/messages/global"
import { NavBar } from "@/messages/types/navbar"
import Link from "next/link"
import Language from "./language"
import Search from "./search"
import Sidebar from "./sidebar"
import Theme from "./theme"

export default function Navbar() {
   const { data } = useTranslation<NavBar>({ translation: "navbar" })
   const isActive = useActivePath()
   // TODO! show a skeleton while null to not layout shift
   if (!data) return null
   return (
      <nav className="bg-secondary border-border-default w-full border-b pt-3">
         <div className="px-8">
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
                  <Language />
                  <div className="bg-accent-border h-5 w-px" />
                  <Sidebar pages={data.items} />
               </div>
            </div>

            <div className="mt-3 flex items-center gap-9">
               {data.items.map((item) => {
                  const Icon = iconMap[item.id]
                  const active = isActive(item.href)
                  return (
                     <Link
                        key={item.href}
                        href={item.href}
                        className="text-text-primary group relative flex items-center gap-1.5 pb-3 text-sm"
                     >
                        <Icon />
                        {item.title}

                        <div
                           className={cn(
                              "bg-accent-active absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 transition-all group-hover:w-[120%]",
                              {
                                 "w-[120%]": active,
                              },
                           )}
                        />
                     </Link>
                  )
               })}
            </div>
         </div>
      </nav>
   )
}

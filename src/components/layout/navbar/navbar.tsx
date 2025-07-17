"use client"
import Logo from "@/components/global/Logo"
import useActivePath from "@/hooks/useActivePath"
import { cn } from "@/lib/utils"
import { iconMap } from "@/messages/global"
import navbar from "@/messages/instant/navbar"
import { useLocale } from "@/providers/Locale"
import Link from "next/link"
import Language from "./language"
import Search from "./search"
import Sidebar from "./sidebar"
import Theme from "./theme"

export default function Navbar() {
   const { locale } = useLocale()
   // instant load to prevent layout shifts
   const data = navbar[locale]
   const isActive = useActivePath()
   return (
      <nav className="bg-secondary border-border-default mb-8 w-full border-b pt-3">
         <div className="px-8">
            <div className="flex items-center justify-between">
               <Logo />
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

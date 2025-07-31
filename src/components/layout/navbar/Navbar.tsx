"use client"
import Logo from "@/components/global/Logo"
import useActivePath from "@/hooks/useActivePath"
import { cn } from "@/lib/utils"
import navbar from "@/messages/seperate/navbar"
import { iconMap } from "@/messages/seperate/page-icons"
import { Locale } from "@/types"
import Link from "next/link"
import Language from "./Language"
import Search from "./Search"
import Sidebar from "./Sidebar"
import Theme from "./Theme"

export default function Navbar({ locale }: { locale: Locale }) {
   // instant load to prevent layout shifts
   const content = navbar[locale]
   const isActive = useActivePath()
   return (
      <nav className="bg-secondary border-border-default mb-4 w-full border-b pt-3 sm:mb-12">
         <div className="px-4 sm:px-12">
            <div className="flex items-center justify-between max-sm:pb-2">
               <Logo />
               <div className="flex items-center gap-2.5 sm:gap-4">
                  <Search content={content.search} />
                  <div className="bg-accent-border h-5 w-px max-sm:hidden" />
                  <Theme />
                  <Language />
                  <div className="bg-accent-border h-5 w-px max-sm:hidden" />
                  <Sidebar pages={content.items} />
               </div>
            </div>

            <div className="text-text-primary mt-3 flex items-center gap-9 font-medium max-sm:hidden">
               {content.items.map((item) => {
                  const Icon = iconMap[item.id]
                  const active = isActive(item.href)
                  return (
                     <Link
                        key={item.href}
                        href={item.href}
                        className="group relative flex items-center gap-1.5 pb-3 text-sm"
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

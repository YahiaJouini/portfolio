"use client"
import Logo from "@/components/global/Logo"
import useActivePath from "@/hooks/useActivePath"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import navbar from "@/messages/seperate/navbar"
import { iconMap } from "@/messages/seperate/page-icons"
import { Locale } from "@/types"
import { lazy } from "react"
import Language from "./Language"
import Search from "./Search"
import Theme from "./Theme"

const Sidebar = lazy(() => import("./Sidebar"))
export default function Navbar({ locale }: { locale: Locale }) {
   // instant load to prevent layout shifts
   const content = navbar[locale]
   const isActive = useActivePath()
   return (
      <nav className="bg-secondary border-border-default mb-8 w-full border-b pt-3 sm:mb-12">
         <div className="px-4 sm:px-12">
            <div className="flex items-center justify-between max-sm:pb-2 rtl:flex-row-reverse">
               <Logo text={content.title} />
               <div className="flex items-center gap-2.5 sm:gap-4 rtl:flex-row-reverse">
                  <Search pages={content.items} content={content.search} />
                  <div className="bg-accent-border h-5 w-px max-sm:hidden" />
                  <Theme />
                  <Language />
                  <div className="bg-accent-border h-5 w-px max-sm:hidden" />
                  <Sidebar pages={content.items} />
               </div>
            </div>

            <div className="text-text-primary mt-3 flex items-center gap-9 font-medium max-sm:hidden rtl:flex-row-reverse">
               {content.items.map(({ id, href, title }) => {
                  const Icon = iconMap[id]
                  const active = isActive(href)
                  return (
                     <Link
                        aria-label={`Go to ${title}`}
                        prefetch
                        key={id}
                        href={href}
                        className="group relative flex items-center gap-1.5 pb-3 text-sm"
                     >
                        <Icon />
                        {title}

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

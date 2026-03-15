"use client"
import { cn } from "@/lib/utils"
import { Locale } from "@/types"
import { BookOpen, Eye } from "lucide-react"
import { useQueryStates } from "nuqs"
import { displaySections, filters } from "../project-filters"

export default function DisplaySection({ locale }: { locale: Locale }) {
   const [{ display }, setFilter] = useQueryStates(filters, {
      shallow: false,
      scroll: false,
   })

   const icons = {
      readme: BookOpen,
      preview: Eye,
   } as const

   return (
      <div className="bg-tertiary border-border-default flex h-12 w-full items-center gap-4 border-b px-4">
         {displaySections.map(({ values, key }) => {
            const Icon = icons[key]
            return (
               <button
                  aria-label={`View ${values[locale]} section`}
                  onClick={() => setFilter({ display: key })}
                  key={key}
                  className="relative flex h-full items-center gap-1 px-1 font-medium"
               >
                  <Icon className="text-accent-icon h-[18px] w-[18px]" />
                  {values[locale]}
                  <div
                     className={cn(
                        "bg-accent-active absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 transition-all group-hover:w-[120%]",
                        {
                           "w-full": display === key,
                        },
                     )}
                  />
               </button>
            )
         })}
      </div>
   )
}

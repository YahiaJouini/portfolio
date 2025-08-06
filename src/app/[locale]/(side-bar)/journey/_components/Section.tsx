"use client"
import { useLocale } from "@/hooks/useLocale"
import { cn } from "@/lib/utils"
import { Briefcase } from "lucide-react"
import { useQueryStates } from "nuqs"
import { filters, sections } from "../search-params"
import { t } from "../t"

export default function Section() {
   const [{ view: activeView }, setFilters] = useQueryStates(filters, {
      shallow: false,
   })
   const locale = useLocale()
   const resolvedLayout = t[locale]
   return (
      <div className="bg-secondary border-border-default flex rounded-lg border p-1">
         {sections.map((view) => (
            <button
               aria-label={`View ${view} section`}
               key={view}
               onClick={() =>
                  setFilters({
                     view,
                  })
               }
               className={cn(
                  "flex items-center rounded-md border px-3 py-1.5 text-xs font-medium transition-all duration-200 md:px-4 md:py-2 md:text-sm rtl:flex-row-reverse",
                  {
                     "bg-primary text-text-primary border-border-default":
                        activeView === view,
                     "text-text-secondary hover:text-text-primary border-transparent":
                        activeView !== view,
                  },
               )}
            >
               <Briefcase className="mr-1.5 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
               {resolvedLayout[view]}
            </button>
         ))}
      </div>
   )
}

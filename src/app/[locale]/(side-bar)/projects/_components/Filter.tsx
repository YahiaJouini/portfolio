"use client"
import {
   displayModes,
   filters,
} from "@/app/[locale]/(side-bar)/projects/project-filters"
import { cn } from "@/lib/utils"
import { Locale } from "@/types"
import { Grid2x2, Rows2 } from "lucide-react"
import { useQueryStates } from "nuqs"
import { t } from "../t"

export default function Filter({ locale }: { locale: Locale }) {
   const [{ layout }, setFilters] = useQueryStates(filters, {
      shallow: false,
      clearOnDefault: false,
   })

   const handleLayoutChange = (newLayout: (typeof displayModes)[number]) => {
      if (newLayout !== layout) {
         setFilters({
            layout: newLayout,
         })
      }
   }
   return (
      <div className="flex items-center gap-2">
         <div className="grid grid-cols-2 gap-1 max-md:w-full">
            {displayModes.map((value) => (
               <button
                  key={value}
                  onClick={() => handleLayoutChange(value)}
                  className={cn(
                     "border-border-default flex w-full items-center justify-center gap-1 rounded-md border px-4 py-1",
                     {
                        "bg-hover-2": layout === value,
                        "hover:bg-hover-2/50": layout !== value,
                     },
                  )}
               >
                  {value === "grid" ? (
                     <Grid2x2 className="h-4 w-4" />
                  ) : (
                     <Rows2 className="h-4 w-4" />
                  )}
                  {t[locale][value]}
               </button>
            ))}
         </div>
      </div>
   )
}

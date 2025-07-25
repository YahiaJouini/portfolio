"use client"
import { cn } from "@/lib/utils"
import { Locale } from "@/messages/types/shared"
import { useState } from "react"

type Item = {
   key: "overview" | "screenshots"
   values: Record<Locale, string>
}
const items: Item[] = [
   {
      key: "overview",
      values: {
         en: "OverView",
         fr: "OverView",
         ar: "OverView",
      },
   },
   {
      key: "screenshots",
      values: {
         en: "ScreenShots",
         fr: "ScreenShots",
         ar: "ScreenShots",
      },
   },
] as const

export default function DisplaySection({ locale }: { locale: Locale }) {
   const [active, setActive] = useState<Item["key"]>("overview")
   return (
      <div className="bg-hover-2 flex h-12 w-full items-center gap-2 px-4">
         {items.map(({ values, key }) => (
            <button
               onClick={() => setActive(key)}
               key={key}
               className="relative h-full px-1"
            >
               {values[locale]}
               <div
                  className={cn(
                     "bg-accent-active absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 transition-all group-hover:w-[120%]",
                     {
                        "w-full": active === key,
                     },
                  )}
               />
            </button>
         ))}
      </div>
   )
}

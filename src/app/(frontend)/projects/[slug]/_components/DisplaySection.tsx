"use client"
import { cn } from "@/lib/utils"
import { Locale } from "@/messages/types/shared"
import { BookOpen } from "lucide-react"
import { useState } from "react"

type Item = {
   key: "readme" | "screenshots"
   values: Record<Locale, string>
}
const items: Item[] = [
   {
      key: "readme",
      values: {
         en: "ReadMe",
         fr: "ReadMe",
         ar: "ReadMe",
      },
   },
   {
      key: "screenshots",
      values: {
         en: "ScreenShots",
         fr: "Captures d'écran",
         ar: "لقطات الشاشة",
      },
   },
] as const

export default function DisplaySection({ locale }: { locale: Locale }) {
   const [active, setActive] = useState<Item["key"]>("readme")
   return (
      <div className="bg-tertiary border-border-default flex h-12 w-full items-center gap-4 border-b px-4">
         {items.map(({ values, key }) => (
            <button
               onClick={() => setActive(key)}
               key={key}
               className="relative flex h-full items-center gap-1 px-1 font-medium"
            >
               <BookOpen className="text-accent-icon h-[18px] w-[18px]" />
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

import Dropdown from "@/components/global/drop-down"
import { cn } from "@/lib/utils"
import { Locale } from "@/messages/types/common"
import { NavBar } from "@/messages/types/navbar"
import { useLocale } from "@/providers/Locale"
import { useState } from "react"

export default function Language({ data }: { data: NavBar["languages"] }) {
   const { locale, setLocale } = useLocale()
   const [selectedLanguage, setSelectedLanguage] = useState<Locale>(
      locale ?? data[0].id,
   )

   const handleLanguageChange = (lang: Locale) => {
      setSelectedLanguage(lang)
      setLocale(lang)
   }
   return (
      <Dropdown>
         <Dropdown.Trigger className="border-border-default hover:bg-hover-2 center h-8 w-8 cursor-pointer rounded border text-sm">
            {data.find((lang) => lang.id === selectedLanguage)!.abbreviation}
         </Dropdown.Trigger>
         <Dropdown.Content className="top-8 flex flex-col gap-1 p-1">
            {data.map((lang) => (
               <button
                  key={lang.id}
                  onClick={() => handleLanguageChange(lang.id)}
                  className={cn(
                     "hover:bg-hover-2 cursor-pointer rounded-sm px-3 py-1 text-sm",
                     {
                        "bg-hover-2": selectedLanguage === lang.id,
                     },
                  )}
               >
                  {lang.title}
               </button>
            ))}
         </Dropdown.Content>
      </Dropdown>
   )
}

import Dropdown from "@/components/global/drop-down"
import { cn } from "@/lib/utils"
import { languages as data } from "@/messages/global"
import { Locale } from "@/messages/types/common"
import { useLocale } from "@/providers/Locale"

export default function Language({ dropDown = true }) {
   const { locale, setLocale } = useLocale()

   const handleLanguageChange = (lang: Locale) => {
      setLocale(lang)
   }

   if (dropDown) {
      return (
         <Dropdown>
            <Dropdown.Trigger className="border-border-default hover:bg-hover-2 center h-8 w-8 cursor-pointer rounded border text-sm">
               {data.find((lang) => lang.id === locale)!.abbreviation}
            </Dropdown.Trigger>
            <Dropdown.Content className="flex flex-col gap-1 p-1">
               {data.map((lang) => (
                  <button
                     key={lang.id}
                     onClick={() => handleLanguageChange(lang.id)}
                     className={cn(
                        "hover:bg-hover-2 cursor-pointer rounded-sm px-3 py-1 text-sm",
                        {
                           "bg-hover-2": locale === lang.id,
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
   return (
      <div className="grid grid-cols-3 gap-2">
         {data.map((lang) => (
            <button
               key={lang.id}
               onClick={() => handleLanguageChange(lang.id)}
               className={cn(
                  "border-border-default hover:bg-hover-2 center flex cursor-pointer items-center gap-2 rounded border px-2 py-1 text-sm",
                  {
                     "bg-hover-2": locale === lang.id,
                  },
               )}
            >
               {
                  <div className="h-[18px] w-[18px]">
                     <lang.Flag />
                  </div>
               }
               {lang.title}
            </button>
         ))}
      </div>
   )
}

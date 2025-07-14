import { Locale, Translation } from "@/messages/types/common"
import { getSection } from "@/messages/utils"
import { useLayoutEffect, useState } from "react"

export const useTranslation = <T>(
   locale: Locale,
   translation: Translation,
): T | null => {
   const [section, setSection] = useState<T | null>(null)
   useLayoutEffect(() => {
      getSection<T>(locale, translation).then((data) => {
         setSection(data)
      })
   }, [locale, translation])
   return section
}

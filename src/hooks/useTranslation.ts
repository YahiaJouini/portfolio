import { Translation } from "@/messages/types/common"
import { useLocale } from "@/providers/Locale"
import { getTranslation } from "@/utils/get-translation"
import { useLayoutEffect, useState } from "react"

export const useTranslation = <T>(translation: Translation): T | null => {
   const { locale } = useLocale()
   const [section, setSection] = useState<T | null>(null)
   useLayoutEffect(() => {
      if (!locale) return
      getTranslation<T>(locale, translation).then((data) => {
         setSection(data)
      })
   }, [locale, translation])
   return section
}

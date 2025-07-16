import { Translation } from "@/messages/types/common"
import { useLocale } from "@/providers/Locale"
import { getTranslation } from "@/utils/get-translation"
import { useLayoutEffect, useState } from "react"

type Props = {
   show?: boolean
   translation: Translation
}
export const useTranslation = <T>({
   translation,
   show = true,
}: Props): T | null => {
   const { locale } = useLocale()
   const [section, setSection] = useState<T | null>(null)
   useLayoutEffect(() => {
      if (!locale || !show) return
      getTranslation<T>(locale, translation).then((data) => {
         setSection(data)
      })
   }, [locale, translation, show])
   return section
}

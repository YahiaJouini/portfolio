import { Locale, Translation } from "@/messages/types/shared"
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
}: Props): { data: T | null; locale: Locale | null } => {
   const { locale } = useLocale()
   const [data, setData] = useState<T | null>(null)
   useLayoutEffect(() => {
      if (!show) return
      getTranslation<T>(locale, translation).then((data) => {
         setData(data)
      })
   }, [locale, translation, show])
   return { data, locale }
}

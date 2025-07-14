"use client"
import { Locale } from "@/messages/types/common"
import { validLocale } from "@/utils/validate-locale"
import { createContext, useContext, useEffect, useState } from "react"

type Context = {
   locale: Locale | null
   setLocale: (locale: Locale) => void
}
const context = createContext<Context | null>(null)

export default function LocaleProvider({
   children,
}: {
   children: React.ReactNode
}) {
   const [locale, setLocaleState] = useState<Locale | null>(null)

   useEffect(() => {
      const match = document.cookie.match(/(^| )locale=([^;]+)/)
      const cookieLocale = match?.[2]

      if (validLocale(cookieLocale)) {
         setLocaleState(cookieLocale as Locale)
      } else {
         document.cookie = `locale=en; path=/`
         setLocaleState("en")
      }
   }, [])

   const setLocale = (newLocale: Locale) => {
      document.cookie = `locale=${newLocale}; path=/`
      setLocaleState(newLocale)
   }
   return (
      <context.Provider value={{ locale, setLocale }}>
         {children}
      </context.Provider>
   )
}

export const useLocale = () => {
   const usedContext = useContext(context)
   if (!usedContext) {
      throw new Error("useLocale must be used within a LocaleProvider")
   }
   return usedContext
}

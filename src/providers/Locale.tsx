"use client"
import { Locale } from "@/types"
import { useRouter } from "next/navigation"
import { createContext, useContext, useState } from "react"

type Context = {
   locale: Locale
   setLocale: (locale: Locale) => void
}
const context = createContext<Context | null>(null)

type Props = {
   children: React.ReactNode
   value: Locale
}
export default function LocaleProvider({ children, value }: Props) {
   const [locale, setLocaleState] = useState<Locale>(value)
   const router = useRouter()

   const setLocale = (newLocale: Locale) => {
      document.cookie = `locale=${newLocale}; path=/`
      setLocaleState(newLocale)
      router.refresh()
   }

   return (
      <context.Provider value={{ locale, setLocale }}>
         {children}
      </context.Provider>
   )
}

export const useLocale = () => {
   const ctx = useContext(context)
   if (!ctx) {
      throw new Error("useLocale must be used within a LocaleProvider")
   }
   return ctx
}

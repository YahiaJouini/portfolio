"use client"
import { LayoutLoader } from "@/components/layout/LayoutLoader"
import { Locale } from "@/types"
import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"

type Context = {
   locale: Locale
   setLocale: (locale: Locale) => void
}
const context = createContext<Context | null>(null)

type Props = {
   children: React.ReactNode
   initialValue: Locale
}
export default function LocaleProvider({ children, initialValue }: Props) {
   const [locale, setLocaleState] = useState<Locale>(initialValue)
   const router = useRouter()
   // prevent hydration mismatch by not rendering until mounted
   // not just for locale but for all providers (theme, etc.)
   const [mounted, setMounted] = useState(false)
   useEffect(() => {
      setMounted(true)
   }, [])

   const setLocale = (newLocale: Locale) => {
      document.cookie = `locale=${newLocale}; path=/`
      setLocaleState(newLocale)
      router.refresh()
   }

   if (!mounted) return <LayoutLoader />
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

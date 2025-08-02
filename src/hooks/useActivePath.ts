import { SUPPORTED_LOCALES } from "@/utils/constants"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

const useActivePath = () => {
   const pathname = usePathname() || "/"

   const normalizedPathname = useMemo(() => {
      const localeMatch = SUPPORTED_LOCALES.find(
         (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
      )

      if (localeMatch) {
         return pathname.replace(`/${localeMatch}`, "") || "/"
      }

      return pathname
   }, [pathname])

   const isActive = useMemo(() => {
      return (targetPath: string, exact = false) => {
         if (targetPath === "/") {
            return normalizedPathname === "/"
         }

         if (exact) {
            return normalizedPathname === targetPath
         }

         const normalizeForComparison = (path: string) =>
            path.endsWith("/") ? path : path + "/"

         const normalizedTarget = normalizeForComparison(targetPath)
         const normalizedCurrent = normalizeForComparison(normalizedPathname)

         return normalizedCurrent.startsWith(normalizedTarget)
      }
   }, [normalizedPathname])

   return isActive
}

export default useActivePath

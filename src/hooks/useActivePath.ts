import { usePathname } from "next/navigation"

const useActivePath = () => {
   const pathname = usePathname()

   const isActive = (targetPath: string, exact = true) => {
      if (exact) {
         return pathname === targetPath
      }

      const normalizedTarget = targetPath.endsWith("/")
         ? targetPath
         : targetPath + "/"

      const normalizedPathname = pathname.endsWith("/")
         ? pathname
         : pathname + "/"

      return normalizedPathname.startsWith(normalizedTarget)
   }

   return isActive
}

export default useActivePath

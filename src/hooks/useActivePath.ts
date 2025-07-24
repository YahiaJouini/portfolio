import { usePathname } from "next/navigation"

const useActivePath = () => {
   const pathname = usePathname()

   const isActive = (targetPath: string, exact = false) => {
      if (targetPath === "/") {
         return pathname === "/"
      }

      if (exact) {
         return pathname === targetPath
      }

      const normalizedPathname = pathname.endsWith("/")
         ? pathname
         : pathname + "/"

      return normalizedPathname.startsWith(
         targetPath.endsWith("/") ? targetPath : targetPath + "/",
      )
   }

   return isActive
}
export default useActivePath

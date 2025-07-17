import { usePathname } from "next/navigation"

const useActivePath = () => {
   const pathname = usePathname()
   const isActive = (currentPath: string) => {
      return pathname.startsWith(currentPath)
   }
   return isActive
}
export default useActivePath

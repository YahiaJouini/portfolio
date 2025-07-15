// components/Dropdown.tsx
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import React, {
   createContext,
   useContext,
   useEffect,
   useRef,
   useState,
} from "react"

type BaseProps = {
   children: React.ReactNode
   className?: string
}

const DropdownContext = createContext<{
   visible: boolean
   setVisible: React.Dispatch<React.SetStateAction<boolean>>
   ref: React.RefObject<HTMLDivElement | null>
} | null>(null)

export default function Dropdown({ children }: BaseProps) {
   const [visible, setVisible] = useState(false)
   const ref = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (ref.current && !ref.current.contains(event.target as Node)) {
            setVisible(false)
         }
      }
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
   }, [])

   return (
      <DropdownContext.Provider value={{ visible, setVisible, ref }}>
         <div ref={ref} className="relative">
            {children}
         </div>
      </DropdownContext.Provider>
   )
}

function useDropDown() {
   const ctx = useContext(DropdownContext)
   if (!ctx) throw new Error("useDropDown must be used within <Dropdown>")
   return ctx
}

Dropdown.Trigger = function Trigger({ children, className }: BaseProps) {
   const { setVisible, visible } = useDropDown()
   return (
      <div className={className} onClick={() => setVisible(!visible)}>
         {children}
      </div>
   )
}

Dropdown.Content = function Content({ children, className }: BaseProps) {
   const { visible } = useDropDown()
   return (
      <AnimatePresence>
         {visible && (
            <motion.div
               onClick={(e) => e.stopPropagation()}
               className={cn(
                  "absolute top-0 left-1/2 w-auto -translate-x-1/2",
                  className,
               )}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
            >
               {children}
            </motion.div>
         )}
      </AnimatePresence>
   )
}

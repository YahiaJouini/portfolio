import { cn } from "@/lib/utils"
import { popup } from "@/utils/animations"
import { AnimatePresence, motion } from "framer-motion"
import { createContext, useContext, useEffect, useRef, useState } from "react"

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
         <div ref={ref} className="relative inline-block">
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
      <button
         aria-label="Toggle dropdown"
         className={cn("cursor-pointer", className)}
         onClick={() => setVisible(!visible)}
      >
         {children}
      </button>
   )
}

Dropdown.Content = function Content({
   children,
   className,
   keep = false,
}: BaseProps & { keep?: boolean }) {
   const { visible, setVisible } = useDropDown()
   return (
      <AnimatePresence>
         {visible && (
            <motion.div
               onClick={(e) => {
                  if (!keep) setVisible(false)
                  e.stopPropagation()
               }}
               className={cn(
                  "bg-primary border-border-default absolute top-full left-1/2 z-50 mt-2 w-auto -translate-x-1/2 rounded border p-3 shadow-lg",
                  className,
               )}
               variants={popup}
               initial="initial"
               animate="animate"
               exit="exit"
            >
               {children}
            </motion.div>
         )}
      </AnimatePresence>
   )
}

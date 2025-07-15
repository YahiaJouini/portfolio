import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function Theme() {
   const { theme, setTheme } = useTheme()
   return (
      <div
         onClick={() =>
            setTheme((prev) => (prev === "dark" ? "light" : "dark"))
         }
         className="border-border-default relative flex h-[22px] w-10 cursor-pointer rounded-full border px-0.5"
      >
         <div
            className={cn(
               "bg-text-primary text-primary center absolute top-1/2 h-[17px] w-[17px] translate-x-0 -translate-y-1/2 rounded-full transition-transform duration-300 ease-in-out",
               {
                  "translate-x-[18px]": theme === "light",
               },
            )}
         >
            <div className="relative h-full w-full">
               <Moon
                  className={cn(
                     "pointer-events-none absolute inset-0 m-auto h-[13px] w-[13px] opacity-0 transition-opacity duration-200 ease-in-out",
                     {
                        "opacity-100": theme === "dark",
                     },
                  )}
               />
               <Sun
                  className={cn(
                     "pointer-events-none absolute inset-0 m-auto h-3 w-3 opacity-0 transition-opacity duration-200 ease-in-out",
                     {
                        "opacity-100": theme === "light",
                     },
                  )}
               />
            </div>
         </div>
      </div>
   )
}

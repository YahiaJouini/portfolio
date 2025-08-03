"use client"
import { NavBar } from "@/messages/types"
import { SearchIcon } from "lucide-react"
import { lazy, useEffect, useState } from "react"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import AntiSlash from "@/components/icons/AntiSlash"

const SearchContent = lazy(() => import("./SearchContent"))
export default function Search({
   content,
   pages,
}: {
   content: NavBar["search"]
   pages: NavBar["items"]
}) {
   const [open, setOpen] = useState(false)

   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.key === "/") {
            e.preventDefault()
            setOpen((prev) => !prev)
         }
         if (e.key === "Escape" && open) {
            setOpen(false)
         }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
   }, [open])

   const secondaryInput = content.placeholder.secondaryInput.split("/")
   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger className="btn-secondary icon border-border-default text-accent-icon hover:bg-hover-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm border pr-3 pl-2 text-[13px] transition-colors max-sm:hidden sm:w-[200px] sm:justify-start md:w-[260px]">
            <SearchIcon className="mr-1 h-4 w-4" />
            <div className="flex items-center gap-1">
               {secondaryInput[0]}
               <AntiSlash />
               {secondaryInput[1]}
            </div>
         </DialogTrigger>
         {open && (
            <DialogContent
               showCloseButton={false}
               className="border-border-default top-1 flex h-[400px] w-[60%] translate-y-0 flex-col gap-4 overflow-hidden overflow-y-auto border px-6 sm:max-w-full"
            >
               <SearchContent
                  handleItemlick={() => setOpen(false)}
                  content={content}
                  pages={pages}
               />
            </DialogContent>
         )}
      </Dialog>
   )
}

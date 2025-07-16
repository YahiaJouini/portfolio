import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { profileImage } from "@/messages/global"
import { Slant as Hamburger } from "hamburger-react"
import Image from "next/image"
import { useState } from "react"

export default function Sidebar() {
   const [open, setOpen] = useState(false)
   return (
      <Sheet open={open} onOpenChange={setOpen}>
         <SheetTrigger
            className={cn(
               "text-accent-icon hover:text-text-primary flex cursor-pointer items-center",
               {
                  "text-text-primary": open,
               },
            )}
         >
            <Image
               width={100}
               height={100}
               className="border-accent-border z-10 h-[36px] w-[36px] rounded-full border object-cover object-center"
               src={profileImage.src}
               alt={profileImage.alt.en}
            />
            <Hamburger size={22} onToggle={setOpen} toggled={open} />
         </SheetTrigger>
         <SheetContent>
            <SheetHeader>
               <SheetTitle>Are you absolutely sure?</SheetTitle>
               <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
               </SheetDescription>
            </SheetHeader>
         </SheetContent>
      </Sheet>
   )
}

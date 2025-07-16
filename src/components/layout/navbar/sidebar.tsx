import ImageLoader from "@/components/global/image-loader"
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet"
import { useTranslation } from "@/hooks/useTranslation"
import { cn } from "@/lib/utils"
import { profileImage } from "@/messages/global"
import { Profile } from "@/messages/types/profile"
import { fade } from "@/utils/animations"
import { AnimatePresence, motion } from "framer-motion"
import { Slant as Hamburger } from "hamburger-react"
import { useState } from "react"

export default function Sidebar() {
   const [open, setOpen] = useState(false)
   const me = useTranslation<Profile>({ translation: "profile", show: open })
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
            <div className="border-accent-border relative z-10 -mr-1 h-[36px] w-[36px] overflow-hidden rounded-full border object-cover object-center">
               <ImageLoader
                  fill
                  className="h-full w-full object-cover object-center"
                  src={profileImage.src}
                  alt={profileImage.alt.en}
               />
            </div>
            <Hamburger size={22} onToggle={setOpen} toggled={open} />
         </SheetTrigger>
         <SheetContent className="flex flex-col gap-4 px-5 py-6">
            <SheetHeader className="hidden">
               <SheetTitle></SheetTitle>
               <SheetDescription></SheetDescription>
            </SheetHeader>
            <AnimatePresence>
               {me && (
                  <motion.div
                     variants={fade}
                     animate="animate"
                     initial="initial"
                     exit="exit"
                  >
                     <div className="border-accent-border relative z-10 -mr-1 mb-3 aspect-square w-1/3 overflow-hidden rounded-full border object-cover object-center">
                        <ImageLoader
                           fill
                           className="h-full w-full object-cover object-center"
                           src={profileImage.src}
                           alt={profileImage.alt.en}
                        />
                     </div>
                     <h2 className="text-xl font-medium">{me.fullName}</h2>
                     <h4 className="text-text-secondary text-[15px]">
                        {me.job}
                     </h4>
                     <p className="text-text-secondary mt-3 text-[13px]">
                        {me.description}
                     </p>
                  </motion.div>
               )}
            </AnimatePresence>
         </SheetContent>
      </Sheet>
   )
}

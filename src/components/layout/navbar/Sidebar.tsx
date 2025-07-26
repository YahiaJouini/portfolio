import Contacts from "@/components/global/Contacts"
import { Divider } from "@/components/global/Divider"
import ImageLoader from "@/components/global/ImageLoader"
import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet"
import useActivePath from "@/hooks/useActivePath"
import { useTranslation } from "@/hooks/useTranslation"
import { cn } from "@/lib/utils"
import { profileImage } from "@/messages/global"
import { layout } from "@/messages/seperate/layout"
import { iconMap } from "@/messages/seperate/page-icons"
import { NavBar, Profile } from "@/messages/types"
import { fade } from "@/utils/animations"
import { AnimatePresence, motion } from "framer-motion"
import { Slant as Hamburger } from "hamburger-react"
import { Moon, Sun, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Language from "./Language"
import Theme from "./Theme"

export default function Sidebar({ pages }: { pages: NavBar["items"] }) {
   const [open, setOpen] = useState(false)
   const isActive = useActivePath()
   const { data, locale } = useTranslation<Profile>({
      translation: "profile",
      show: open,
   })

   const loading = !data || !locale
   return (
      <Sheet open={open} onOpenChange={setOpen}>
         <SheetTrigger
            className={cn("text-accent-icon hover:text-text-primaryr", {
               "text-text-primary": open,
            })}
         >
            <Hamburger
               duration={0.2}
               size={20}
               onToggle={setOpen}
               toggled={open}
            />
         </SheetTrigger>
         <SheetContent className="flex flex-col gap-4 overflow-auto p-6">
            <SheetHeader className="hidden">
               <SheetTitle></SheetTitle>
               <SheetDescription></SheetDescription>
            </SheetHeader>
            <AnimatePresence>
               {!loading && (
                  <motion.div
                     variants={fade}
                     animate="animate"
                     initial="initial"
                     exit="exit"
                     className="flex flex-col gap-6"
                  >
                     <div>
                        <div className="flex items-start justify-between">
                           <div className="border-accent-border relative z-10 -mr-1 mb-3 aspect-square w-1/3 overflow-hidden rounded-full border object-cover object-center">
                              <ImageLoader
                                 fill
                                 className="h-full w-full object-cover object-center"
                                 src={profileImage.src}
                                 alt={profileImage.alt.en}
                              />
                           </div>

                           <SheetClose>
                              <X className="text-text-secondary hover:text-text-primary h-5 w-5" />
                           </SheetClose>
                        </div>
                        <h2 className="text-xl font-medium">{data.fullName}</h2>
                        <h4 className="text-text-trinary text-[15px]">
                           {data.job}
                        </h4>
                        <p className="text-text-secondary mt-3 text-[13px]">
                           {data.description}
                        </p>
                     </div>

                     <Divider title={layout[locale].settings}>
                        <div className="mb-4 flex items-center gap-2 pt-2 text-sm">
                           <div className="text-text-secondary flex items-center gap-1">
                              <Moon className="h-4 w-4" />
                              {layout[locale].dark}
                           </div>
                           <Theme withIcons={false} />
                           <div className="text-text-secondary flex items-center gap-1">
                              <Sun className="h-4 w-4" />
                              {layout[locale].light}
                           </div>
                        </div>
                        <Language dropDown={false} />
                     </Divider>
                     <Divider title={layout[locale].explore}>
                        <div className="flex flex-col gap-1">
                           {pages.map(({ href, title, id }) => {
                              const Icon = iconMap[id]
                              return (
                                 <Link
                                    key={id}
                                    href={href!}
                                    className={
                                       "hover:text-text-primary hover:bg-hover-2 flex w-full items-center gap-1.5 rounded-md px-1.5 py-[7px] text-sm"
                                    }
                                 >
                                    <Icon />
                                    {title}
                                    {isActive(href) && (
                                       <div className="bg-accent-active ml-2 h-[6px] w-[6px] rounded-full" />
                                    )}
                                 </Link>
                              )
                           })}
                        </div>
                     </Divider>

                     <Divider title={layout[locale].connect}>
                        <Contacts />
                     </Divider>
                  </motion.div>
               )}
            </AnimatePresence>
         </SheetContent>
      </Sheet>
   )
}

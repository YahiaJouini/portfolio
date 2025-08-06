import Contacts from "@/components/global/Contacts"
import { Divider } from "@/components/global/Divider"
import ImageLoader from "@/components/global/ImageLoader"
import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet"
import useActivePath from "@/hooks/useActivePath"
import { useTranslation } from "@/hooks/useTranslation"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { profileImage } from "@/messages/global"
import { layout } from "@/messages/seperate/layout"
import { iconMap } from "@/messages/seperate/page-icons"
import { NavBar, Profile } from "@/messages/types"
import { fade } from "@/utils/animations"
import { AnimatePresence, motion } from "framer-motion"
import { Slant as Hamburger } from "hamburger-react"
import { Moon, Sun, X } from "lucide-react"
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

   const resolvedLayout = layout[locale]
   return (
      <Sheet open={open} onOpenChange={setOpen}>
         <SheetTrigger
            className={cn(
               "text-accent-icon hover:text-text-primary w-8 items-center not-rtl:-ml-3 rtl:-mr-3",
               {
                  "text-text-primary": open,
               },
            )}
         >
            <Hamburger
               aria-label="Toggle navigation menu"
               duration={0.2}
               size={20}
               onToggle={setOpen}
               toggled={open}
            />
         </SheetTrigger>
         <SheetContent className="flex w-[80%] flex-col gap-4 overflow-auto p-3 sm:p-6">
            <SheetHeader className="hidden">
               <SheetTitle></SheetTitle>
            </SheetHeader>
            <AnimatePresence>
               {data && (
                  <motion.div
                     variants={fade}
                     animate="animate"
                     initial="initial"
                     exit="exit"
                     className="relative flex flex-col gap-6"
                  >
                     <SheetClose className="absolute top-0 right-2 z-10">
                        <X className="text-text-secondary hover:text-text-primary h-6 w-6" />
                     </SheetClose>
                     <div className="max-sm:hidden">
                        <div className="border-accent-border relative z-10 -mr-1 mb-3 aspect-square w-1/3 overflow-hidden rounded-full border object-cover object-center">
                           <ImageLoader
                              fill
                              className="h-full w-full object-cover object-center"
                              src={profileImage.src}
                              alt={profileImage.alt.en}
                           />
                        </div>

                        <h2 className="text-xl font-medium">{data.fullName}</h2>
                        <h4 className="text-text-trinary text-[15px]">
                           {data.job}
                        </h4>
                        <p className="text-text-secondary mt-3 text-sm">
                           {data.description}
                        </p>
                     </div>

                     <Divider
                        className="max-sm:mt-6"
                        title={resolvedLayout.settings}
                     >
                        <div className="mb-4 flex items-center gap-2 pt-2 text-sm rtl:flex-row-reverse rtl:justify-end">
                           <div className="text-text-secondary flex items-center gap-1">
                              <Moon className="h-4 w-4" />
                              {resolvedLayout.dark}
                           </div>
                           <Theme withIcons={false} />
                           <div className="text-text-secondary flex items-center gap-1">
                              <Sun className="h-4 w-4" />
                              {resolvedLayout.light}
                           </div>
                        </div>
                        <Language dropDown={false} />
                     </Divider>
                     <Divider title={resolvedLayout.explore}>
                        <div className="flex flex-col gap-1">
                           {pages.map(({ href, title, id }) => {
                              const Icon = iconMap[id]
                              return (
                                 <Link
                                    aria-label={`Go to ${title}`}
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

                     <Divider title={resolvedLayout.connect}>
                        <Contacts />
                     </Divider>
                  </motion.div>
               )}
            </AnimatePresence>
         </SheetContent>
      </Sheet>
   )
}

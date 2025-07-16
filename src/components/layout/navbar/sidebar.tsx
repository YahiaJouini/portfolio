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
import { iconMap, layout, profileImage } from "@/messages/global"
import { NavBar } from "@/messages/types/navbar"
import { Profile } from "@/messages/types/profile"
import { fade } from "@/utils/animations"
import { AnimatePresence, motion } from "framer-motion"
import { Slant as Hamburger } from "hamburger-react"
import Link from "next/link"
import { useState } from "react"

export default function Sidebar({ pages }: { pages: NavBar["items"] }) {
   const [open, setOpen] = useState(false)
   const { data, locale } = useTranslation<Profile>({
      translation: "profile",
      show: open,
   })

   const loading = !data || !locale
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
         <SheetContent className="flex flex-col gap-4 p-6">
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
                     className="flex flex-col gap-5"
                  >
                     <div>
                        <div className="border-accent-border relative z-10 -mr-1 mb-3 aspect-square w-1/3 overflow-hidden rounded-full border object-cover object-center">
                           <ImageLoader
                              fill
                              className="h-full w-full object-cover object-center"
                              src={profileImage.src}
                              alt={profileImage.alt.en}
                           />
                        </div>
                        <h2 className="text-xl font-medium">{data.fullName}</h2>
                        <h4 className="text-text-secondary text-[15px]">
                           {data.job}
                        </h4>
                        <p className="text-text-secondary mt-3 text-[13px]">
                           {data.description}
                        </p>
                     </div>
                     <Divider title={layout[locale].explore} />
                     <div className="flex flex-col gap-4">
                        {pages.map((page) => {
                           const Icon = iconMap[page.id]
                           return (
                              <Link
                                 key={page.href}
                                 href={page.href}
                                 className="hover:text-text-primary flex items-center gap-1 text-sm"
                              >
                                 <Icon />
                                 {page.title}
                              </Link>
                           )
                        })}
                     </div>
                     <Divider title={layout[locale].connect} />
                  </motion.div>
               )}
            </AnimatePresence>
         </SheetContent>
      </Sheet>
   )
}

const Divider = ({ title }: { title: string }) => {
   return (
      <div className="border-border-default flex items-center justify-between gap-1 border-b pb-1">
         <h3 className="text-text-secondary text-[13px] font-extralight">
            {title}
         </h3>
      </div>
   )
}

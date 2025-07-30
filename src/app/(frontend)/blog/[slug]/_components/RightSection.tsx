import Seperator from "@/components/global/Seperator"
import Tag from "@/components/global/Tag"
import { cn } from "@/lib/utils"
import { Blog } from "@/payload-types"
import { fade } from "@/utils/animations"
import { scrollToSection } from "@/utils/scroll-to"
import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import { ActiveBlogSection } from "../types"
import { useLocale } from "@/providers/Locale"
import { t } from "../../t"

type Props = {
   ref: React.RefObject<HTMLDivElement | null>
   isTocSticky: boolean
   activeSection: ActiveBlogSection
   tags: Blog["tags"]
   sections: Blog["sections"]
   hideToc: boolean
}
export default function RightSection({
   ref,
   isTocSticky,
   activeSection,
   tags,
   hideToc,
   sections,
}: Props) {
   const { locale } = useLocale()
   return (
      <div className="relative hidden w-[350px] shrink-0 lg:block">
         <div className="mb-6 w-full">
            <h4 className="mb-2 text-lg font-semibold">{t[locale].tags} </h4>
            <Seperator />
            <div className="flex flex-wrap gap-2">
               {tags.map(({ tag, id }) => (
                  <Tag text={tag} key={id} />
               ))}
            </div>
         </div>
         <div className="w-full" ref={ref}>
            <AnimatePresence mode="wait">
               {!hideToc && (
                  <motion.div
                     variants={fade}
                     initial="initial"
                     animate="animate"
                     exit="exit"
                     className={cn("relative w-[350px]", {
                        "fixed top-6 z-50": isTocSticky,
                        relative: !isTocSticky,
                     })}
                  >
                     <h4 className="mb-2 text-lg font-semibold">
                        {t[locale].tableOfContents}
                     </h4>
                     <Seperator />
                     <div className="space-y-2">
                        {sections.map((section) => (
                           <button
                              key={section.id}
                              onClick={() => scrollToSection(section.id)}
                              className={cn(
                                 "hover:bg-tag-bg hover:text-tag-color w-full rounded-md px-3 py-2 text-left text-sm",
                                 {
                                    "bg-tag-bg text-tag-color":
                                       activeSection === section.id,
                                 },
                              )}
                           >
                              {section.title}
                           </button>
                        ))}
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
   )
}

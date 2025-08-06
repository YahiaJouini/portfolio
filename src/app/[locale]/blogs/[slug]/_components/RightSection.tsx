import Seperator from "@/components/global/Seperator"
import Tag from "@/components/global/Tag"
import { cn } from "@/lib/utils"
import { Blog } from "@/payload-types"
import { fade } from "@/utils/animations"
import { scrollToSection } from "@/utils/scroll-to"
import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import { ActiveBlogSection } from "../types"
import { useLocale } from "@/hooks/useLocale"
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
   const locale = useLocale()
   return (
      <div className="relative hidden w-[250px] shrink-0 md:block md:w-[280px] lg:w-[320px] xl:w-[350px]">
         <div className="mb-3 w-full md:mb-4 lg:mb-6">
            <h4 className="mb-2 text-sm font-semibold md:text-base lg:text-lg">
               {t[locale].tags}{" "}
            </h4>
            <Seperator />
            <div className="flex flex-wrap gap-1 md:gap-1.5 lg:gap-2">
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
                     className={cn("relative", {
                        "fixed top-6 z-50 w-[250px] md:w-[280px] lg:w-[320px] xl:w-[350px]":
                           isTocSticky,
                        relative: !isTocSticky,
                     })}
                  >
                     <h4 className="mb-2 text-sm font-semibold md:text-base lg:text-lg">
                        {t[locale].tableOfContents}
                     </h4>
                     <Seperator />
                     <div className="space-y-1 md:space-y-1.5 lg:space-y-2">
                        {sections.map((section) => (
                           <button
                              aria-label={`Go to ${section.title} section`}
                              key={section.id}
                              onClick={() => scrollToSection(section.id)}
                              className={cn(
                                 "hover:bg-tag-bg hover:text-tag-color w-full rounded-md px-2 py-1 text-left text-xs md:px-2.5 md:py-1.5 md:text-xs lg:px-3 lg:py-2 lg:text-sm",
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

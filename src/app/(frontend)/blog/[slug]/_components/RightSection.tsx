import Tag from "@/components/global/Tag"
import { Blog } from "@/payload-types"
import { scrollToSection } from "@/utils/scroll-to"
import React from "react"
import { ActiveBlogSection } from "../types"
import Seperator from "@/components/global/Seperator"
import { cn } from "@/lib/utils"

type Props = {
   ref: React.RefObject<HTMLDivElement | null>
   isTocSticky: boolean
   activeSection: ActiveBlogSection
   tags: Blog["tags"]
   sections: Blog["sections"]
}
export default function RightSection({
   ref,
   isTocSticky,
   activeSection,
   tags,
   sections,
}: Props) {
   return (
      <div className="relative hidden w-1/3 md:block">
         <div className="mb-6 w-full">
            <h4 className="mb-2 text-lg font-semibold">Tags </h4>
            <Seperator />
            <div className="flex flex-wrap gap-2">
               {tags.map(({ tag, id }) => (
                  <Tag text={tag} key={id} />
               ))}
            </div>
         </div>
         <div className="w-full" ref={ref}>
            <div
               className={cn("relative", {
                  "fixed top-6 z-50 w-[calc(33.333%-2.5rem)] max-w-[300px]":
                     isTocSticky,
                  relative: !isTocSticky,
               })}
            >
               <h4 className="mb-2 text-lg font-semibold">
                  Table of Contents {isTocSticky ? "Sticky" : "Not Sticky"}
               </h4>
               <Seperator />
               <div className="space-y-2">
                  {sections.map((section) => (
                     <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={cn(
                           "hover:bg-tag-hover-bg hover:text-tag-hover-text w-full rounded-md px-3 py-2 text-left text-sm",
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
            </div>
         </div>
      </div>
   )
}

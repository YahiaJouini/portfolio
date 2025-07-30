import Seperator from "@/components/global/Seperator"
import Tag from "@/components/global/Tag"
import { cn } from "@/lib/utils"
import { Blog } from "@/payload-types"
import { scrollToSection } from "@/utils/scroll-to"
import React from "react"
import { ActiveBlogSection } from "../types"

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
      <div className="relative hidden w-[350px] shrink-0 lg:block">
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
               className={cn("relative w-[350px]", {
                  "fixed top-6 z-50": isTocSticky,
                  relative: !isTocSticky,
               })}
            >
               <h4 className="mb-2 text-lg font-semibold">Table of Contents</h4>
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
            </div>
         </div>
      </div>
   )
}

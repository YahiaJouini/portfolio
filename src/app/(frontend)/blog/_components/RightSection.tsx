import Tag from "@/components/global/Tag"
import { scrollToSection } from "@/utils/scroll-to"
import React from "react"
import { blogExample } from "../example"

type Props = {
   ref: React.RefObject<HTMLDivElement | null>
   isTocSticky: boolean
   activeSection: string | null
}
export default function RightSection({
   ref,
   isTocSticky,
   activeSection,
}: Props) {
   return (
      <div className="hidden w-1/3 md:block">
         <div className="mb-6 w-full">
            <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
               Tags
            </h4>
            <div className="mb-4 h-[2px] w-full bg-gray-200 dark:bg-gray-700" />
            <div className="flex flex-wrap gap-2">
               {blogExample.tags.map((tag, index) => (
                  <Tag text={tag} key={index} />
               ))}
            </div>
         </div>
         <div className="w-full" ref={ref}>
            <div
               className={`${isTocSticky ? "fixed top-6 z-50 w-[calc(33.333%-2.5rem)] max-w-[300px]" : "relative"}`}
            >
               <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  Table of Contents
               </h4>
               <div className="mb-4 h-[2px] w-full bg-gray-200 dark:bg-gray-700" />
               <div className="space-y-2">
                  {blogExample.sections.map((section) => (
                     <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full rounded-md px-3 py-2 text-left text-sm transition-all duration-200 ${
                           activeSection === section.id
                              ? "border-l-4 border-blue-500 bg-blue-50 pl-2 font-semibold text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                              : "font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                        }`}
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

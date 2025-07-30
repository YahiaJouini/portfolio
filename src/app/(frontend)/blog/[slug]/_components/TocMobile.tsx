import { Blog } from "@/payload-types"
import { scrollToSection } from "@/utils/scroll-to"
import { ActiveBlogSection } from "../types"

type Props = {
   activeSection: ActiveBlogSection
   sections: Blog["sections"]
}
export default function TocMobile({ activeSection, sections }: Props) {
   return (
      <div className="mb-8 w-full border-b border-gray-200 pb-6 md:hidden dark:border-gray-700">
         <h4 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Table of Contents
         </h4>
         <ul className="space-y-2">
            {sections.map((section) => (
               <li key={section.id}>
                  <button
                     onClick={() => scrollToSection(section.id)}
                     className={`w-full rounded-md px-4 py-2 text-left text-sm transition-all duration-200 ${
                        activeSection === section.id
                           ? "border-l-4 border-blue-500 bg-blue-50 font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                           : "text-gray-700 hover:bg-gray-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                     }`}
                  >
                     {section.title}
                  </button>
               </li>
            ))}
         </ul>
      </div>
   )
}

import { cn } from "@/lib/utils"
import { Blog } from "@/payload-types"
import { useLocale } from "@/hooks/useLocale"
import { scrollToSection } from "@/utils/scroll-to"
import { t } from "../../t"
import { ActiveBlogSection } from "../types"

type Props = {
   activeSection: ActiveBlogSection
   sections: Blog["sections"]
}
export default function TocMobile({ activeSection, sections }: Props) {
   const locale = useLocale()
   return (
      <div className="mb-8 w-full border-b border-gray-200 pb-6 md:hidden dark:border-gray-700">
         <h4 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            {t[locale].tableOfContents}
         </h4>
         <ul className="space-y-2">
            {sections.map((section) => (
               <li key={section.id}>
                  <button
                     aria-label={`Go to ${section.title} section`}
                     onClick={() => scrollToSection(section.id)}
                     className={cn(
                        "w-full rounded-md px-3 py-2 text-left text-sm",
                        {
                           "bg-tag-bg text-tag-color":
                              activeSection === section.id,
                        },
                     )}
                  >
                     {section.title}
                  </button>
               </li>
            ))}
         </ul>
      </div>
   )
}

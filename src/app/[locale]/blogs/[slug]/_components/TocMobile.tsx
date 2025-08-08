import Seperator from "@/components/global/Seperator"
import { useLocale } from "@/hooks/useLocale"
import { cn } from "@/lib/utils"
import { Blog } from "@/payload-types"
import { scrollToSection } from "@/utils/scroll-to"
import { t } from "../../t"
import { ActiveBlogSection } from "../types"
import TagsSection from "./TagsSection"

type Props = {
   activeSection: ActiveBlogSection
   sections: Blog["sections"]
   tags: Blog["tags"]
}
export default function TocMobile({ activeSection, sections, tags }: Props) {
   const locale = useLocale()
   return (
      <div className="mb-8 w-full border-b border-gray-200 pb-6 md:hidden dark:border-gray-700">
         <div className="pb-4">
            <TagsSection locale={locale} tags={tags} />
         </div>
         <h4 className="mb-2 text-sm font-semibold md:text-base lg:text-lg">
            {t[locale].tableOfContents}
         </h4>
         <Seperator className="mb-3" />
         <div className="space-y-2">
            {sections.map((section) => (
               <button
                  key={section.id}
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
            ))}
         </div>
      </div>
   )
}

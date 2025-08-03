import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { Education } from "@/messages/types"
import { Locale } from "@/types"
import { formatDateRange } from "@/utils/format-date"
import { Award, Calendar, ExternalLink } from "lucide-react"
import { t } from "../t"

export default function EducationCard({
   education,
   locale,
}: {
   education: Education
   locale: Locale
}) {
   const isCurrentRole = !education.endDate

   return (
      <div className="space-y-3 md:space-y-4">
         <div className="flex flex-col gap-2 md:gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
               <div className="mb-1.5 flex flex-col gap-2 md:mb-2 md:flex-row md:items-center md:gap-3">
                  <h3 className="text-text-primary text-lg font-semibold md:text-xl">
                     {education.degree}
                  </h3>
                  {isCurrentRole && (
                     <span className="bg-tag-bg text-tag-color border-tag-color/20 inline-flex w-fit items-center rounded-full border px-2 py-1 text-xs font-medium">
                        {t[locale].current}
                     </span>
                  )}
               </div>
               <p
                  className={cn(
                     "text-text-link text-base font-medium md:text-lg",
                     {
                        "mb-1": education.mention,
                     },
                  )}
               >
                  {education.institution}
               </p>
               <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2">
                  <p className="text-text-secondary text-sm md:text-base">
                     {education.fieldOfStudy}
                  </p>
                  {education.mention && (
                     <div className="flex items-center rtl:flex-row-reverse gap-1">
                        <Award className="text-accent-active h-3 w-3 md:h-4 md:w-4" />
                        <span className="bg-accent-active/10 text-accent-active inline-flex items-center rounded-full text-xs font-medium md:text-sm">
                           {education.mention}
                        </span>
                     </div>
                  )}
               </div>
            </div>

            <div className="text-text-secondary bg-tertiary flex items-center rounded-md px-2.5 py-1 md:px-3">
               <Calendar className="mr-1.5 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
               <span className="text-xs font-medium md:text-sm">
                  {formatDateRange(education.startDate, education.endDate)}
               </span>
            </div>
         </div>

         {education.description && (
            <div className="border-border-default space-y-2 border-t pt-2">
               <p className="text-text-secondary text-sm leading-relaxed md:text-base">
                  {education.description}
               </p>
               {education.certification && (
                  <Link
                     href={education.certification.href}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-text-link inline-flex items-center gap-1 text-xs font-medium transition-colors hover:underline md:text-sm"
                  >
                     {education.certification.title}
                     <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                  </Link>
               )}
            </div>
         )}
      </div>
   )
}

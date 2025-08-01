import { Experience } from "@/messages/types"
import { formatDateRange } from "@/utils/format-date"
import { Calendar, MapPin } from "lucide-react"

export default function ExperienceCard({
   experience,
}: {
   experience: Experience
}) {
   const isCurrentRole = !experience.endDate

   return (
      <div className="space-y-3 md:space-y-4">
         <div className="flex flex-col gap-2 md:gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
               <div className="mb-1.5 flex flex-col gap-2 md:mb-2 md:flex-row md:items-center md:gap-3">
                  <h3 className="text-text-primary text-lg font-semibold md:text-xl">
                     {experience.jobTitle}
                  </h3>
                  {isCurrentRole && (
                     <span className="bg-tag-bg text-tag-color border-tag-color/20 inline-flex w-fit items-center rounded-full border px-2 py-1 text-xs font-medium">
                        Current
                     </span>
                  )}
               </div>
               <p className="text-text-link mb-1 text-base font-medium md:text-lg">
                  {experience.company}
               </p>
               {experience.location && (
                  <div className="text-text-secondary flex items-center">
                     <MapPin className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                     <span className="text-xs md:text-sm">
                        {experience.location}
                     </span>
                  </div>
               )}
            </div>

            <div className="text-text-secondary bg-tertiary flex items-center rounded-md px-2.5 py-1 md:px-3">
               <Calendar className="mr-1.5 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
               <span className="text-xs font-medium md:text-sm">
                  {formatDateRange(experience.startDate, experience.endDate)}
               </span>
            </div>
         </div>

         {experience.description && (
            <div className="border-border-default border-t pt-2">
               <p className="text-text-secondary text-sm leading-relaxed md:text-base">
                  {experience.description}
               </p>
            </div>
         )}
      </div>
   )
}

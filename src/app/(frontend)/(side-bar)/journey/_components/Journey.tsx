"use client"

import { useState } from "react"
import type { Education, Experience } from "@/messages/types"
import { GraduationCap, Briefcase, MapPin, Calendar, Award } from "lucide-react"
import { shortNumericDate } from "@/utils/format-date"
import { Locale } from "@/messages/types/shared"
import { layout } from "@/messages/seperate/layout"
import { cn } from "@/lib/utils"

type Props = {
   education: Education[]
   experience: Experience[]
   locale: Locale
}

const views = ["experience", "education"] as const

function formatDateRange(startDate: string, endDate?: string): string {
   const start = shortNumericDate(startDate)
   const end = endDate ? shortNumericDate(endDate) : "Present"
   return `${start} - ${end}`
}

export default function Journey({ education, experience, locale }: Props) {
   const [activeView, setActiveView] =
      useState<(typeof views)[number]>("experience")
   const resolvedLayout = layout[locale]
   return (
      <div className="space-y-8">
         <div className="flex justify-center">
            <div className="bg-secondary border-border-default inline-flex rounded-lg border p-1">
               {views.map((view) => (
                  <button
                     key={view}
                     onClick={() => setActiveView(view)}
                     className={cn(
                        "flex items-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-200",
                        {
                           "bg-primary text-text-primary border-border-default border shadow-sm":
                              activeView === view,
                           "text-text-secondary hover:text-text-primary":
                              activeView !== view,
                        },
                     )}
                  >
                     <Briefcase className="mr-2 h-4 w-4" />
                     {resolvedLayout[view]}
                  </button>
               ))}
            </div>
         </div>

         <div className="relative">
            <div className="bg-border-default absolute top-0 bottom-0 left-6 w-0.5" />

            <div className="space-y-8">
               {activeView === "experience" &&
                  experience.map((exp, index) => (
                     <div key={index} className="relative flex items-start">
                        <div className="border-primary bg-hover relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-sm">
                           <Briefcase className="text-tag-color h-5 w-5" />
                        </div>

                        <div className="ml-8 flex-1">
                           <div className="bg-secondary border-border-default hover:border-accent-border rounded-lg border p-6 transition-colors">
                              <ExperienceCard experience={exp} />
                           </div>
                        </div>
                     </div>
                  ))}

               {activeView === "education" &&
                  education.map((edu, index) => (
                     <div key={index} className="relative flex items-start">
                        <div className="border-primary bg-hover relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-sm">
                           <GraduationCap className="text-accent-icon h-5 w-5" />
                        </div>

                        <div className="ml-8 flex-1">
                           <div className="bg-secondary border-border-default hover:border-accent-border rounded-lg border p-6 transition-colors">
                              <EducationCard education={edu} />
                           </div>
                        </div>
                     </div>
                  ))}
            </div>
         </div>
      </div>
   )
}

function ExperienceCard({ experience }: { experience: Experience }) {
   const isCurrentRole = !experience.endDate

   return (
      <div className="space-y-4">
         <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
               <div className="mb-2 flex items-center gap-3">
                  <h3 className="text-text-primary text-xl font-semibold">
                     {experience.jobTitle}
                  </h3>
                  {isCurrentRole && (
                     <span className="bg-tag-bg text-tag-color border-tag-color/20 inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium">
                        Current
                     </span>
                  )}
               </div>
               <p className="text-text-link mb-1 text-lg font-medium">
                  {experience.company}
               </p>
               {experience.location && (
                  <div className="text-text-secondary flex items-center">
                     <MapPin className="mr-1 h-4 w-4" />
                     <span className="text-sm">{experience.location}</span>
                  </div>
               )}
            </div>

            <div className="text-text-secondary bg-tertiary flex items-center rounded-md px-3 py-1">
               <Calendar className="mr-2 h-4 w-4" />
               <span className="text-sm font-medium">
                  {formatDateRange(experience.startDate, experience.endDate)}
               </span>
            </div>
         </div>

         {experience.description && (
            <div className="border-border-default border-t pt-2">
               <p className="text-text-secondary leading-relaxed">
                  {experience.description}
               </p>
            </div>
         )}
      </div>
   )
}

function EducationCard({ education }: { education: Education }) {
   const isCurrentRole = !education.endDate

   return (
      <div className="space-y-4">
         <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
               <div className="mb-2 flex items-center gap-3">
                  <h3 className="text-text-primary text-xl font-semibold">
                     {education.degree}
                  </h3>
                  {isCurrentRole && (
                     <span className="bg-tag-bg text-tag-color border-tag-color/20 inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium">
                        Current
                     </span>
                  )}
               </div>
               <p className="text-accent-icon text-lg font-medium">
                  {education.institution}
               </p>
               <p className="text-text-secondary">
                  {education.fieldOfStudy}
               </p>

               {education.mention && (
                  <div className="mt-3 flex items-center">
                     <Award className="text-accent-active mr-2 h-4 w-4" />
                     <span className="bg-accent-active/10 text-accent-active border-accent-active/20 inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium">
                        {education.mention}
                     </span>
                  </div>
               )}
            </div>

            <div className="text-text-secondary bg-tertiary flex items-center rounded-md px-3 py-1">
               <Calendar className="mr-2 h-4 w-4" />
               <span className="text-sm font-medium">
                  {formatDateRange(education.startDate, education.endDate)}
               </span>
            </div>
         </div>

         {education.description && (
            <div className="border-border-default border-t pt-2">
               <p className="text-text-secondary leading-relaxed">
                  {education.description}
               </p>
            </div>
         )}
      </div>
   )
}

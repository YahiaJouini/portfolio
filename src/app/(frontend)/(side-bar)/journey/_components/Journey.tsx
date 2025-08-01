"use client"

import { cn } from "@/lib/utils"
import type { Education, Experience } from "@/messages/types"
import { useLocale } from "@/providers/Locale"
import { Briefcase, GraduationCap } from "lucide-react"
import React, { useState } from "react"
import { t } from "../t"
import EducationCard from "./EducationCard"
import ExperienceCard from "./ExperienceCard"

type Props = {
   education: Education[]
   experience: Experience[]
}

const views = ["experience", "education"] as const

export default function Journey({ education, experience }: Props) {
   const [activeView, setActiveView] =
      useState<(typeof views)[number]>("experience")
   const { locale } = useLocale()
   const resolvedLayout = t[locale]
   return (
      <div className="space-y-6 md:space-y-8">
         <div className="flex justify-center">
            <div className="bg-secondary border-border-default inline-flex rounded-lg border p-1">
               {views.map((view) => (
                  <button
                     key={view}
                     onClick={() => setActiveView(view)}
                     className={cn(
                        "flex items-center rounded-md border px-3 py-1.5 text-xs font-medium transition-all duration-200 md:px-4 md:py-2 md:text-sm",
                        {
                           "bg-primary text-text-primary border-border-default":
                              activeView === view,
                           "text-text-secondary hover:text-text-primary border-transparent":
                              activeView !== view,
                        },
                     )}
                  >
                     <Briefcase className="mr-1.5 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
                     {resolvedLayout[view]}
                  </button>
               ))}
            </div>
         </div>

         <div className="relative">
            <div className="bg-border-default absolute top-0 bottom-0 left-5 w-0.5 md:left-6" />

            <div className="space-y-6 md:space-y-8">
               {activeView === "experience" &&
                  experience.map((exp, index) => (
                     <Container
                        key={index}
                        icon={
                           <Briefcase className="text-tag-color h-4 w-4 md:h-5 md:w-5" />
                        }
                     >
                        <ExperienceCard experience={exp} />
                     </Container>
                  ))}

               {activeView === "education" &&
                  education.map((edu, index) => (
                     <Container
                        key={index}
                        icon={
                           <GraduationCap className="text-accent-icon h-4 w-4 md:h-5 md:w-5" />
                        }
                     >
                        <EducationCard education={edu} />
                     </Container>
                  ))}
            </div>
         </div>
      </div>
   )
}

function Container({
   children,
   icon,
}: {
   children: React.ReactNode
   icon: React.ReactNode
}) {
   return (
      <div className="relative flex items-start gap-2 md:gap-5 lg:gap-8">
         <div className="border-primary bg-hover relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-sm md:h-12 md:w-12">
            {icon}
         </div>

         <div className="flex-1">
            <div className="bg-secondary border-border-default hover:border-accent-border rounded-lg border p-4 transition-colors md:p-6">
               {children}
            </div>
         </div>
      </div>
   )
}

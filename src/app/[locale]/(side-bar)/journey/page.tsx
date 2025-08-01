import { Education, Experience } from "@/messages/types"
import { Locale } from "@/types"
import { getTranslation } from "@/utils/get-translation"
import { Briefcase, GraduationCap } from "lucide-react"
import { SearchParams } from "nuqs"
import EducationCard from "./_components/EducationCard"
import ExperienceCard from "./_components/ExperienceCard"
import Section from "./_components/Section"
import { loadSearchParams } from "./search-params"

type Props = {
   searchParams: Promise<SearchParams>
   params: Promise<{ locale: Locale }>
}

export default async function page({ params, searchParams }: Props) {
   const [{ locale }, { view }] = await Promise.all([
      params,
      loadSearchParams(searchParams),
   ])

   // load all because it's a small dataset
   const [education, experience] = await Promise.all([
      getTranslation<Education[]>(locale, "education"),
      getTranslation<Experience[]>(locale, "experience"),
   ])

   return (
      <div className="bg-primary min-h-screen space-y-6 md:space-y-8">
         <div className="flex justify-center">
            <Section />
         </div>
         <div className="relative">
            <div className="bg-border-default absolute top-0 bottom-0 left-5 w-0.5 md:left-6" />

            <div className="space-y-6 md:space-y-8">
               {view === "experience" &&
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

               {view === "education" &&
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

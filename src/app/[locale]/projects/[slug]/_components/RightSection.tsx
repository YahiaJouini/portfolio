import Seperator from "@/components/global/Seperator"
import Tag from "@/components/global/Tag"
import Tick from "@/components/global/Tick"
import Summary from "@/components/icons/Summary"
import { summaryKeys } from "@/messages/seperate/project-related"
import { Project } from "@/payload-types"
import { Locale } from "@/types"
import { t } from "../t"
import { LanguageBar } from "./LanguageBar"

type Props = {
   project: Project
   locale: Locale
}

export default function RightSection({ project, locale }: Props) {
   const { topics, languages, roles, summary } = project
   const resolvedLayout = t[locale]
   return (
      <div className="flex flex-1 flex-col gap-6">
         <div className="flex flex-col gap-3">
            <div>
               <SectionTitle title={resolvedLayout.about} />
               <p>{project.description}</p>
            </div>

            {topics && topics.length > 0 && (
               <div className="flex flex-wrap items-center gap-2">
                  {topics.map(({ name, id }) => (
                     <Tag text={name} key={id} />
                  ))}
               </div>
            )}

            <div className="flex flex-col gap-1">
               {roles.map(({ role }) => (
                  <div key={role} className="flex items-center gap-1">
                     <div className="h-[17px] w-[17px]">
                        <Tick />
                     </div>
                     <p className="text-text-secondary text-sm">{role}</p>
                  </div>
               ))}
            </div>
         </div>
         <Seperator />
         <div>
            <SectionTitle title={resolvedLayout.summary} />
            <div className="flex flex-col items-start gap-2">
               {summary.map(({ category, values }) => {
                  const size = values.length
                  return (
                     <div key={category} className="flex items-start gap-2">
                        <Summary />
                        <div>
                           <p className="text-sm font-medium">
                              {summaryKeys[category][locale]}
                           </p>
                           <div className="mt-1 flex flex-wrap gap-1">
                              {values.map(({ value }, index) => (
                                 <p
                                    key={`${value}-${index}`}
                                    className="text-text-secondary hover:text-text-link cursor-default text-sm hover:underline"
                                 >
                                    {value}
                                    {index < size - 1 ? "," : ""}
                                 </p>
                              ))}
                           </div>
                        </div>
                     </div>
                  )
               })}
            </div>
         </div>
         <Seperator />

         {languages && languages.length > 0 && (
            <div>
               <SectionTitle title={resolvedLayout.languages} />
               <LanguageBar languages={languages} />
            </div>
         )}
      </div>
   )
}

const SectionTitle = ({ title }: { title: string }) => (
   <h4 className="mb-2 text-[17px] font-semibold">{title}</h4>
)

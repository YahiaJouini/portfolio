import Tick from "@/components/global/Tick"
import Summary from "@/components/icons/Summary"
import { layout } from "@/messages/seperate/layout"
import { summaryKeys } from "@/messages/seperate/project-related"
import { Locale } from "@/types"
import { LanguageBar } from "./LanguageBar"
import { ProjectDetail } from "@/types"
import Tag from "@/components/global/Tag"
import Seperator from "@/components/global/Seperator"

type Props = {
   project: ProjectDetail
   locale: Locale
}
export default function RightSection({ project, locale }: Props) {
   const { repoMeta, ...rest } = project
   const resolvedLayout = layout[locale]
   return (
      <div className="flex flex-1 flex-col gap-6">
         <div className="flex flex-col gap-3">
            <div>
               <SectionTitle title={resolvedLayout.about} />
               <p>{project.description}</p>
            </div>

            {repoMeta && repoMeta.topics.nodes.length > 0 && (
               <div className="flex flex-wrap items-center gap-2">
                  {repoMeta.topics.nodes.map(({ topic }) => (
                     <Tag text={topic.name} key={topic.name} />
                  ))}
               </div>
            )}

            <div className="flex flex-col gap-1">
               {rest.roles.map(({ role }) => (
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
               {rest.summary.map(({ category, values }) => {
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

         {repoMeta?.languages && (
            <div>
               <SectionTitle title={resolvedLayout.languages} />
               <LanguageBar languages={repoMeta.languages} />
            </div>
         )}
      </div>
   )
}

const SectionTitle = ({ title }: { title: string }) => (
   <h4 className="mb-2 text-[17px] font-semibold">{title}</h4>
)

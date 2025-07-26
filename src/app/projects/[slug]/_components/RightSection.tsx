import { layout } from "@/messages/seperate/layout"
import { Locale } from "@/messages/types/shared"
import { DetailedProject } from "@/services/project"

type Props = {
   project: DetailedProject
   locale: Locale
}
export default function RightSection({ project, locale }: Props) {
   const { repoMeta, ...rest } = project
   return (
      <div className="flex flex-1 flex-col gap-3">
         <div>
            <h3 className="text-xl font-bold">{layout[locale].about}</h3>
            <p className="mt-2">{project.description}</p>
         </div>

         {repoMeta && repoMeta.topics.nodes.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
               {repoMeta.topics.nodes.map(({ topic }) => (
                  <span
                     key={topic.name}
                     className="bg-tag-bg text-tag-color hover:bg-tag-hover-bg hover:text-tag-hover-text rounded-md px-2 py-1 text-xs font-semibold transition-colors"
                  >
                     {topic.name}
                  </span>
               ))}
            </div>
         )}
      </div>
   )
}

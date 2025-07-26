import { layout } from "@/messages/seperate/layout"
import { Locale } from "@/messages/types/shared"
import { DetailedProject } from "@/services/project"

type Props = {
   project: DetailedProject
   locale: Locale
}
export default function RightSection({ project, locale }: Props) {
   return (
      <div className="flex flex-1 flex-col gap-2">
         <h3 className="text-xl font-bold">{layout[locale].about}</h3>
         <p>{project.description}</p>

         <div className="flex items-center gap-2">
            <div className="">

            </div>
         </div>
      </div>
   )
}

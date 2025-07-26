import { Locale } from "@/messages/types/shared"
import { DetailedProject } from "@/services/project"

type Props = {
   project: DetailedProject
   locale: Locale
}
export default function RightSection({ project, locale }: Props) {
   return (
      <div className="flex-1 bg-red-200">
         <h3></h3>
      </div>
   )
}

import { layout } from "@/messages/seperate/layout"
import { Locale } from "@/messages/types/shared"
import { Project } from "@/payload-types"

type Props = {
   isPublic: Project["public"]
   locale: Locale
}
export default async function ProjectVisibility({ isPublic, locale }: Props) {
   return (
      <div className="border-accent-border text-accent-icon rounded-full border px-[5px] py-[3px] text-xs leading-none font-semibold max-md:hidden">
         {isPublic ? layout[locale].public : layout[locale].private}
      </div>
   )
}

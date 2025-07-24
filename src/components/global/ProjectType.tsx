import { Project } from "@/messages/types"

export default function ProjectType({
   isPublic,
}: {
   isPublic: Project["public"]
}) {
   return (
      <span className="border-accent-border text-accent-icon rounded-full border px-[5px] py-[3px] text-[11.9px] leading-none font-semibold max-md:hidden">
         {isPublic ? "Public" : "Private"}
      </span>
   )
}

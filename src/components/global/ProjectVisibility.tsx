import { Project } from "@/messages/types"

export default function ProjectVisibility({
   isPublic,
}: {
   isPublic: Project["public"]
}) {
   return (
      <div className="border-accent-border text-accent-icon rounded-full border px-[5px] py-[3px] text-xs leading-none font-semibold max-md:hidden">
         {isPublic ? "Public" : "Private"}
      </div>
   )
}

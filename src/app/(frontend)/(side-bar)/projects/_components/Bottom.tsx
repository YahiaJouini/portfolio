import Code from "@/components/icons/Code"
import Eye from "@/components/icons/Eye"
import { layout } from "@/messages/seperate/layout"
import Link from "next/link"
import { Props } from "../types"

export default function Bottom({ project, locale }: Props) {
   return (
      <div className="mt-4 flex flex-wrap items-center gap-1">
         <div
            className="h-[12px] w-[12px] rounded-full"
            style={{
               backgroundColor: project.primaryLanguage.color ?? "#000",
            }}
         />
         <p className="text-text-secondary text-xs">
            {project.primaryLanguage.name ?? "Unknown"}
         </p>
         {project.website && (
            <Link
               target="_blank"
               rel="noopener noreferrer"
               className="text-text-secondary hover:text-text-link ml-4 flex items-center gap-1 text-xs hover:underline max-[265px]:hidden"
               href={project.website}
            >
               <Eye />
               {layout[locale].visit}
            </Link>
         )}
         {project.public && (
            <Link
               target="_blank"
               rel="noopener noreferrer"
               className="text-text-secondary hover:text-text-link ml-4 flex items-center gap-1 text-xs hover:underline max-[265px]:hidden"
               href={project.github}
            >
               <Code />
               Code
            </Link>
         )}
      </div>
   )
}

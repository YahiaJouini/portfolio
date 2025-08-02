import Code from "@/components/icons/Code"
import Eye from "@/components/icons/Eye"
import { Link } from "@/i18n/navigation"
import { t } from "../t"
import { Props } from "../types"

export default function Bottom({ project, locale }: Props) {
   return (
      <div className="mt-4 flex flex-wrap items-center gap-1">
         <div
            className="h-[12px] w-[12px] rounded-full"
            style={{
               backgroundColor: project.primaryLanguageColor ?? "#000",
            }}
         />
         <p className="text-text-secondary text-xs">
            {project.primaryLanguage ?? "Unknown"}
         </p>
         {project.demoUrl && (
            <Link
               target="_blank"
               rel="noopener noreferrer"
               className="text-text-secondary hover:text-text-link ml-4 flex items-center gap-1 text-xs hover:underline max-[265px]:hidden"
               href={project.demoUrl}
            >
               <Eye />
               {t[locale].visit}
            </Link>
         )}
         {project.public && (
            <Link
               target="_blank"
               rel="noopener noreferrer"
               className="text-text-secondary hover:text-text-link ml-4 flex items-center gap-1 text-xs hover:underline max-[265px]:hidden"
               href={project.githubUrl}
            >
               <Code />
               Code
            </Link>
         )}
      </div>
   )
}

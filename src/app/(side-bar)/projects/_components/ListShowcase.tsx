import Code from "@/components/icons/code"
import Eye from "@/components/icons/eye"
import { ProjectWithLang } from "@/graphql/github-repo"
import Link from "next/link"

export default function ListShowcase({
   project,
}: {
   project: ProjectWithLang
}) {
   return (
      <div className="border-accent-border mt-6 flex w-full justify-between border-b pb-4 max-[430px]:px-4 max-md:px-6 md:pb-5">
         <div className="flex-1">
            <h4 className="flex flex-wrap items-center gap-2">
               <span>
                  <Link
                     className="text-text-link text-lg font-semibold hover:underline md:text-xl"
                     href={`/projects/${project.id}`}
                  >
                     {project.title}
                  </Link>
               </span>
               <span className="border-accent-border text-accent-icon rounded-full border px-[5px] py-[3px] text-[11.9px] leading-none font-semibold max-md:hidden">
                  {project.public ? "Public" : "Private"}
               </span>
            </h4>
            <p className="text-text-secondary mt-1 mb-2 pr-6 text-sm">
               {project.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-1">
               <div
                  className="h-[12px] w-[12px] rounded-full"
                  style={{
                     backgroundColor: project.primaryLanguage.color ?? "#000",
                  }}
               ></div>
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
                     Demo
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
         </div>
      </div>
   )
}

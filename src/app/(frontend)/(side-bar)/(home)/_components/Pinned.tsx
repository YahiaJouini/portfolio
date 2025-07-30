import ProjectVisibility from "@/components/global/ProjectVisibility"
import Repo from "@/components/icons/Repo"
import { cn } from "@/lib/utils"
import { layout } from "@/messages/seperate/layout"
import { Locale } from "@/types"
import { ProjectService } from "@/services/project"
import Link from "next/link"

export default async function Pinned({ locale }: { locale: Locale }) {
   const pinned = await ProjectService.getProjects({
      pinned: true,
      locale,
      page: 1,
   })
   if (!pinned || pinned.length === 0) return null
   return (
      <div>
         <h2 className="mt-8 mb-1">{layout[locale].pinned}</h2>
         <div className="mt-2 grid w-full grid-cols-2 gap-4 max-md:hidden">
            {pinned.map((project) => {
               return (
                  <div
                     key={project.slug}
                     className="border-border-default flex min-h-[125px] flex-col justify-between rounded-md border p-4"
                  >
                     <div className="flex items-center justify-start">
                        <Repo />
                        <Link
                           className="mr-2 w-auto overflow-hidden text-sm font-semibold text-nowrap hover:underline"
                           href={`/projects/${project.slug}`}
                        >
                           {project.title}
                        </Link>
                        <ProjectVisibility
                           locale={locale}
                           isPublic={project.public}
                        />
                     </div>

                     <p className="text-text-secondary my-2.5 line-clamp-3 text-sm">
                        {project.description}
                     </p>

                     <div className="flex items-center justify-start gap-2">
                        <div
                           className={cn(
                              "bg-accent-active h-3 w-3 rounded-full",
                              {
                                 "bg-[#0969da]": project.type === "work",
                              },
                           )}
                        />
                        <p className="text-text-secondary text-xs leading-none hover:underline">
                           /{project.type}
                        </p>
                     </div>
                  </div>
               )
            })}
         </div>
      </div>
   )
}

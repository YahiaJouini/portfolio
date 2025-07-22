import Repo from "@/components/icons/repo"
import { cn } from "@/lib/utils"
import { Project } from "@/messages/types"
import { Locale } from "@/messages/types/shared"
import { getTranslation } from "@/utils/get-translation"
import Link from "next/link"

export default async function Pinned({ locale }: { locale: Locale }) {
   const data = await getTranslation<Array<Project>>(locale, "projects")
   const pinned = data.filter((project) => project.pinned)
   return (
      <div>
         <h2 className="mt-8 mb-1">Pinned</h2>
         <div className="mt-2 grid w-full grid-cols-2 gap-4 max-md:hidden">
            {pinned.map((project) => {
               return (
                  <div
                     key={project.github}
                     className="border-border-default flex min-h-[125px] flex-col justify-between rounded-md border p-4"
                  >
                     <div className="flex items-center justify-start">
                        <Repo />
                        <Link
                           className="w-auto overflow-hidden text-sm font-semibold text-nowrap hover:underline"
                           href={`/projects/${project.id}`}
                        >
                           {project.title}
                        </Link>
                        <div className="border-accent-border text-accent-icon ml-3 rounded-full border p-1 text-[11.9px] leading-none font-semibold">
                           Public
                        </div>
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

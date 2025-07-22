import { projectsWithLang } from "@/graphql/github-repo"
import { Project } from "@/messages/types"
import { getTranslation } from "@/utils/get-translation"
import { loadSearchParams } from "@/utils/project-filters"
import { getServerLocale } from "@/utils/server-locale"
import type { SearchParams } from "nuqs/server"
import Filter from "./_components/Filter"
import GridShowcase from "./_components/GridShowcase"
import ListShowcase from "./_components/ListShowcase"

type Props = {
   searchParams: Promise<SearchParams>
}

export default async function Page({ searchParams }: Props) {
   const { layout, tags } = await loadSearchParams(searchParams)
   const locale = await getServerLocale()
   const data = await getTranslation<Array<Project>>(locale, "projects")
   const projects = await projectsWithLang(data)

   if (projects.length === 0) {
      return (
         <div className="flex h-full w-full items-center justify-center">
            <p className="text-text-secondary">No projects found</p>
         </div>
      )
   }
   return (
      <div className="w-full">
         <Filter locale={locale} />
         <div className="mt-6">
            {layout === "list" && (
               <div className="flex flex-col">
                  {projects.map((project) => (
                     <ListShowcase
                        key={project.id}
                        project={project}
                        locale={locale}
                     />
                  ))}
               </div>
            )}

            {layout === "grid" && (
               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {projects.map((project) => (
                     <GridShowcase
                        key={project.id}
                        project={project}
                        locale={locale}
                     />
                  ))}
               </div>
            )}
         </div>
      </div>
   )
}

import { projectsWithLang } from "@/graphql/github-repo"
import { ProjectService } from "@/services/project"
import { getPaginatedData } from "@/utils/pagination"
import { loadSearchParams } from "./project-filters"
import { getServerLocale } from "@/utils/server-locale"
import type { SearchParams } from "nuqs/server"
import Pagination from "@/components/global/Pagination"
import Filter from "./_components/Filter"
import GridShowcase from "./_components/GridShowcase"
import ListShowcase from "./_components/ListShowcase"

type Props = {
   searchParams: Promise<SearchParams>
}

export default async function Page({ searchParams }: Props) {
   const { layout, page } = await loadSearchParams(searchParams)
   const locale = await getServerLocale()
   const data = await ProjectService.getProjects({
      locale,
      page,
      pinned: false,
   })

   const { items, ...paginationProps } = getPaginatedData(data, page)
   const projects = await projectsWithLang(items)

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
               <div className="flex flex-col gap-4">
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

            <Pagination {...paginationProps} />
         </div>
      </div>
   )
}

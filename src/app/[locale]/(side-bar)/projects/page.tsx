import Pagination from "@/components/global/Pagination"
import { projectsWithLang } from "@/graphql/github-repo"
import { ProjectService } from "@/services/project"
import { LocaleParams } from "@/types"
import { getPaginatedData } from "@/utils/pagination"
import type { SearchParams } from "nuqs/server"
import Filter from "./_components/Filter"
import GridShowcase from "./_components/GridShowcase"
import ListShowcase from "./_components/ListShowcase"
import { loadSearchParams } from "./project-filters"
import { t } from "./t"

type Props = {
   searchParams: Promise<SearchParams>
   params: LocaleParams["params"]
}

export default async function Page({ searchParams, params }: Props) {
   const [{ locale }, { layout, page }] = await Promise.all([
      params,
      loadSearchParams(searchParams),
   ])
   const data = await ProjectService.getProjects({
      locale,
      page,
      pinned: false,
   })

   const { items, ...paginationProps } = getPaginatedData(data, page)
   const projects = await projectsWithLang(items)

   if (projects.length == 0) {
      return (
         <div className="w-full text-center">
            <h2 className="text-2xl font-bold">{t[locale].noProjectsFound}</h2>
            <p className="text-text-secondary mt-2">
               {t[locale].noProjectsFoundDescription}
            </p>
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

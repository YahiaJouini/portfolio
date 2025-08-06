import { Skeleton } from "@/components/ui/skeleton"
import { Link } from "@/i18n/navigation"
import { Props } from "../types"
import Bottom from "./Bottom"
import ProjectVisibility from "@/components/global/ProjectVisibility"

export default function ListShowcase({ project, locale }: Props) {
   return (
      <div className="border-accent-border flex w-full justify-between border-b pb-4 md:pb-5">
         <div className="flex-1">
            <h4 className="flex flex-wrap items-center gap-2">
               <Link
                  aria-label="View project details"
                  className="text-text-link text-lg font-semibold hover:underline md:text-xl"
                  href={`/projects/${project.slug}`}
               >
                  {project.title}
               </Link>
               <ProjectVisibility isPublic={project.public} locale={locale} />
            </h4>
            <p className="text-text-secondary mt-1 line-clamp-3 w-[95%] text-sm">
               {project.description}
            </p>
            <Bottom project={project} locale={locale} />
         </div>
      </div>
   )
}

export function ListShowcaseSkeleton() {
   return (
      <div className="border-accent-border flex w-full justify-between border-b pb-4">
         <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
               <Skeleton className="h-5 w-56 md:h-6 md:w-64" />
               <Skeleton className="mt-1 h-5 w-12 rounded-full max-md:hidden" />
            </div>
            <div className="mt-2 w-[95%]">
               <Skeleton className="h-4 w-full" />
               <Skeleton className="mt-1 h-4 w-3/4" />
            </div>
            <div className="mt-3 flex items-center gap-4">
               <Skeleton className="h-4 w-16" />
               <Skeleton className="h-4 w-20" />
               <Skeleton className="h-4 w-12" />
            </div>
         </div>
      </div>
   )
}

import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { Props } from "../types"
import Bottom from "./Bottom"

export default function ListShowcase({ project, locale }: Props) {
   return (
      <div className="border-accent-border flex w-full justify-between border-b pb-4 max-[430px]:px-4 max-md:px-6 md:pb-5">
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
              
            </h4>
            <p className="text-text-secondary mt-1 w-[95%] text-sm">
               {project.description}
            </p>
            <Bottom project={project} locale={locale} />
         </div>
      </div>
   )
}

export function ListShowcaseSkeleton() {
   return (
      <div className="border-accent-border flex w-full justify-between border-b pb-4 max-[430px]:px-4 max-md:px-6 md:pb-5">
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

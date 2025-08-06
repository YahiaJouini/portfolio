import ImageLoader from "@/components/global/ImageLoader"
import { Link } from "@/i18n/navigation"
import { Props } from "../types"
import Bottom from "./Bottom"
import ProjectVisibility from "@/components/global/ProjectVisibility"

export default function GridShowcase({ locale, project }: Props) {
   return (
      <div className="border-border-default flex flex-col justify-between rounded-md border p-4">
         <div className="flex flex-col gap-2">
            {typeof project.thumbnail !== "number" && (
               <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-md">
                  <ImageLoader
                     src={project.thumbnail.url}
                     alt={project.thumbnail.alt}
                     fill
                     className="object-cover"
                  />
               </div>
            )}
            <div className="flex flex-wrap items-center gap-2">
               <Link
                  aria-label="View project details"
                  className="text-text-link text-lg font-semibold hover:underline md:text-xl"
                  href={`/projects/${project.slug}`}
               >
                  {project.title}
               </Link>
               <ProjectVisibility isPublic={project.public} locale={locale} />
            </div>

            <p className="text-text-secondary mt-1 text-sm">
               {project.description}
            </p>
         </div>
         <Bottom project={project} locale={locale} />
      </div>
   )
}

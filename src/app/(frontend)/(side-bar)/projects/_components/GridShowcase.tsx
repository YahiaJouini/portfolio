import Link from "next/link"
import { Props } from "../types"
import Bottom from "./Bottom"

export default function GridShowcase({ locale, project }: Props) {
   return (
      <div className="border-border-default flex flex-col justify-between rounded-md border p-4">
         <div className="flex flex-col gap-2">
            <div className="mx-auto aspect-video w-full bg-slate-300"></div>
            <Link
               className="text-text-link text-lg font-semibold hover:underline md:text-xl"
               href={`/projects/${project.id}`}
            >
               {project.title}
            </Link>
            <p className="text-text-secondary mt-1 text-sm">
               {project.description}
            </p>
         </div>
         <Bottom project={project} locale={locale} />
      </div>
   )
}

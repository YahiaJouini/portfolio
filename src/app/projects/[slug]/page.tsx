import ImageLoader from "@/components/global/ImageLoader"
import Eye from "@/components/icons/Eye"
import { profileImage } from "@/messages/global"
import { layout } from "@/messages/seperate/layout"
import { ProjectService } from "@/services/project"
import { readableISO } from "@/utils/readable-iso"
import RenderMarkdown from "@/utils/render-markdown"
import { getServerLocale } from "@/utils/server-locale"
import Link from "next/link"
import DisplaySection from "./_components/DisplaySection"

export default async function page({
   params,
}: {
   params: Promise<{ slug: string }>
}) {
   const slug = (await params).slug
   const locale = await getServerLocale()
   const project = await ProjectService.getProjectWithMeta(locale, slug)
   if (!project) {
      return (
         <div className="mx-auto w-full max-w-4xl">
            <h1 className="text-2xl font-bold">Project Not Found</h1>
            <p className="text-text-secondary mt-2">
               The project you are looking for does not exist.
            </p>
         </div>
      )
   }
   return (
      <div className="mx-auto w-full">
         <div className="border-default-border mb-4 flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-3">
               <div className="relative h-8 w-8 rounded-full">
                  <ImageLoader
                     src={profileImage.src}
                     alt={profileImage.alt[locale]}
                     fill
                     className="rounded-full object-cover"
                  />
               </div>
               <h3 className="text-lg font-bold">{project.title}</h3>
            </div>
            <p>{readableISO(project.createdAt)}</p>
         </div>

         {project.website && (
            <Link
               target="_blank"
               rel="noopener noreferrer"
               className="bg-text-link flex w-fit items-center gap-1 rounded-md px-3 py-1.5 font-medium text-white"
               href={project.website}
            >
               <Eye />
               {layout[locale].visit}
            </Link>
         )}
         <div className="border-border-default mt-6 w-[60%] rounded-md border">
            <DisplaySection locale={locale} />
            <div className="p-4">
               <RenderMarkdown content={project.readme} />
            </div>
         </div>
      </div>
   )
}

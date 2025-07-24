import ImageLoader from "@/components/global/ImageLoader"
import Eye from "@/components/icons/Eye"
import { profileImage } from "@/messages/global"
import { layout } from "@/messages/seperate/layout"
import { Project } from "@/messages/types"
import { Locale } from "@/messages/types/shared"
import { ProjectService } from "@/services/project"
import { readableISO } from "@/utils/readable-iso"
import RenderMarkdown from "@/utils/render-markdown"
import { getServerLocale } from "@/utils/server-locale"
import fs from "fs"
import Link from "next/link"
import path from "path"

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
               className="bg-text-link flex w-fit items-center gap-1 rounded-md px-3 py-1.5 font-medium"
               href={project.website}
            >
               <Eye />
               {layout[locale].visit}
            </Link>
         )}
         <div className="mt-6 max-w-4xl">
            <RenderMarkdown content={getReadMe(project.id, locale)} />
         </div>
      </div>
   )
}

const getReadMe = (name: Project["id"], locale: Locale): string => {
   const filePath = path.join(
      process.cwd(),
      "src/messages/markdown",
      name,
      `${locale}.md`,
   )
   return fs.readFileSync(filePath, "utf-8")
}

import ImageLoader from "@/components/global/ImageLoader"
import { profileImage } from "@/messages/global"
import { Project } from "@/messages/types"
import { Locale } from "@/messages/types/shared"
import { getProject } from "@/utils/get-translation"
import RenderMarkdown from "@/utils/render-markdown"
import { getServerLocale } from "@/utils/server-locale"
import fs from "fs"
import path from "path"

export default async function page({
   params,
}: {
   params: Promise<{ slug: string }>
}) {
   const slug = (await params).slug
   const locale = await getServerLocale()
   const project = await getProject(locale, slug)

   if (!project) {
      return <div className="w-full">Project does not exist</div>
   }

   const readMe = getReadMe(project.id, locale)

   return (
      <div className="mx-auto w-full px-6 py-8">
         <div className="border-default-border mb-4 border-b pb-3">
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
         </div>
         <div className="max-w-4xl">
            <RenderMarkdown content={readMe} />
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

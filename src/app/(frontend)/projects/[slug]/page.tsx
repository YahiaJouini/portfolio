import ImageLoader from "@/components/global/ImageLoader"
import ProjectVisibility from "@/components/global/ProjectVisibility"
import Eye from "@/components/icons/Eye"
import { profileImage } from "@/messages/global"
import { layout } from "@/messages/seperate/layout"
import { ProjectService } from "@/services/project"
import { readableISO } from "@/utils/readable-iso"
import { customConverters } from "@/utils/richtext"
import { getServerLocale } from "@/utils/server-locale"
import { RichText } from "@payloadcms/richtext-lexical/react"
import Link from "next/link"
import { SearchParams } from "nuqs"
import DisplaySection from "./_components/DisplaySection"
import RightSection from "./_components/RightSection"
import { loadSearchParams } from "./project-filters"
import ScreenShots from "./_components/ScreenShots"

type Props = {
   params: Promise<{ slug: string }>
   searchParams: Promise<SearchParams>
}
export default async function page({ params, searchParams }: Props) {
   const slug = (await params).slug
   const { display } = await loadSearchParams(searchParams)
   const locale = await getServerLocale()
   const project = await ProjectService.getProject({ locale, slug })

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
               <ProjectVisibility
                  locale={locale}
                  isPublic={project.public === true}
               />
            </div>
            {!project.public ? (
               <p>{readableISO(project.createdAt)}</p>
            ) : project.repoMeta ? (
               <p>{readableISO(project.repoMeta.createdAt)}</p>
            ) : null}
         </div>

         {project.demoUrl && (
            <Link
               target="_blank"
               rel="noopener noreferrer"
               className="flex w-fit items-center gap-1 rounded-md bg-[#0969da] px-3 py-1.5 font-medium text-white"
               href={project.demoUrl}
            >
               <Eye />
               {layout[locale].visit}
            </Link>
         )}
         <div className="flex items-start justify-between gap-10">
            <div className="border-border-default mt-6 rounded-md border xl:w-[70%]">
               <DisplaySection locale={locale} />
               <div className="p-6">
                  {display === "readme" ? (
                     <RichText
                        disableContainer
                        data={project.richText}
                        converters={customConverters}
                     />
                  ) : (
                     <ScreenShots images={project.images} />
                  )}
               </div>
            </div>
            <RightSection locale={locale} project={project} />
         </div>
      </div>
   )
}

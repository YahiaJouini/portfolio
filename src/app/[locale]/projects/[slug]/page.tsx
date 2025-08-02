import ImageLoader from "@/components/global/ImageLoader"
import ProjectVisibility from "@/components/global/ProjectVisibility"
import { profileImage } from "@/messages/global"
import { ProjectService } from "@/services/project"
import { Locale } from "@/types"
import { readableISO } from "@/utils/format-date"
import { customConverters } from "@/utils/richtext"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { ExternalLink } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { notFound } from "next/navigation"
import { SearchParams } from "nuqs"
import DisplaySection from "./_components/DisplaySection"
import RightSection from "./_components/RightSection"
import ScreenShots from "./_components/ScreenShots"
import { loadSearchParams } from "./project-filters"
import { t } from "./t"

type Props = {
   params: Promise<{ slug: string; locale: Locale }>
   searchParams: Promise<SearchParams>
}
export default async function page({ params, searchParams }: Props) {
   const [{ display }, { locale, slug }] = await Promise.all([
      loadSearchParams(searchParams),
      params,
   ])

   const project = await ProjectService.getProject({ locale, slug })
   if (!project) notFound()
   const resolvedTranslation = t[locale]
   return (
      <div className="mx-auto w-full">
         <div className="border-border-default mb-6 flex flex-col gap-4 border-b pb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
               <div className="flex items-center gap-3">
                  <div className="ring-accent-border relative h-10 w-10 flex-shrink-0 rounded-full ring-2">
                     <ImageLoader
                        src={profileImage.src}
                        alt={profileImage.alt[locale]}
                        fill
                        className="rounded-full object-cover"
                     />
                  </div>
                  <div className="flex flex-col">
                     <h1 className="text-text-primary text-2xl font-bold sm:text-3xl">
                        {project.title}
                     </h1>
                     <div className="mt-1 flex items-center gap-3">
                        <ProjectVisibility
                           locale={locale}
                           isPublic={project.public === true}
                        />
                        <div className="flex items-center gap-0.5">
                           <span className="text-text-secondary">•</span>
                           <span className="text-text-secondary text-sm">
                              {readableISO(project.createdAt)}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* desktop visit button */}
               {project.demoUrl && (
                  <Link
                     target="_blank"
                     rel="noopener noreferrer"
                     href={project.demoUrl}
                     className="bg-btn-blue hover:bg-btn-blue-hover text-tag-hover-text hidden items-center gap-2 rounded-md px-4 py-2 font-medium shadow-lg transition-all duration-200 hover:text-white hover:shadow-xl sm:flex"
                  >
                     <ExternalLink className="h-4 w-4" />
                     <span>{resolvedTranslation.visit}</span>
                  </Link>
               )}
            </div>

            {/* mobile visit button */}
            {project.demoUrl && (
               <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={project.demoUrl}
                  className="bg-btn-blue hover:bg-btn-blue-hover flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 font-medium shadow-lg transition-all duration-200 hover:text-white sm:hidden"
               >
                  <ExternalLink className="h-4 w-4" />
                  <span>{resolvedTranslation.visit}</span>
               </Link>
            )}
         </div>

         <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <div className="order-2 w-full lg:order-1 lg:flex-1">
               <div className="border-border-default rounded-lg border shadow-sm">
                  <DisplaySection locale={locale} />
                  <div className="p-4 sm:p-6">
                     {display === "readme" ? (
                        <div className="max-w-none">
                           <RichText
                              disableContainer
                              data={project.richText}
                              converters={customConverters}
                           />
                        </div>
                     ) : (
                        <ScreenShots images={project.images} />
                     )}
                  </div>
               </div>
            </div>

            <div className="order-1 w-full lg:order-2 lg:w-80 lg:flex-shrink-0">
               <div className="sticky top-4">
                  <RightSection locale={locale} project={project} />

                  {project.demoUrl && (
                     <div className="mt-4 hidden lg:block">
                        <div className="border-border-default bg-tertiary rounded-lg border p-4">
                           <h3 className="text-text-primary mb-2 font-semibold">
                              {resolvedTranslation.liveDemo}
                           </h3>
                           <p className="text-text-secondary mb-3 text-sm">
                              {resolvedTranslation.liveDemoDescription}
                           </p>
                           <Link
                              target="_blank"
                              rel="noopener noreferrer"
                              href={project.demoUrl}
                              className="bg-btn-blue hover:bg-btn-blue-hover flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 font-medium transition-all duration-200 hover:text-white"
                           >
                              <ExternalLink className="h-4 w-4" />
                              <span>{resolvedTranslation.visit}</span>
                           </Link>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}

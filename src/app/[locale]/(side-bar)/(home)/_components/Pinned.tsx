import { BlogService } from "@/services/blog"
import { ProjectService } from "@/services/project"
import { Locale } from "@/types"
import { t } from "../t"
import PinnedCard from "./PinnedCard"

export default async function Pinned({ locale }: { locale: Locale }) {
   const pinnedProjects = await ProjectService.getProjects({
      pinned: true,
      locale,
      page: 1,
   })
   const pinnedBlogs = await BlogService.getBlogs({
      pinned: true,
      locale,
   })
   if (!pinnedBlogs || !pinnedProjects) return null
   const { docs: projects } = pinnedProjects
   return (
      <div className="w-full overflow-hidden">
         <h2 className="mt-8 mb-1">{t[locale].pinned}</h2>
         <div className="mt-2 grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
            {projects.map((project) => {
               return (
                  <PinnedCard
                     locale={locale}
                     key={project.id}
                     data={project}
                     page="projects"
                  />
               )
            })}
            {pinnedBlogs.map((blog) => {
               return (
                  <PinnedCard
                     locale={locale}
                     key={blog.id}
                     data={{ ...blog, public: true }}
                     page="blogs"
                  />
               )
            })}
         </div>
      </div>
   )
}

import { BlogService } from "@/services/blog"
import { getServerLocale } from "@/utils/server-locale"
import { BlogCard } from "./_components/BlogCard"
import { t } from "./t"

export default async function page() {
   const locale = await getServerLocale()
   const data = await BlogService.getBlogList({ locale })
   if (!data || data.length === 0) {
      return (
         <div className="mx-auto w-full max-w-4xl">
            <h1 className="text-2xl font-bold">{t[locale].noBlogsFound}</h1>
            <p className="text-text-secondary mt-2">
               {t[locale].noBlogsFoundDescription}
            </p>
         </div>
      )
   }
   return (
      <div>
         <div className="mx-auto mb-12 max-w-3xl text-center">
            <h1
               dangerouslySetInnerHTML={{ __html: t[locale].title }}
               className="text-text-primary mb-6 text-5xl leading-tight font-bold"
            ></h1>
            <p className="text-text-secondary text-lg">
               {t[locale].description}
            </p>
         </div>

         <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {data.map((blog) => (
               <BlogCard key={blog.id} blog={blog} />
            ))}
         </div>
      </div>
   )
}
